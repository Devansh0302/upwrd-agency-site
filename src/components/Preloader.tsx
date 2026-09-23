"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./Preloader.module.css";

export default function Preloader() {
  const [isReady, setIsReady] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run once per session
    const hasRun = sessionStorage.getItem("preloader_run");
    if (hasRun) {
      setIsReady(true);
      return;
    }

    if (!container.current || !logo.current) return;

    // Prevent scrolling while preloader is active
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsReady(true);
        sessionStorage.setItem("preloader_run", "true");
        document.body.style.overflow = "";
      },
    });

    // Animate logo in
    tl.fromTo(
      logo.current,
      { opacity: 0, y: 30, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }
    )
      // Hold for a moment
      .to(logo.current, { scale: 1.05, duration: 1.5, ease: "power1.inOut" })
      // Animate logo out
      .to(logo.current, { opacity: 0, y: -30, filter: "blur(10px)", duration: 0.8, ease: "power3.in" })
      // Slide container up
      .to(container.current, { yPercent: -100, duration: 1.0, ease: "power4.inOut" }, "-=0.2");

    return () => {
      tl.kill();
    };
  }, []);

  if (isReady) return null;

  return (
    <div ref={container} className={styles.preloader}>
      <div ref={logo} className={`${styles.logo} font-surgena`}>
        Upwrd
      </div>
    </div>
  );
}
