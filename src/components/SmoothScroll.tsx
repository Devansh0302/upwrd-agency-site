"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    let lenis: any;
    const initLenis = async () => {
      try {
        const Lenis = (await import("lenis")).default;
        lenis = new Lenis({
          duration: 1.35,
          smoothWheel: true,
          wheelMultiplier: 0.82,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
        });

        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
      } catch {
        /* lenis not available, graceful degradation */
      }
    };

    initLenis();

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return null;
}
