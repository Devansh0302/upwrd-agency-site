"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let gx = mx;
    let gy = my;
    let animFrame: number;

    const handleMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const animate = () => {
      gx += (mx - gx) * 0.1;
      gy += (my - gy) * 0.1;
      glow.style.left = `${gx}px`;
      glow.style.top = `${gy}px`;
      animFrame = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    animFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" />;
}
