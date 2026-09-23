"use client";

import { ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const overlay = useRef<HTMLDivElement>(null);

  // Entrance animation whenever pathname changes
  useEffect(() => {
    if (overlay.current) {
      gsap.fromTo(
        overlay.current,
        { scaleY: 1, transformOrigin: "bottom" },
        { scaleY: 0, duration: 1, ease: "power4.inOut", delay: 0.1 }
      );
    }
  }, [pathname]);

  return (
    <>
      <div
        ref={overlay}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#000000",
          zIndex: 9999,
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
      <div key={pathname}>{children}</div>
    </>
  );
}
