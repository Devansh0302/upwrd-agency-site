"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createMedia } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // 1 = normal scroll, < 1 = slower (background), > 1 = faster (foreground)
  className?: string;
  overlay?: boolean;
  style?: React.CSSProperties;
}

export default function Parallax({
  children,
  speed = 0.8,
  className = "",
  overlay = false,
  style,
}: ParallaxProps) {
  const container = useRef<HTMLDivElement>(null);
  const target = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = createMedia();
      if (!mm) return;

      // Disable parallax on mobile/touch devices for better performance
      mm.add("(min-width: 768px)", () => {
        if (!container.current || !target.current) return;
        
        // Calculate the difference based on speed
        // If speed is 0.8, the element moves 20% slower than scroll
        const yPercent = (1 - speed) * 100;
        
        gsap.fromTo(
          target.current,
          { yPercent: -yPercent },
          {
            yPercent: yPercent,
            ease: "none",
            scrollTrigger: {
              trigger: container.current,
              start: "top bottom", // when top of container hits bottom of viewport
              end: "bottom top",   // when bottom of container hits top of viewport
              scrub: true,
            },
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className={className}
      style={{ overflow: "hidden", position: "relative", ...style }}
    >
      <div
        ref={target}
        style={{
          width: "100%",
          height: "120%", // Give it extra height so it can translate without showing edges
          position: "absolute",
          top: "-10%",
          left: 0,
          willChange: "transform",
        }}
      >
        {children}
      </div>
      {overlay && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)", zIndex: 1 }} />
      )}
    </div>
  );
}
