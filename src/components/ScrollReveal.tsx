"use client";

import { ReactNode } from "react";
import Reveal from "./motion/Reveal";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: RevealProps) {
  // Convert ms delay from old API to seconds for GSAP
  const gsapDelay = delay > 0 ? delay / 1000 : 0;
  
  // Convert direction to yOffset
  let yOffset = 0;
  if (direction === "up") yOffset = 40;
  if (direction === "down") yOffset = -40;

  return (
    <Reveal delay={gsapDelay} yOffset={yOffset} className={className} width="100%">
      {children}
    </Reveal>
  );
}
