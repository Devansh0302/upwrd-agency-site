"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { createMedia } from "@/lib/motion";

interface MagneticProps {
  children: React.ReactElement;
  strength?: number;
}

export default function Magnetic({ children, strength = 0.3 }: MagneticProps) {
  const magnetic = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = createMedia();
    if (!mm) return;
    
    let xTo: any, yTo: any;

    mm.add("(hover: hover) and (pointer: fine)", () => {
      xTo = gsap.quickTo(magnetic.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
      yTo = gsap.quickTo(magnetic.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

      const mouseMove = (e: MouseEvent) => {
        if (!magnetic.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = magnetic.current.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        
        xTo(x * strength);
        yTo(y * strength);
      };

      const mouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      if (magnetic.current) {
        magnetic.current.addEventListener("mousemove", mouseMove);
        magnetic.current.addEventListener("mouseleave", mouseLeave);
      }

      return () => {
        if (magnetic.current) {
          magnetic.current.removeEventListener("mousemove", mouseMove);
          magnetic.current.removeEventListener("mouseleave", mouseLeave);
        }
      };
    });

    return () => {
      mm.revert();
    };
  }, [strength]);

  return React.cloneElement(children as any, { ref: magnetic });
}
