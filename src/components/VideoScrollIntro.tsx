"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface VideoScrollIntroProps {
  onProgress?: (progress: number) => void;
}

const TOTAL_FRAMES = 165;
// Full 10-second cinematic presentation pace
const AUTO_SCROLL_DURATION = 10000;

// Persistent module-level frame cache
const frameCache: HTMLImageElement[] = [];
let isPreloading = false;

function preloadAllFrames(onFirstFrame?: () => void) {
  if (frameCache.length === TOTAL_FRAMES) {
    if (onFirstFrame && frameCache[0]?.complete) onFirstFrame();
    return;
  }
  if (isPreloading) return;
  isPreloading = true;

  // 1. Immediately load first batch (all ship frames + truck start) for instant response
  const initialBatch = 35;
  for (let i = 1; i <= Math.min(initialBatch, TOTAL_FRAMES); i++) {
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

  // 2. Stream remaining frames in background
  const loadRemaining = (startIdx: number) => {
    if (startIdx > TOTAL_FRAMES) return;
    const endIdx = Math.min(startIdx + 25, TOTAL_FRAMES);
    for (let i = startIdx; i <= endIdx; i++) {
      const img = new Image();
      const padded = String(i).padStart(3, "0");
      img.src = `/frames/frame_${padded}.webp`;
      frameCache.push(img);
    }
    if (endIdx < TOTAL_FRAMES) {
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        (window as any).requestIdleCallback(() => loadRemaining(endIdx + 1));
      } else {
        setTimeout(() => loadRemaining(endIdx + 1), 40);
      }
    }
  };

  setTimeout(() => loadRemaining(initialBatch + 1), 50);
}

export default function VideoScrollIntro({ onProgress }: VideoScrollIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [showPrompt, setShowPrompt] = useState(true);

  const stateRef = useRef({
    isAutoScrolling: false,
    hasCompleted: false,
    currentFrame: 0,
    startTime: 0,
    rafId: 0,
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

      // Responsive object-cover calculation
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
      img.onload = () => render();
    }
  }, []);

  // Preload frames once and paint frame 0
  useEffect(() => {
    preloadAllFrames(() => {
      drawFrame(0);
    });
    if (frameCache[0]?.complete) {
      drawFrame(0);
    }
  }, [drawFrame]);

  // Main Auto-Scroll Routine: triggered by a single scroll gesture
  const startAutoScroll = useCallback(() => {
    const state = stateRef.current;
    if (state.isAutoScrolling || state.hasCompleted) return;

    state.isAutoScrolling = true;
    state.startTime = performance.now();
    setShowPrompt(false);

    const container = containerRef.current;
    const targetScrollY = container ? container.offsetHeight : window.innerHeight;

    const step = (now: number) => {
      const elapsed = now - state.startTime;
      const t = Math.min(1, elapsed / AUTO_SCROLL_DURATION);

      // 1. Video frame progression across both scenes:
      // Part A: Frames 0-31 (new ship2_1 indoor cruise ship zoom into NORVIAN AB crane)
      // takes the initial 2.5s (t: 0 -> 0.25)
      // Part B: Frames 32-164 (NORVIAN AB Volvo truck, warehouse/forklift, illuminated Earth globe)
      // takes a generous 6.3s (t: 0.25 -> 0.88), making the rest of the video unhurried, rich, and cinematic!
      let frameIndex = 0;
      if (t <= 0.25) {
        const p1 = t / 0.25;
        frameIndex = Math.min(31, Math.floor(p1 * 32));
      } else if (t <= 0.88) {
        const p2 = (t - 0.25) / 0.63;
        frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          32 + Math.floor(p2 * (TOTAL_FRAMES - 1 - 32))
        );
      } else {
        frameIndex = TOTAL_FRAMES - 1;
      }

      if (frameIndex !== state.currentFrame) {
        state.currentFrame = frameIndex;
        drawFrame(frameIndex);
      }

      // 2. Viewport Scroll progression (Curtain Slide):
      // Smoothly glides up at t > 0.68 as the glowing globe illuminates,
      // seamlessly unveiling the manifesto section with ZERO dark blue empty gap!
      let scrollProgress = 0;
      if (t > 0.68) {
        const scrollT = (t - 0.68) / 0.32;
        scrollProgress =
          scrollT < 0.5
            ? 2 * scrollT * scrollT
            : -1 + (4 - 2 * scrollT) * scrollT;
      }

      const currentScrollTarget = scrollProgress * targetScrollY;

      if (typeof window !== "undefined") {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(currentScrollTarget, { immediate: true });
        } else {
          window.scrollTo(0, currentScrollTarget);
        }
      }

      if (canvasRef.current) {
        canvasRef.current.style.transform = `scale(${1 + t * 0.03}) translateZ(0)`;
      }

      onProgress?.(t);

      if (t < 1) {
        state.rafId = requestAnimationFrame(step);
      } else {
        // Complete auto-scroll cleanly
        state.isAutoScrolling = false;
        state.hasCompleted = true;
        onProgress?.(1.0);

        // Ensure final scroll sits cleanly at the target
        if (typeof window !== "undefined") {
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(targetScrollY, { immediate: true });
          } else {
            window.scrollTo(0, targetScrollY);
          }
        }
      }
    };

    state.rafId = requestAnimationFrame(step);
  }, [drawFrame, onProgress]);

  // Single-Scroll Event Detection
  useEffect(() => {
    const container = containerRef.current;

    // Check if initial load is already below intro (e.g. anchor link)
    const initialY = window.scrollY || window.pageYOffset || 0;
    if (container && initialY >= container.offsetHeight - 50) {
      stateRef.current.hasCompleted = true;
      setShowPrompt(false);
      onProgress?.(1.0);
      return;
    }

    // 1. Wheel event: ONE scroll down initiates auto-scroll
    const handleWheel = (e: WheelEvent) => {
      if (stateRef.current.hasCompleted) {
        // Reset if user scrolled back up to the very top
        if (window.scrollY <= 10 && e.deltaY < 0) {
          stateRef.current.hasCompleted = false;
          setShowPrompt(true);
          drawFrame(0);
          onProgress?.(0);
          if (stageRef.current) {
            stageRef.current.style.visibility = "visible";
          }
        }
        return;
      }

      if (e.deltaY > 0) {
        e.preventDefault();
        startAutoScroll();
      }
    };

    // 2. Touch event for mobile: ONE swipe down initiates auto-scroll
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (stateRef.current.hasCompleted) return;
      const currentY = e.touches[0].clientY;
      const diffY = touchStartY - currentY;
      if (diffY > 10) {
        if (e.cancelable) e.preventDefault();
        startAutoScroll();
      }
    };

    // 3. Keyboard navigation (ArrowDown, PageDown, Space)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (stateRef.current.hasCompleted) return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        startAutoScroll();
      }
    };

    // 4. Scroll position watcher: hide stage only far down to save GPU, reset at top
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      if (container) {
        // Only hide far down the page (beyond 1.5 screen heights) so no dark blue flash occurs
        const isFarDown = scrollY > container.offsetHeight * 1.5;
        if (stageRef.current) {
          stageRef.current.style.visibility = isFarDown ? "hidden" : "visible";
        }
      }

      // Reset when user returns to top
      if (scrollY <= 5 && stateRef.current.hasCompleted && !stateRef.current.isAutoScrolling) {
        stateRef.current.hasCompleted = false;
        setShowPrompt(true);
        drawFrame(0);
        onProgress?.(0);
        if (stageRef.current) {
          stageRef.current.style.visibility = "visible";
        }
      } else if (scrollY > 15 && !stateRef.current.isAutoScrolling && !stateRef.current.hasCompleted) {
        startAutoScroll();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
      if (stateRef.current.rafId) {
        cancelAnimationFrame(stateRef.current.rafId);
      }
    };
  }, [drawFrame, onProgress, startAutoScroll]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-[#070D16]"
    >
      {/* Static Fixed Fullscreen Stage */}
      <div
        ref={stageRef}
        onClick={startAutoScroll}
        className="fixed top-0 left-0 h-screen w-full overflow-hidden z-0 bg-[#070D16] cursor-pointer"
      >
        <div
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Hardware-Accelerated Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-full select-none pointer-events-none"
            style={{
              transform: "scale(1) translateZ(0)",
              willChange: "transform",
              filter: "contrast(1.02) saturate(1.04)",
            }}
          />

          {/* Subtle cinematic vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070D16]/50 via-transparent to-[#070D16]/30 pointer-events-none" />

          {/* Bottom subtle scroll prompt before user initiates auto-scroll */}
          {showPrompt && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-500 opacity-80">
              <span className="w-5 h-9 rounded-full border border-white/30 flex items-start justify-center p-1 bg-black/20 backdrop-blur-xs">
                <span className="w-1.5 h-2.5 bg-[#C59C58] rounded-full animate-bounce" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/60 font-medium">
                Scroll to Enter
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
