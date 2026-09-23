"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Footer.module.css";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

const services = [
  "Digital Platforms",
  "Cloud Applications",
  "ERP & Custom Software",
  "Performance Marketing",
  "Visual Identity Systems",
  "Media Production",
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className={styles.footer}>
      {/* CTA Section */}
      {pathname !== "/contact" && (
        <div className={styles.cta}>
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{ maxWidth: 550, margin: "0 auto" }}>
            <h2 style={{ marginTop: 12 }}>
              Ready to Start Your Project?
            </h2>
            <p className="lead" style={{ marginTop: 12 }}>
              Let&apos;s turn your ideas into powerful digital solutions.
            </p>
          </div>
          <Link href="/contact" className="btn" style={{ marginTop: 36 }}>
            Get a Free Consultation →
          </Link>
        </div>
      </div>
      )}

      {/* Footer Grid */}
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Link href="/" className={`${styles.logo} font-surgena`}>
            Upwrd
          </Link>
          <p className={styles.desc}>
            Innovative digital solutions for a connected world. We help businesses grow through
            technology and design.
          </p>
          <div className={styles.socials}>
            <a href="https://www.instagram.com/upwrd.tech/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialLink}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className={styles.socialLink}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

          </div>
        </div>

        <div>
          <h4 className={styles.heading}>Quick Links</h4>
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.footerLink}>
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          <h4 className={styles.heading}>Services</h4>
          {services.map((s) => (
            <Link key={s} href="/services" className={styles.footerLink}>
              {s}
            </Link>
          ))}
        </div>

        <div>
          <h4 className={styles.heading}>Contact Us</h4>
          <a href="mailto:info@upwrd.tech" className={styles.footerLink}>
            info@upwrd.tech
          </a>
          <a href="tel:+918005621022" className={styles.footerLink}>
            +91 80056 21022
          </a>
          <a href="tel:+917976024405" className={styles.footerLink}>
            +91 79760 24405
          </a>

          {pathname !== "/contact" && (
            <Link href="/contact" className="btn btn-sm btn-outline" style={{ marginTop: 16 }}>
              Let&apos;s Talk →
            </Link>
          )}
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>© 2026 Upwrd. All rights reserved.</span>
        <span>Built for creative businesses.</span>
      </div>
    </footer>
  );
}
