"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";

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
  const { language } = useLanguage();
  const isSv = language === "sv";

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const chapterTextRef = useRef<HTMLSpanElement>(null);

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

      // Responsive rendering: Full-Bleed Cover (Reel format on Mobile Portrait, Cinematic Widescreen on Desktop)
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = canvas.width / canvas.height;

      ctx.imageSmoothingEnabled = true;

      let drawW = canvas.width;
      let drawH = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        // Wider than 16:9 (e.g. ultra-wide desktop monitors)
        drawH = canvas.width / imgRatio;
        offsetY = (canvas.height - drawH) / 2;
      } else {
        // Taller than 16:9 (Mobile Portrait Reel format / vertical phone screens)
        // Completely covers 100% of the vertical screen height with zero letterbox bars!
        drawW = canvas.height * imgRatio;
        // In Reel mode on mobile, keep the primary subject (ship bow/crane, truck, warehouse, globe) centered:
        offsetX = (canvas.width - drawW) / 2;
      }

      ctx.imageSmoothingQuality = "high";
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

  // Synchronize chapter HUD text when language changes
  useEffect(() => {
    if (chapterTextRef.current) {
      const idx = stateRef.current.currentFrame;
      if (idx <= 31) {
        chapterTextRef.current.innerText = isSv ? "01 • SKEPPSBYGGNAD & MARINT" : "01 • SHIPBUILDING & MARINE";
      } else if (idx <= 88) {
        chapterTextRef.current.innerText = isSv ? "02 • KONTINENTAL LOGISTIK" : "02 • CONTINENTAL LOGISTICS";
      } else if (idx <= 128) {
        chapterTextRef.current.innerText = isSv ? "03 • TERMINALVERKSAMHET" : "03 • TERMINAL OPERATIONS";
      } else {
        chapterTextRef.current.innerText = isSv ? "04 • GLOBALT NÄTVERK" : "04 • GLOBAL NETWORK";
      }
    }
  }, [isSv]);

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

      // Fluid Direct DOM updates for 60fps/120fps Reel HUD (Zero React re-render lag)
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${Math.min(100, Math.max(0, t * 100))}%`;
      }

      if (chapterTextRef.current) {
        if (frameIndex <= 31) {
          chapterTextRef.current.innerText = isSv ? "01 • SKEPPSBYGGNAD & MARINT" : "01 • SHIPBUILDING & MARINE";
        } else if (frameIndex <= 88) {
          chapterTextRef.current.innerText = isSv ? "02 • KONTINENTAL LOGISTIK" : "02 • CONTINENTAL LOGISTICS";
        } else if (frameIndex <= 128) {
          chapterTextRef.current.innerText = isSv ? "03 • TERMINALVERKSAMHET" : "03 • TERMINAL OPERATIONS";
        } else {
          chapterTextRef.current.innerText = isSv ? "04 • GLOBALT NÄTVERK" : "04 • GLOBAL NETWORK";
        }
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

        if (stageRef.current) {
          stageRef.current.style.pointerEvents = "none";
        }

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
      if (stageRef.current) {
        stageRef.current.style.pointerEvents = "none";
      }
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
          if (progressBarRef.current) {
            progressBarRef.current.style.width = "0%";
          }
          if (chapterTextRef.current) {
            chapterTextRef.current.innerText = isSv ? "01 • SKEPPSBYGGNAD & MARINT" : "01 • SHIPBUILDING & MARINE";
          }
          if (stageRef.current) {
            stageRef.current.style.visibility = "visible";
            stageRef.current.style.pointerEvents = "auto";
          }
        }
        return;
      }

      if (e.deltaY > 0) {
        e.preventDefault();
        startAutoScroll();
      }
    };

    // 2. Touch event for mobile: responsive swipe and slide handling
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const diffY = touchStartY - currentY;

      // If user hasn't started yet: swipe up starts auto-scroll reel
      if (!stateRef.current.hasCompleted && !stateRef.current.isAutoScrolling) {
        if (diffY > 8 || Math.abs(diffY) > 20) {
          if (e.cancelable) e.preventDefault();
          startAutoScroll();
        }
        return;
      }

      // If auto-scroll is ALREADY running and user swipes up firmly on mobile:
      // Fast-forward directly to the curtain slide phase so the page slides up without waiting!
      if (stateRef.current.isAutoScrolling && diffY > 20) {
        const now = performance.now();
        const elapsed = now - stateRef.current.startTime;
        const currentT = elapsed / AUTO_SCROLL_DURATION;
        if (currentT < 0.70) {
          stateRef.current.startTime = now - (0.72 * AUTO_SCROLL_DURATION);
        }
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
        if (progressBarRef.current) {
          progressBarRef.current.style.width = "0%";
        }
        if (chapterTextRef.current) {
          chapterTextRef.current.innerText = isSv ? "01 • SKEPPSBYGGNAD & MARINT" : "01 • SHIPBUILDING & MARINE";
        }
        if (stageRef.current) {
          stageRef.current.style.visibility = "visible";
          stageRef.current.style.pointerEvents = "auto";
        }
      } else if (scrollY > 15 && !stateRef.current.isAutoScrolling && !stateRef.current.hasCompleted) {
        startAutoScroll();
      }
    };

    // 5. Responsive Resize & Orientation handler
    const handleResize = () => {
      drawFrame(stateRef.current.currentFrame);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (stateRef.current.rafId) {
        cancelAnimationFrame(stateRef.current.rafId);
      }
    };
  }, [drawFrame, onProgress, startAutoScroll]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100dvh] min-h-[100dvh] bg-[#070D16]"
    >
      {/* Static Fixed Fullscreen Stage */}
      <div
        ref={stageRef}
        onClick={startAutoScroll}
        onTouchEnd={(e) => {
          // Immediate responsive trigger on mobile touch/tap
          if (!stateRef.current.hasCompleted && !stateRef.current.isAutoScrolling) {
            e.preventDefault();
            startAutoScroll();
          }
        }}
        className="fixed top-0 left-0 h-[100dvh] w-full overflow-hidden z-0 bg-[#070D16] cursor-pointer"
        style={{ touchAction: "pan-y" }}
      >
        <div
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Top Reel Progress Bar (Reel format on mobile & widescreen) */}
          <div className="absolute top-0 inset-x-0 h-1 bg-white/10 z-30 pointer-events-none">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-[#C59C58] via-[#E8C587] to-[#C59C58] shadow-[0_0_12px_rgba(197,156,88,0.9)]"
              style={{ width: "0%" }}
            />
          </div>

          {/* Reel Category Pill (Subtle Nordic Reel HUD below Navbar) */}
          <div className="absolute top-20 sm:top-24 left-4 sm:left-8 z-20 pointer-events-none flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white shadow-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C59C58] animate-pulse" />
              <span
                ref={chapterTextRef}
                className="text-[9.5px] sm:text-[10px] uppercase font-mono tracking-[0.22em] font-semibold text-white/95"
              >
                {isSv ? "01 • SKEPPSBYGGNAD & MARINT" : "01 • SHIPBUILDING & MARINE"}
              </span>
            </div>
          </div>

          {/* Hardware-Accelerated Canvas (Full-bleed 100dvh portrait Reel format on mobile) */}
          <canvas
            ref={canvasRef}
            className="w-full h-full select-none pointer-events-none"
            style={{
              transform: "scale(1) translateZ(0)",
              willChange: "transform",
              filter: "contrast(1.02) saturate(1.04)",
            }}
          />

          {/* Vertical Vignette Gradients for True Reel Format legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#070D16]/65 via-transparent to-[#070D16]/75 pointer-events-none" />

          {/* Bottom Reel Prompt: Swipe Up or Tap to Play + Quick Slide Button */}
          {showPrompt && (
            <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 pointer-events-auto z-20 px-4 text-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  startAutoScroll();
                }}
                className="flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-black/70 backdrop-blur-md border border-[#C59C58]/50 shadow-[0_12px_36px_rgba(0,0,0,0.85)] active:scale-95 transition-all cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[#C59C58] animate-ping" />
                <span className="text-[10.5px] sm:text-xs uppercase tracking-[0.22em] text-white font-medium whitespace-nowrap">
                  <span className="md:hidden">
                    {isSv ? "Svep upp eller tryck för att spela" : "Swipe up or Tap to play"}
                  </span>
                  <span className="hidden md:inline">
                    {isSv ? "Skrolla för att spela Reel" : "Scroll to play Reel"}
                  </span>
                </span>
                <svg
                  className="w-4 h-4 text-[#C59C58] animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Direct smooth slide down to main website
                  stateRef.current.hasCompleted = true;
                  setShowPrompt(false);
                  if (stageRef.current) stageRef.current.style.pointerEvents = "none";
                  const container = containerRef.current;
                  const targetScrollY = container ? container.offsetHeight : window.innerHeight;
                  if (typeof window !== "undefined") {
                    if ((window as any).lenis) {
                      (window as any).lenis.scrollTo(targetScrollY, { duration: 1.0 });
                    } else {
                      window.scrollTo({ top: targetScrollY, behavior: "smooth" });
                    }
                  }
                }}
                className="text-[9.5px] uppercase tracking-[0.22em] text-white/60 hover:text-[#C59C58] font-mono transition-colors cursor-pointer py-1"
              >
                {isSv ? "Gå till Innehåll ↓" : "Slide to Content ↓"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
