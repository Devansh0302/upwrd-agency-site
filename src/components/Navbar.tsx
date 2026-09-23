"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let lastScrollY = window.scrollY;

    const handleDirection = () => {
      if (!navRef.current) return;
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        navRef.current.style.transform = "translateY(-100%)";
      } else {
        // Scrolling up
        navRef.current.style.transform = "translateY(0)";
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleDirection, { passive: true });
    return () => window.removeEventListener("scroll", handleDirection);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header ref={navRef} className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`} style={{ transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)" }}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={`${styles.logo} font-surgena`}>
          Upwrd
        </Link>

        <nav className={styles.navlinks}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navlink} ${pathname === link.href ? styles.active : ""}`}
            >
              {link.label}
              {pathname === link.href && (
                <motion.span
                  className={styles.activeIndicator}
                  layoutId="nav-indicator"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="btn btn-sm">
          Get Started →
        </Link>

        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.open : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 + 0.1 }}
              >
                <Link
                  href={link.href}
                  className={`${styles.mobileLink} ${pathname === link.href ? styles.active : ""}`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <Link href="/contact" className="btn" style={{ marginTop: 16, width: "100%", justifyContent: "center" }}>
              Get Started →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
