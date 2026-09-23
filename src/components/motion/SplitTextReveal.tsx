"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionConfig } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface SplitTextRevealProps {
  text: string;
  as?: React.ElementType;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}

export default function SplitTextReveal({
  text,
  as: Component = "p",
  className = "",
  delay = 0,
  style,
}: SplitTextRevealProps) {
  const container = useRef<HTMLElement>(null);

  // Simple custom split: separate by words to maintain wrap capability naturally
  // We wrap each word in an inline-block div that has overflow-hidden, 
  // and the inner span actually animates.
  const words = text.split(" ").map((word, i) => (
    <span
      key={i}
      style={{
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "bottom",
        marginRight: "0.25em",
        paddingBottom: "0.1em",
        marginBottom: "-0.1em", // Compensate for descenders padding
      }}
    >
      <span
        className="split-word"
        style={{
          display: "inline-block",
          transform: "translateY(110%)",
          willChange: "transform",
        }}
      >
        {word}
      </span>
    </span>
  ));

  useGSAP(
    () => {
      if (!container.current) return;
      
      const targets = gsap.utils.toArray(".split-word", container.current);
      
      gsap.to(targets, {
        scrollTrigger: {
          trigger: container.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        y: "0%",
        duration: motionConfig.duration.reveal,
        ease: motionConfig.ease.reveal,
        stagger: motionConfig.stagger.fast,
        delay,
      });
    },
    { scope: container }
  );

  return (
    <Component ref={container} className={className} style={style}>
      {words}
    </Component>
  );
}
