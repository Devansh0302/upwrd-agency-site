"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionConfig } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  yOffset?: number;
}

export default function StaggerGroup({
  children,
  className = "",
  staggerDelay = motionConfig.stagger.default,
  yOffset = 100,
}: StaggerGroupProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;
      
      const childrenElements = container.current.children;
      
      // Set initial state
      gsap.set(childrenElements, { y: yOffset, opacity: 0, filter: "blur(20px)", scale: 0.85 });
      
      gsap.to(childrenElements, {
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        duration: motionConfig.duration.reveal * 1.6,
        ease: "expo.out",
        stagger: staggerDelay,
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className={className}>
      {children}
    </div>
  );
}
