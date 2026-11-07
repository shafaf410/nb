"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { SkipForward } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface VideoScrollIntroProps {
  onProgress?: (progress: number) => void;
}

export default function VideoScrollIntro({ onProgress }: VideoScrollIntroProps) {
  const { language } = useLanguage();
  const isSv = language === "sv";

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const chapterTextRef = useRef<HTMLSpanElement>(null);

  const [isVideoReady, setIsVideoReady] = useState(false);
  const isVideoReadyRef = useRef(false);
  const pendingAutoScrollRef = useRef(false);

  const [showPrompt, setShowPrompt] = useState(true);
  const [hasCompleted, setHasCompleted] = useState(false);

  const stateRef = useRef({
    isAutoScrolling: false,
    hasCompleted: false,
    rafId: 0,
  });

  // Helper to get active video element according to viewport
  const getActiveVideo = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return mobileVideoRef.current || desktopVideoRef.current;
    }
    return desktopVideoRef.current || mobileVideoRef.current;
  }, []);

  // Synchronize chapter HUD text when language changes
  useEffect(() => {
    if (chapterTextRef.current) {
      const v = getActiveVideo();
      const t = v && v.duration ? v.currentTime / v.duration : 0;
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
  }, [isSv, getActiveVideo]);

  // Unified intro finish handler: reveals website and smoothly scrolls down
  const finishIntro = useCallback(() => {
    const state = stateRef.current;
    if (state.hasCompleted) return;

    if (state.rafId) {
      cancelAnimationFrame(state.rafId);
      state.rafId = 0;
    }

    state.isAutoScrolling = false;
    state.hasCompleted = true;
    setHasCompleted(true);
    setShowPrompt(false);

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
        (window as any).lenis.scrollTo(targetScrollY, {
          duration: 1.2,
          easing: (x: number) => 1 - Math.pow(1 - x, 3),
        });
      } else {
        window.scrollTo({ top: targetScrollY, behavior: "smooth" });
      }
    }
  }, [isSv, onProgress]);

  // Main Playback Routine: smoothly plays video and updates HUD
  const startAutoScroll = useCallback(() => {
    const state = stateRef.current;
    if (state.isAutoScrolling || state.hasCompleted) return;

    const video = getActiveVideo();
    if (!video) return;

    // If video hasn't finished loading yet, queue it to play as soon as it's ready
    if (!isVideoReadyRef.current && video.readyState < 2) {
      pendingAutoScrollRef.current = true;
      return;
    }

    state.isAutoScrolling = true;
    setShowPrompt(false);

    // Stop Lenis during playback so native gestures don't disrupt video
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.stop();
    }

    try {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      if (video.currentTime > 0.1 && (video.ended || video.paused)) {
        video.currentTime = 0;
      }
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } catch (err) {}

    const step = () => {
      const v = getActiveVideo();
      if (!v) return;

      const fallbackDuration = v === mobileVideoRef.current ? 9.33 : 21.33;
      const actualDur =
        v.duration && !isNaN(v.duration) && v.duration > 0
          ? v.duration
          : fallbackDuration;

      const cur = typeof v.currentTime === "number" ? v.currentTime : 0;
      const t = actualDur > 0 ? Math.min(1, cur / actualDur) : 0;

      // Direct DOM update for HUD (butter smooth, zero React re-render lag)
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

      onProgress?.(t);

      if (t < 0.98 && !v.ended) {
        state.rafId = requestAnimationFrame(step);
      } else {
        finishIntro();
      }
    };

    state.rafId = requestAnimationFrame(step);
  }, [finishIntro, getActiveVideo, isSv, onProgress]);

  // Signal that video is loaded and ready to present
  const handleVideoReady = useCallback(() => {
    if (!isVideoReadyRef.current) {
      isVideoReadyRef.current = true;
      setIsVideoReady(true);
      if (pendingAutoScrollRef.current) {
        pendingAutoScrollRef.current = false;
        startAutoScroll();
      }
    }
  }, [startAutoScroll]);

  // Skip Intro Handler
  const handleSkipIntro = useCallback(
    (e?: React.MouseEvent | React.TouchEvent) => {
      if (e) e.stopPropagation();
      const v = getActiveVideo();
      if (v) {
        try {
          v.pause();
        } catch (err) {}
      }
      finishIntro();
    },
    [finishIntro, getActiveVideo]
  );

  // Single-Scroll Event Detection & Gesture Listeners
  useEffect(() => {
    const container = containerRef.current;
    [desktopVideoRef.current, mobileVideoRef.current].forEach((video) => {
      if (video) {
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        video.setAttribute("muted", "");
        video.setAttribute("playsinline", "");
        video.setAttribute("webkit-playsinline", "");
      }
    });

    // Check if video is already ready from cache
    const checkReady = () => {
      const v = getActiveVideo();
      if (v && (v.readyState >= 2 || v.currentTime > 0)) {
        handleVideoReady();
      }
    };
    checkReady();
    const readyTimer = setTimeout(checkReady, 300);

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
      [desktopVideoRef.current, mobileVideoRef.current].forEach((video) => {
        if (video) {
          video.currentTime = video.duration || 21.33;
        }
      });
      if (progressBarRef.current) {
        progressBarRef.current.style.width = "100%";
      }
      onProgress?.(1.0);
      if (stageRef.current) {
        stageRef.current.style.pointerEvents = "none";
      }
    }

    // 1. Wheel event: A single scroll down plays the video. Mouse scroll has NO effect while playing!
    const handleWheel = (e: WheelEvent) => {
      if (stateRef.current.hasCompleted) {
        if (window.scrollY <= 10 && e.deltaY < 0 && window.location.hash !== "#home") {
          stateRef.current.hasCompleted = false;
          setHasCompleted(false);
          setShowPrompt(true);
          [desktopVideoRef.current, mobileVideoRef.current].forEach((v) => {
            if (v) {
              try {
                v.pause();
                v.currentTime = 0;
              } catch (err) {}
            }
          });
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

      // During intro, prevent standard page scroll jump
      e.preventDefault();

      // In a single scroll down, start video playback. Once playing, mouse scroll has NO effect!
      if (e.deltaY > 0 && !stateRef.current.isAutoScrolling) {
        startAutoScroll();
      }
    };

    // 2. Touch event for mobile: a single swipe starts the video
    let touchStartY = 0;
    let touchStartX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;

      // Prime iOS media engine on initial touch gesture
      const v = mobileVideoRef.current;
      if (v && v.paused && !stateRef.current.isAutoScrolling && !stateRef.current.hasCompleted) {
        v.play().then(() => {
          if (!stateRef.current.isAutoScrolling) {
            v.pause();
          }
        }).catch(() => {});
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!stateRef.current.hasCompleted) {
        if (e.cancelable) {
          e.preventDefault();
        }
        if (!stateRef.current.isAutoScrolling) {
          const currentY = e.touches[0].clientY;
          const currentX = e.touches[0].clientX;
          const diffY = touchStartY - currentY;
          const diffX = touchStartX - currentX;

          // Single swipe starts playback; once started, further swipes have no effect
          if (Math.abs(diffY) > 8 || Math.abs(diffX) > 8) {
            startAutoScroll();
          }
        }
      }
    };

    const handleTouchEnd = () => {
      // Tap on mobile triggers playback
      if (!stateRef.current.hasCompleted && !stateRef.current.isAutoScrolling) {
        startAutoScroll();
      }
    };

    // 3. Keyboard navigation: single key press triggers playback
    const handleKeyDown = (e: KeyboardEvent) => {
      if (stateRef.current.hasCompleted) return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        if (!stateRef.current.isAutoScrolling) {
          startAutoScroll();
        }
      }
    };

    // 4. Scroll position watcher: hide stage only far down to save GPU, reset at top
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      if (container) {
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

        [desktopVideoRef.current, mobileVideoRef.current].forEach((v) => {
          if (v) {
            try {
              v.pause();
              v.currentTime = 0;
            } catch (err) {}
          }
        });

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

    // 5. Return-to-home reset listener (triggered when clicking header/footer logo)
    const handleGoHomeEvent = () => {
      if (stateRef.current.rafId) {
        cancelAnimationFrame(stateRef.current.rafId);
        stateRef.current.rafId = 0;
      }
      stateRef.current.isAutoScrolling = false;
      stateRef.current.hasCompleted = false;
      setHasCompleted(false);
      setShowPrompt(true);

      [desktopVideoRef.current, mobileVideoRef.current].forEach((v) => {
        if (v) {
          try {
            v.pause();
            v.currentTime = 0;
          } catch (err) {}
        }
      });

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
    };

    // 6. Go-to-home section listener: instantly completes intro so user lands on content
    const handleGoToHome = () => {
      if (stateRef.current.rafId) {
        cancelAnimationFrame(stateRef.current.rafId);
        stateRef.current.rafId = 0;
      }
      stateRef.current.isAutoScrolling = false;
      stateRef.current.hasCompleted = true;
      setHasCompleted(true);
      setShowPrompt(false);

      [desktopVideoRef.current, mobileVideoRef.current].forEach((v) => {
        if (v) {
          try {
            v.pause();
            v.currentTime = v.duration || 21.33;
          } catch (err) {}
        }
      });

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
    window.addEventListener("norvian:go-home", handleGoHomeEvent);
    window.addEventListener("norvian:go-to-home", handleGoToHome);
    window.addEventListener("hashchange", handleHashSync);

    return () => {
      clearTimeout(readyTimer);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("norvian:go-home", handleGoHomeEvent);
      window.removeEventListener("norvian:go-to-home", handleGoToHome);
      window.removeEventListener("hashchange", handleHashSync);
      if (stateRef.current.rafId) {
        cancelAnimationFrame(stateRef.current.rafId);
      }
    };
  }, [getActiveVideo, handleVideoReady, isSv, onProgress, startAutoScroll]);

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
          if (!stateRef.current.hasCompleted && !stateRef.current.isAutoScrolling) {
            e.preventDefault();
            startAutoScroll();
          }
        }}
        className="fixed top-0 left-0 h-[100dvh] w-full overflow-hidden z-0 bg-[#070D16] cursor-pointer"
        style={{ touchAction: "none" }}
      >
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {/* Top Reel Progress Bar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-white/10 z-30 pointer-events-none">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-[#C59C58] via-[#E8C587] to-[#C59C58] shadow-[0_0_12px_rgba(197,156,88,0.9)]"
              style={{ width: "0%" }}
            />
          </div>

          {/* Reel Category Pill (Positioned cleanly at top-left, unobstructed by navbar) */}
          <div className="absolute top-6 sm:top-8 left-4 sm:left-8 z-20 pointer-events-none flex items-center gap-2">
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

          {/* Desktop Cinematic Video (Screens >= 768px) */}
          <video
            ref={desktopVideoRef}
            src="/videos/intro.mp4"
            poster="/images/intro_desktop_poster.jpg"
            playsInline
            muted
            preload="auto"
            className="hidden md:block absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            onLoadedData={handleVideoReady}
            onCanPlay={handleVideoReady}
            onEnded={finishIntro}
          />

          {/* Mobile View Video (Screens < 768px, portrait-optimized) */}
          <video
            ref={mobileVideoRef}
            src="/videos/intro_mobile.mp4"
            poster="/images/intro_mobile_poster.jpg"
            playsInline
            muted
            preload="auto"
            className="block md:hidden absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            onLoadedData={handleVideoReady}
            onCanPlay={handleVideoReady}
            onEnded={finishIntro}
          />

          {/* Elegant Luxury Preloader: Shown until video is buffered & ready */}
          {!isVideoReady && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none bg-black/40 backdrop-blur-[2px] transition-opacity duration-500">
              <div className="relative flex items-center justify-center">
                <div className="w-11 h-11 rounded-full border-2 border-[#C59C58]/25 border-t-[#E8C587] animate-spin" />
                <span className="absolute w-2 h-2 rounded-full bg-[#C59C58] animate-pulse" />
              </div>
              <span className="mt-4 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase font-semibold text-white/85">
                {isSv ? "Laddar upplevelse..." : "Loading experience..."}
              </span>
            </div>
          )}

          {/* Bottom Center Reel Prompt: Scroll or Tap to Play (Shown only once video is fully ready) */}
          {showPrompt && isVideoReady && (
            <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center pointer-events-auto z-20 px-4 text-center transition-all duration-700 animate-in fade-in zoom-in-95">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  startAutoScroll();
                }}
                onTouchEnd={(e) => {
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
