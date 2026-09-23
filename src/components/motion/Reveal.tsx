"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionConfig } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number;
  yOffset?: number;
}

export default function Reveal({
  children,
  width = "fit-content",
  className = "",
  delay = 0,
  yOffset = 100,
}: RevealProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        container.current,
        {
          y: yOffset,
          opacity: 0,
          filter: "blur(20px)",
          scale: 0.85,
        },
        {
          scrollTrigger: {
            trigger: container.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: motionConfig.duration.reveal * 1.6,
          ease: "expo.out",
          delay,
        }
      );
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className={className}
      style={{
        width,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
