"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface VideoScrollIntroProps {
  onProgress?: (progress: number) => void;
}

const TOTAL_FRAMES = 120;

// Persistent module-level cache: never wiped out by React StrictMode or component re-renders
const frameCache: HTMLImageElement[] = [];
let isPreloading = false;

function preloadAllFrames(onFirstFrame?: () => void) {
  if (frameCache.length === TOTAL_FRAMES) {
    if (onFirstFrame && frameCache[0]?.complete) onFirstFrame();
    return;
  }
  if (isPreloading) return;
  isPreloading = true;

  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const img = new Image();
    const padded = String(i).padStart(3, "0");
    img.src = `/frames/frame_${padded}.webp`;
    if (i === 1) {
      img.onload = () => {
        onFirstFrame?.();
      };
    }
    frameCache.push(img);
  }
}

export default function VideoScrollIntro({ onProgress }: VideoScrollIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  const stateRef = useRef({
    targetProgress: 0,
    currentProgress: 0,
    animId: 0,
  });

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const img = frameCache[index];
    if (img) {
      if (img.complete && img.naturalWidth > 0) {
        if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      } else {
        img.onload = () => {
          if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
          }
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
      }
    }
  }, []);

  // Preload frames once and paint frame 0 immediately
  useEffect(() => {
    preloadAllFrames(() => {
      drawFrame(0);
    });
    // If already preloaded, paint frame 0 immediately
    if (frameCache[0]?.complete) {
      drawFrame(0);
    }
  }, [drawFrame]);

  // Smooth, continuous 120 FPS scroll tracking with golden-ratio damping
  useEffect(() => {
    let lastRenderedIndex = -1;
    let animId = 0;

    const render = () => {
      const state = stateRef.current;
      const delta = state.targetProgress - state.currentProgress;

      // 0.10 LERP damping: weighted, buttery 120 FPS continuous interpolation for slower cinematic glide
      if (Math.abs(delta) > 0.0002) {
        state.currentProgress += delta * 0.10;
        animId = requestAnimationFrame(render);
      } else {
        state.currentProgress = state.targetProgress;
        animId = 0;
      }

      const progress = state.currentProgress;
      setScrollProgress(progress);
      onProgress?.(progress);

      // Map progress: 0.0 -> 0.75 scrolls through all 120 frames with slower, rich pacing
      // 0.75 -> 1.0 holds the final NORVIAN + Earth logo frame for one full scroll
      const videoPlayProgress = Math.min(1, progress / 0.75);
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(videoPlayProgress * (TOTAL_FRAMES - 1)))
      );

      if (frameIndex !== lastRenderedIndex) {
        drawFrame(frameIndex);
        lastRenderedIndex = frameIndex;
      }
    };

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const clamped = Math.max(0, Math.min(1, scrollY / totalScrollable));
      stateRef.current.targetProgress = clamped;

      if (!animId) {
        animId = requestAnimationFrame(render);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Initial sync
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [drawFrame, onProgress]);

  // Subtle 3D camera forward glide
  const cameraScale = 1 + scrollProgress * 0.05;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[460vh] md:h-[680vh] bg-[#070D16]"
    >
      {/* Pinned Fullscreen Cinematic Stage */}
      <div className="sticky top-0 h-screen w-screen overflow-hidden z-20">
        <div
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Hardware-Accelerated 120 FPS Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover select-none pointer-events-none"
            style={{
              transform: `scale(${cameraScale}) translateZ(0)`,
              willChange: "transform",
              filter: "contrast(1.02) saturate(1.04)",
            }}
          />

          {/* Ultra-subtle cinematic vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070D16]/50 via-transparent to-[#070D16]/30 pointer-events-none" />

          {/* Bottom subtle scroll prompt before user begins scrolling */}
          {scrollProgress < 0.05 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-500 opacity-70">
              <span className="w-5 h-9 rounded-full border border-white/30 flex items-start justify-center p-1 bg-black/20 backdrop-blur-xs">
                <span className="w-1.5 h-2.5 bg-[#C59C58] rounded-full animate-bounce" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-medium">Scroll</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
