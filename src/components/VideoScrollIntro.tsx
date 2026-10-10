"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface VideoScrollIntroProps {
  onProgress?: (progress: number) => void;
}

const TOTAL_FRAMES = 165;

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
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Only track prompt visibility as boolean state — eliminates 120 FPS root re-renders
  const [showPrompt, setShowPrompt] = useState(true);

  const stateRef = useRef({
    targetProgress: 0,
    currentProgress: 0,
    renderedIndex: -1,
    animId: 0,
  });

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const img = frameCache[index];
    if (!img) return;

    const render = () => {
      if (!img.naturalWidth || !img.naturalHeight) return;

      const cWidth = canvas.clientWidth || window.innerWidth;
      const cHeight = canvas.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const targetW = Math.round(cWidth * dpr);
      const targetH = Math.round(cHeight * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      // Responsive object-cover calculation directly in canvas
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = canvas.width / canvas.height;

      let drawW = canvas.width;
      let drawH = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawH = canvas.width / imgRatio;
        offsetY = (canvas.height - drawH) / 2;
      } else {
        drawW = canvas.height * imgRatio;
        offsetX = (canvas.width - drawW) / 2;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "medium";
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    };

    if (img.complete && img.naturalWidth > 0) {
      render();
    } else {
      img.onload = () => {
        if (stateRef.current.renderedIndex === index) {
          render();
        }
      };
    }
  }, []);

  // Preload frames once and paint frame 0 immediately
  useEffect(() => {
    preloadAllFrames(() => {
      drawFrame(0);
    });
    if (frameCache[0]?.complete) {
      drawFrame(0);
    }
  }, [drawFrame]);

  // Smooth, continuous 120 FPS scroll tracking with responsive damping
  useEffect(() => {
    let animId = 0;

    const render = () => {
      const state = stateRef.current;
      const delta = state.targetProgress - state.currentProgress;

      // 0.20 LERP damping: responsive, silky, stops cleanly without runaway video auto-play
      if (Math.abs(delta) > 0.0004) {
        state.currentProgress += delta * 0.20;
        animId = requestAnimationFrame(render);
      } else {
        state.currentProgress = state.targetProgress;
        animId = 0;
      }

      const progress = state.currentProgress;

      // Only update prompt visibility when crossing the 5% threshold
      const shouldPrompt = progress < 0.05;
      setShowPrompt((prev) => (prev !== shouldPrompt ? shouldPrompt : prev));

      // Notify parent callback
      onProgress?.(progress);

      if (canvasRef.current) {
        canvasRef.current.style.transform = `scale(${1 + progress * 0.04}) translateZ(0)`;
      }

      // Map progress evenly across all 120 frames (0 to 119) with no dead zones or freezing
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(progress * (TOTAL_FRAMES - 1)))
      );

      if (frameIndex !== state.renderedIndex) {
        state.renderedIndex = frameIndex;
        drawFrame(frameIndex);
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

      // Hide the fixed canvas stage when completely scrolled past by the 2nd page
      const isCovered = scrollY > totalScrollable + window.innerHeight * 1.15;
      if (stageRef.current) {
        stageRef.current.style.visibility = isCovered ? "hidden" : "visible";
      }

      // When fully covered and animation reached completion, avoid scheduling idle RAFs
      if (isCovered && stateRef.current.currentProgress >= 0.999 && clamped >= 0.999) {
        return;
      }

      if (!animId) {
        animId = requestAnimationFrame(render);
      }
    };

    const handleResize = () => {
      handleScroll();
      if (stateRef.current.renderedIndex >= 0) {
        drawFrame(stateRef.current.renderedIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Initial sync
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [drawFrame, onProgress]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[300vh] md:h-[400vh] bg-[#070D16]"
    >
      {/* Static Fixed Fullscreen Stage: Stays static at top: 0 while 2nd page scrolls above it */}
      <div
        ref={stageRef}
        className="fixed top-0 left-0 h-screen w-full overflow-hidden z-0 bg-[#070D16]"
      >
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
            className="w-full h-full select-none pointer-events-none"
            style={{
              transform: "scale(1) translateZ(0)",
              willChange: "transform",
              filter: "contrast(1.02) saturate(1.04)",
            }}
          />

          {/* Ultra-subtle cinematic vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070D16]/50 via-transparent to-[#070D16]/30 pointer-events-none" />

          {/* Bottom subtle scroll prompt before user begins scrolling */}
          {showPrompt && (
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
