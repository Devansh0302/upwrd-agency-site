"use client";

import { useEffect, useRef, ReactNode } from "react";

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
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add("revealed");
            if (once) observer.unobserve(el);
          } else if (!once) {
            el.classList.remove("revealed");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, once]);

  const dirMap = {
    up: "translateY(50px)",
    down: "translateY(-50px)",
    left: "translateX(50px)",
    right: "translateX(-50px)",
  };

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`}
      style={
        {
          "--reveal-transform": dirMap[direction],
        } as React.CSSProperties
      }
    >
      {children}

      <style jsx>{`
        .scroll-reveal {
          opacity: 0;
          transform: var(--reveal-transform, translateY(50px)) scale(0.98);
          filter: blur(4px);
          transition:
            opacity 0.9s cubic-bezier(0.2, 0.7, 0.2, 1),
            transform 0.9s cubic-bezier(0.2, 0.7, 0.2, 1),
            filter 0.9s ease;
          will-change: opacity, transform, filter;
        }
        .scroll-reveal.revealed {
          opacity: 1;
          transform: none;
          filter: none;
        }
      `}</style>
    </div>
  );
}
