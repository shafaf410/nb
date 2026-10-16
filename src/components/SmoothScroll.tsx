"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Route change scroll reset: whenever user navigates between pages, start at the top!
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!window.location.hash) {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(0, { immediate: true });
        }
        window.scrollTo(0, 0);
        if (pathname === "/") {
          window.dispatchEvent(new CustomEvent("norvian:go-home"));
        }
      } else if (!window.location.hash.startsWith("#service-")) {
        const hash = window.location.hash;
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el && (window as any).lenis) {
            (window as any).lenis.scrollTo(el, { duration: 1.2, offset: -40 });
          }
        }, 300);
      }
    }
  }, [pathname]);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.registerPlugin(ScrollTrigger);
      return;
    }

    // Ensure browser does not remember and restore midway scroll on refresh/load
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.0,
      infinite: false,
    });

    // Expose lenis globally for programmatic smooth scrolling from any component
    (window as any).lenis = lenis;

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Smooth anchor navigation handling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;

      // 1. Home link ("/" or "#")
      if (href === "/" || href === "#") {
        if (typeof window !== "undefined" && window.location.pathname !== "/") {
          // If on another page (/about, /contact, etc.), allow direct navigation back to home!
          return;
        }
        // If already on home page ("/"), smooth scroll to top and reset intro
        e.preventDefault();
        lenis.start();
        lenis.scrollTo(0, { duration: 1.2 });
        if (typeof window !== "undefined") {
          if (window.location.hash) {
            window.history.pushState(null, "", window.location.pathname);
          }
          window.dispatchEvent(new CustomEvent("norvian:go-home"));
        }
        return;
      }

      // 2. Hash anchor link (e.g. href="#industries")
      if (href.startsWith("#") && href.length > 1) {
        if (typeof window !== "undefined" && window.location.pathname !== "/") {
          e.preventDefault();
          window.location.href = "/" + href;
          return;
        }
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, {
            offset: -40,
            duration: 1.3,
          });
        }
        return;
      }

      // 3. Section link targeting home from another page (e.g. href="/#services")
      if (href.startsWith("/#") && href.length > 2) {
        if (typeof window !== "undefined" && window.location.pathname === "/") {
          const targetId = href.replace("/#", "");
          const el = document.getElementById(targetId) || document.querySelector("#" + targetId);
          if (el) {
            e.preventDefault();
            lenis.start();
            lenis.scrollTo(el as HTMLElement, {
              offset: -40,
              duration: 1.3,
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return <>{children}</>;
}
