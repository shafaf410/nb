"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { SkipForward } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface VideoScrollIntroProps {
  onProgress?: (progress: number) => void;
}

const TOTAL_FRAMES = 165;
// Balanced cinematic presentation pace (12.5s duration)
const AUTO_SCROLL_DURATION = 12500;

// Persistent module-level frame cache
const frameCache: HTMLImageElement[] = [];
let isPreloading = false;

function preloadAllFrames(onFirstFrame?: () => void) {
  if (frameCache.length === TOTAL_FRAMES) {
    if (onFirstFrame && frameCache[0]?.complete) onFirstFrame();
    return;
  }

  // On mobile screens (< 768px), the portrait video handles intro animation
  // Only preload the first frame as a fast fallback
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    if (frameCache.length === 0) {
      const img = new Image();
      img.src = "/frames/frame_001.webp";
      if (img.complete) {
        onFirstFrame?.();
      } else {
        img.onload = () => onFirstFrame?.();
      }
      frameCache.push(img);
    }
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
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const chapterTextRef = useRef<HTMLSpanElement>(null);

  const [showPrompt, setShowPrompt] = useState(true);
  const [hasCompleted, setHasCompleted] = useState(false);

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

      // Responsive rendering: Fullscreen cover on Desktop, perfectly framed with ambient glow on mobile screens
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = canvas.width / canvas.height;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      if (canvasRatio < 1.0) {
        // MOBILE PHONE SCREENS (Portrait):
        // 1. Fill background with softly diffused ambient scene reflection
        const bgW = canvas.height * imgRatio;
        const bgOffsetX = (canvas.width - bgW) / 2;
        ctx.save();
        ctx.globalAlpha = 0.32;
        ctx.drawImage(img, bgOffsetX, 0, bgW, canvas.height);
        ctx.restore();

        // 2. Dark radial vignette over ambient background so focus is on center video
        const fgH = canvas.width / imgRatio;
        const fgOffsetY = (canvas.height - fgH) / 2;

        const vignette = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          fgH * 0.35,
          canvas.width / 2,
          canvas.height / 2,
          canvas.height * 0.55
        );
        vignette.addColorStop(0, "rgba(7, 13, 22, 0.45)");
        vignette.addColorStop(1, "rgba(7, 13, 22, 0.96)");
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 3. Draw the crisp, uncropped 16:9 cinematic video centered on phone screen
        ctx.drawImage(img, 0, fgOffsetY, canvas.width, fgH);

        // Soft top & bottom edge blend
        const feather = Math.min(18 * dpr, fgH * 0.08);
        const topGrad = ctx.createLinearGradient(0, fgOffsetY, 0, fgOffsetY + feather);
        topGrad.addColorStop(0, "rgba(7, 13, 22, 0.5)");
        topGrad.addColorStop(1, "rgba(7, 13, 22, 0)");
        ctx.fillStyle = topGrad;
        ctx.fillRect(0, fgOffsetY, canvas.width, feather);

        const btmGrad = ctx.createLinearGradient(0, fgOffsetY + fgH - feather, 0, fgOffsetY + fgH);
        btmGrad.addColorStop(0, "rgba(7, 13, 22, 0)");
        btmGrad.addColorStop(1, "rgba(7, 13, 22, 0.5)");
        ctx.fillStyle = btmGrad;
        ctx.fillRect(0, fgOffsetY + fgH - feather, canvas.width, feather);
      } else {
        // DESKTOP & WIDESCREEN: Fullscreen cinematic cover
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

        ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
      }
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

  // Seamless Skip Intro Handler: cancels animation frame loop and smoothly scrolls to main website
  const handleSkipIntro = useCallback(
    (e?: React.MouseEvent | React.TouchEvent) => {
      if (e) {
        e.stopPropagation();
      }
      const state = stateRef.current;
      if (state.hasCompleted) return;

      if (state.rafId) {
        cancelAnimationFrame(state.rafId);
        state.rafId = 0;
      }

      // Stop mobile video if playing
      const mobileVideo = mobileVideoRef.current;
      if (mobileVideo) {
        try {
          mobileVideo.pause();
          mobileVideo.currentTime = mobileVideo.duration || 9.0;
        } catch (err) {}
      }

      state.isAutoScrolling = false;
      state.hasCompleted = true;
      setHasCompleted(true);
      setShowPrompt(false);

      drawFrame(TOTAL_FRAMES - 1);
      if (progressBarRef.current) {
        progressBarRef.current.style.width = "100%";
      }
      if (chapterTextRef.current) {
        chapterTextRef.current.innerText = isSv ? "04 • GLOBALT NÄTVERK" : "04 • GLOBAL NETWORK";
      }

      onProgress?.(1.0);

      if (stageRef.current) {
        stageRef.current.style.pointerEvents = "none";
      }

      const container = containerRef.current;
      const targetScrollY = container ? container.offsetHeight : window.innerHeight;

      if (typeof window !== "undefined") {
        if ((window as any).lenis) {
          (window as any).lenis.start();
          (window as any).lenis.scrollTo(targetScrollY, { duration: 1.1 });
        } else {
          window.scrollTo({ top: targetScrollY, behavior: "smooth" });
        }
      }
    },
    [drawFrame, isSv, onProgress]
  );

  // Main Auto-Scroll Routine: triggered by a single scroll gesture
  const startAutoScroll = useCallback(() => {
    const state = stateRef.current;
    if (state.isAutoScrolling || state.hasCompleted) return;

    state.isAutoScrolling = true;
    state.startTime = performance.now();
    setShowPrompt(false);

    // Pause Lenis during video playback so native/Lenis touch events cannot scroll or fling the page down
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.stop();
    }

    const container = containerRef.current;
    const targetScrollY = container ? container.offsetHeight : window.innerHeight;

    // 1. MOBILE VIDEO SCROLL ANIMATION (Active ONLY on mobile screens < 768px)
    const isMobileMode = typeof window !== "undefined" && window.innerWidth < 768;
    const mobileVideo = mobileVideoRef.current;

    if (isMobileMode && mobileVideo) {
      try {
        mobileVideo.currentTime = 0;
        const playPromise = mobileVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      } catch (err) {}

      const mobileStep = () => {
        const video = mobileVideoRef.current;
        if (!video) return;

        const dur = video.duration && !isNaN(video.duration) && video.duration > 0 ? video.duration : 9.0;
        const cur = video.currentTime || 0;
        const t = Math.min(1, cur / dur);

        // Fluid Direct DOM updates for 60fps Reel HUD on mobile
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${Math.min(100, Math.max(0, t * 100))}%`;
        }

        if (chapterTextRef.current) {
          if (t <= 0.25) {
            chapterTextRef.current.innerText = isSv ? "01 • SKEPPSBYGGNAD & MARINT" : "01 • SHIPBUILDING & MARINE";
          } else if (t <= 0.55) {
            chapterTextRef.current.innerText = isSv ? "02 • KONTINENTAL LOGISTIK" : "02 • CONTINENTAL LOGISTICS";
          } else if (t <= 0.80) {
            chapterTextRef.current.innerText = isSv ? "03 • TERMINALVERKSAMHET" : "03 • TERMINAL OPERATIONS";
          } else {
            chapterTextRef.current.innerText = isSv ? "04 • GLOBALT NÄTVERK" : "04 • GLOBAL NETWORK";
          }
        }

        // Viewport Scroll progression (Curtain Slide):
        // Smoothly glides up at t > 0.68 as the glowing NORVIAN AB logo appears
        let scrollProgress = 0;
        if (t > 0.68) {
          if (typeof window !== "undefined" && (window as any).lenis) {
            (window as any).lenis.start();
          }

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

        onProgress?.(t);

        if (t < 0.99 && !video.paused && !video.ended) {
          state.rafId = requestAnimationFrame(mobileStep);
        } else {
          // Completed cleanly on mobile
          state.isAutoScrolling = false;
          state.hasCompleted = true;
          setHasCompleted(true);
          onProgress?.(1.0);

          if (stageRef.current) {
            stageRef.current.style.pointerEvents = "none";
          }

          if (typeof window !== "undefined") {
            if ((window as any).lenis) {
              (window as any).lenis.start();
              (window as any).lenis.scrollTo(targetScrollY, { immediate: true });
            } else {
              window.scrollTo(0, targetScrollY);
            }
          }
        }
      };

      state.rafId = requestAnimationFrame(mobileStep);
      return;
    }

    // 2. DESKTOP CANVAS SCROLL ANIMATION (Active ONLY on desktop screens >= 768px)
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
        // Resume Lenis for smooth curtain scroll
        if (typeof window !== "undefined" && (window as any).lenis) {
          (window as any).lenis.start();
        }

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
        setHasCompleted(true);
        onProgress?.(1.0);

        if (stageRef.current) {
          stageRef.current.style.pointerEvents = "none";
        }

        // Ensure Lenis is running and final scroll sits cleanly at the target
        if (typeof window !== "undefined") {
          if ((window as any).lenis) {
            (window as any).lenis.start();
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

    // Check if initial load is already below intro or targeted at home / anchor link
    const hasHomeHash =
      typeof window !== "undefined" &&
      (window.location.hash === "#home" ||
        window.location.hash === "#main" ||
        window.location.hash === "#intro-manifesto" ||
        (window.location.hash && window.location.hash.length > 1));

    const initialY = window.scrollY || window.pageYOffset || 0;
    if (hasHomeHash || (container && initialY >= container.offsetHeight - 50)) {
      stateRef.current.hasCompleted = true;
      setHasCompleted(true);
      setShowPrompt(false);
      drawFrame(TOTAL_FRAMES - 1);
      if (progressBarRef.current) {
        progressBarRef.current.style.width = "100%";
      }
      onProgress?.(1.0);
      if (stageRef.current) {
        stageRef.current.style.pointerEvents = "none";
      }
    }

    // 1. Wheel event: ONE scroll down initiates auto-scroll
    const handleWheel = (e: WheelEvent) => {
      if (stateRef.current.hasCompleted) {
        // Reset if user scrolled back up to the very top (and not anchored at #home)
        if (window.scrollY <= 10 && e.deltaY < 0 && window.location.hash !== "#home") {
          stateRef.current.hasCompleted = false;
          setHasCompleted(false);
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

    // 2. Touch event for mobile: responsive swipe and tap handling without skipping
    let touchStartY = 0;
    let touchStartX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Prevent browser native drag/flinging while intro has not completed
      if (!stateRef.current.hasCompleted) {
        if (e.cancelable) {
          e.preventDefault();
        }
        if (!stateRef.current.isAutoScrolling) {
          const currentY = e.touches[0].clientY;
          const currentX = e.touches[0].clientX;
          const diffY = touchStartY - currentY;
          const diffX = touchStartX - currentX;

          // Gentle swipe starts the auto-scroll sequence cleanly
          if (Math.abs(diffY) > 8 || Math.abs(diffX) > 8) {
            startAutoScroll();
          }
        }
      }
    };

    const handleTouchEnd = () => {
      // If user tapped on mobile without dragging, initiate playback cleanly
      if (!stateRef.current.hasCompleted && !stateRef.current.isAutoScrolling) {
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

      // Reset when user returns to top (and not anchored at #home)
      if (scrollY <= 5 && stateRef.current.hasCompleted && !stateRef.current.isAutoScrolling && window.location.hash !== "#home") {
        stateRef.current.hasCompleted = false;
        setHasCompleted(false);
        setShowPrompt(true);

        const mobileVideo = mobileVideoRef.current;
        if (mobileVideo) {
          try {
            mobileVideo.pause();
            mobileVideo.currentTime = 0;
          } catch (err) {}
        }

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
      if (window.innerWidth >= 768) {
        preloadAllFrames(() => drawFrame(stateRef.current.currentFrame));
        drawFrame(stateRef.current.currentFrame);
      }
    };

    // 6. Return-to-home reset listener (triggered when clicking header/footer logo)
    const handleGoHomeEvent = () => {
      if (stateRef.current.rafId) {
        cancelAnimationFrame(stateRef.current.rafId);
        stateRef.current.rafId = 0;
      }
      stateRef.current.isAutoScrolling = false;
      stateRef.current.hasCompleted = false;
      stateRef.current.currentFrame = 0;
      setHasCompleted(false);
      setShowPrompt(true);

      const mobileVideo = mobileVideoRef.current;
      if (mobileVideo) {
        try {
          mobileVideo.pause();
          mobileVideo.currentTime = 0;
        } catch (err) {}
      }

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
      if (canvasRef.current) {
        canvasRef.current.style.transform = "scale(1) translateZ(0)";
      }
    };

    // 7. Go-to-home section listener: instantly completes intro so user lands on content after intro
    const handleGoToHome = () => {
      if (stateRef.current.rafId) {
        cancelAnimationFrame(stateRef.current.rafId);
        stateRef.current.rafId = 0;
      }
      stateRef.current.isAutoScrolling = false;
      stateRef.current.hasCompleted = true;
      setHasCompleted(true);
      setShowPrompt(false);

      const mobileVideo = mobileVideoRef.current;
      if (mobileVideo) {
        try {
          mobileVideo.pause();
          mobileVideo.currentTime = mobileVideo.duration || 9.0;
        } catch (err) {}
      }

      drawFrame(TOTAL_FRAMES - 1);
      if (progressBarRef.current) {
        progressBarRef.current.style.width = "100%";
      }
      if (chapterTextRef.current) {
        chapterTextRef.current.innerText = isSv ? "04 • GLOBALT NÄTVERK" : "04 • GLOBAL NETWORK";
      }
      onProgress?.(1.0);
      if (stageRef.current) {
        stageRef.current.style.pointerEvents = "none";
      }
    };

    const handleHashSync = () => {
      const h = window.location.hash;
      if (h === "#home" || h === "#main" || h === "#intro-manifesto") {
        handleGoToHome();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    window.addEventListener("norvian:go-home", handleGoHomeEvent);
    window.addEventListener("norvian:go-to-home", handleGoToHome);
    window.addEventListener("hashchange", handleHashSync);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      window.removeEventListener("norvian:go-home", handleGoHomeEvent);
      window.removeEventListener("norvian:go-to-home", handleGoToHome);
      window.removeEventListener("hashchange", handleHashSync);
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
      {/* High-Visibility Bottom-Left Corner Skip Intro Floating Button */}
      {!hasCompleted && (
        <div className="fixed bottom-6 sm:bottom-8 left-4 sm:left-8 z-50 pointer-events-auto">
          <button
            type="button"
            onClick={handleSkipIntro}
            onTouchEnd={(e) => {
              e.stopPropagation();
              handleSkipIntro(e);
            }}
            className="group relative flex items-center gap-2.5 px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full bg-[#070D16]/95 hover:bg-black border border-[#C59C58]/80 hover:border-[#E8C587] backdrop-blur-3xl shadow-[0_12px_40px_rgba(0,0,0,0.95),0_0_24px_rgba(197,156,88,0.45)] text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            aria-label={isSv ? "Hoppa över introduktion" : "Skip intro animation"}
          >
            <div className="w-5 h-5 rounded-full bg-[#C59C58]/25 group-hover:bg-[#C59C58]/40 flex items-center justify-center transition-colors">
              <SkipForward className="w-3 h-3 text-[#E8C587]" />
            </div>
            <span className="text-[11px] sm:text-xs font-mono tracking-[0.2em] uppercase font-bold text-white group-hover:text-[#E8C587] transition-colors">
              {isSv ? "Hoppa över" : "Skip Intro"}
            </span>
          </button>
        </div>
      )}

      {/* Static Fixed Fullscreen Stage */}
      <div
        ref={stageRef}
        onClick={startAutoScroll}
        onTouchEnd={(e) => {
          const target = e.target as HTMLElement;
          if (target && target.closest("button")) return;
          // Immediate responsive trigger on mobile touch/tap
          if (!stateRef.current.hasCompleted && !stateRef.current.isAutoScrolling) {
            e.preventDefault();
            startAutoScroll();
          }
        }}
        className="fixed top-0 left-0 h-[100dvh] w-full overflow-hidden z-0 bg-[#070D16] cursor-pointer"
        style={{ touchAction: "none" }}
      >
        <div
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Top Reel Progress Bar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-white/10 z-30 pointer-events-none">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-[#C59C58] via-[#E8C587] to-[#C59C58] shadow-[0_0_12px_rgba(197,156,88,0.9)]"
              style={{ width: "0%" }}
            />
          </div>

          {/* Reel Category Pill (Nordic Reel HUD below Navbar) */}
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

          {/* Mobile Video Scroll Animation (Active ONLY on mobile screens < 768px) */}
          <video
            ref={mobileVideoRef}
            src="/videos/intro_mobile.mp4#t=0.001"
            playsInline
            muted
            preload="auto"
            className="md:hidden absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            style={{
              filter: "contrast(1.02) saturate(1.04)",
            }}
            onEnded={() => {
              const state = stateRef.current;
              if (!state.hasCompleted) {
                state.isAutoScrolling = false;
                state.hasCompleted = true;
                setHasCompleted(true);
                onProgress?.(1.0);
                if (stageRef.current) {
                  stageRef.current.style.pointerEvents = "none";
                }
                const container = containerRef.current;
                const targetScrollY = container ? container.offsetHeight : window.innerHeight;
                if (typeof window !== "undefined") {
                  if ((window as any).lenis) {
                    (window as any).lenis.start();
                    (window as any).lenis.scrollTo(targetScrollY, { immediate: true });
                  } else {
                    window.scrollTo(0, targetScrollY);
                  }
                }
              }
            }}
          >
            <source src="/videos/intro_mobile.mp4" type="video/mp4" />
          </video>

          {/* Hardware-Accelerated Canvas (Active ONLY on desktop screens >= 768px) */}
          <canvas
            ref={canvasRef}
            className="hidden md:block w-full h-full select-none pointer-events-none"
            style={{
              transform: "scale(1) translateZ(0)",
              willChange: "transform",
              filter: "contrast(1.02) saturate(1.04)",
            }}
          />

          {/* Vertical Vignette Gradients for cinematic contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#070D16]/65 via-transparent to-[#070D16]/75 pointer-events-none" />

          {/* Bottom Center Reel Prompt: Swipe Up or Tap to Play */}
          {showPrompt && (
            <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center pointer-events-auto z-20 px-4 text-center">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  startAutoScroll();
                }}
                className="flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-black/70 backdrop-blur-md border border-[#C59C58]/50 shadow-[0_12px_36px_rgba(0,0,0,0.85)] active:scale-95 transition-all cursor-pointer group hover:border-[#E8C587]"
              >
                <span className="w-2 h-2 rounded-full bg-[#C59C58] animate-ping" />
                <span className="text-[10.5px] sm:text-xs uppercase tracking-[0.22em] text-white font-medium whitespace-nowrap">
                  <span className="md:hidden">
                    {isSv ? "Svep upp eller tryck för att spela" : "Swipe up or Tap to play"}
                  </span>
                  <span className="hidden md:inline">
                    {isSv ? "Skrolla för att spela" : "Scroll to play"}
                  </span>
                </span>
                <svg
                  className="w-4 h-4 text-[#C59C58] group-hover:text-[#E8C587] animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
