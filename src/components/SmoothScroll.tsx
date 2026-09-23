"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    let lenis: any;
    let tick: ((time: number) => void) | null = null;

    const initLenis = async () => {
      try {
        const Lenis = (await import("lenis")).default;
        lenis = new Lenis({
          duration: 1.2,
          smoothWheel: true,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        lenis.on("scroll", ScrollTrigger.update);

        tick = (time: number) => {
          lenis.raf(time * 1000);
        };
        
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        (window as any).__lenis = lenis;
      } catch (e) {
        console.error("Failed to initialize Lenis:", e);
      }
    };

    initLenis();

    return () => {
      if (lenis) {
        lenis.on("scroll", ScrollTrigger.update); // Need to off() it actually, but there's no easy reference without storing it. lenis.destroy() removes events.
        lenis.destroy();
      }
      if (tick) {
        gsap.ticker.remove(tick);
      }
      delete (window as any).__lenis;
    };
  }, []);

  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    
    // Refresh ScrollTrigger after a route change
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  }, [pathname]);

  return null;
}
