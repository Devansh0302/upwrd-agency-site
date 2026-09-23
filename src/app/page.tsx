"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import {
  Globe,
  Smartphone,
  Palette,
  TrendingUp,
  Fingerprint,
  Database,
  Monitor,
  ArrowRight,
  Star,
  ChevronRight,
  Camera,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import Reveal from "@/components/motion/Reveal";
import SplitTextReveal from "@/components/motion/SplitTextReveal";
import StaggerGroup from "@/components/motion/StaggerGroup";
import Magnetic from "@/components/motion/Magnetic";
import Parallax from "@/components/motion/Parallax";
import styles from "./page.module.css";
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(10px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

/* ---- Data ---- */
const services = [
  { icon: Monitor, title: "Digital Platforms", desc: "Modern, responsive, and high-performing digital platforms." },
  { icon: Globe, title: "Cloud Applications", desc: "Custom cloud applications to streamline your enterprise." },
  { icon: Database, title: "ERP & Custom Software", desc: "Intelligent, scalable enterprise architecture engineered to automate operations and drive limitless growth." },
  { icon: TrendingUp, title: "Performance Marketing", desc: "Strategic performance marketing to scale your growth." },
  { icon: Fingerprint, title: "Visual Identity Systems", desc: "Build a memorable visual identity and brand transformation." },
  { icon: Camera, title: "Media Production", desc: "High-end photography and videography shoots tailored to elevate your brand presence." },
];



const testimonials = [
  { text: "Upwrd built an incredible website for us. The premium design and flawless performance completely exceeded our expectations!", name: "Shubham Khandelwal", role: "Founder, Fingard Partners" },
  { text: "The custom billing and inventory software they developed has completely transformed and streamlined our daily operations.", name: "Yash", role: "Owner, Aarmabh Metals & Gifts" },
  { text: "Our new Shopify store and website look absolutely stunning. The team was highly professional and delivered exactly what we needed.", name: "Pawan", role: "Owner, Lens Master" },
];

const processSteps = [
  { num: "01", title: "Discover", desc: "We understand your goals and requirements." },
  { num: "02", title: "Plan", desc: "We create a tailored strategy and system architecture." },
  { num: "03", title: "Build", desc: "We design, develop and test with complete transparency." },
  { num: "04", title: "Launch", desc: "We deploy and support your growth journey." },
];


export default function HomePage() {
  const orbitRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  /* Parallax on hero */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);



  /* Mouse depth effect on hero visual */
  useEffect(() => {
    const visual = orbitRef.current?.parentElement;
    const cube = cubeRef.current;
    if (!visual || !cube) return;

    const handleMove = (e: PointerEvent) => {
      const r = visual.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cube.style.transform = `perspective(700px) rotateX(${y * -12}deg) rotateY(${x * 14}deg) rotateZ(30deg)`;
    };
    const handleLeave = () => {
      cube.style.transform = "";
    };

    visual.addEventListener("pointermove", handleMove as EventListener);
    visual.addEventListener("pointerleave", handleLeave);
    return () => {
      visual.removeEventListener("pointermove", handleMove as EventListener);
      visual.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className={styles.hero} ref={heroRef}>
        <div className="container">
          <motion.div
            className={styles.heroGrid}
            style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          >
            <StaggerGroup className={styles.heroContent} staggerDelay={0.1}>
              <span className="eyebrow">
                Design · Develop · Deploy
              </span>

              <SplitTextReveal
                as="h1"
                className={styles.heroH1}
                text="Innovative Digital Solutions For A Connected World"
              />

              <p className={styles.heroDesc}>
                Transforming your ideas into reality with our web and mobile solutions.
                We specialize in creating dynamic websites, web applications, and
                mobile applications tailored to your unique needs.
              </p>
              
              <div className={styles.heroActions}>
                <Magnetic>
                  <Link href="/contact" className="btn hover-target">
                    Get Started <ArrowRight size={16} />
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link href="/services" className="btn btn-alt hover-target">
                    View Projects
                  </Link>
                </Magnetic>
              </div>
            </StaggerGroup>

            <motion.div
              className={styles.heroVisual}
              variants={scaleIn}
              initial="hidden"
              animate="show"
            >
              <div className={styles.orbit} ref={orbitRef} />
              
              {/* Floating service badges */}
              {[
                { name: "Web Apps", icon: Monitor },
                { name: "Mobile Apps", icon: Smartphone },
                { name: "Media Production", icon: Camera },
                { name: "Marketing", icon: TrendingUp },
                { name: "Branding", icon: Fingerprint },
                { name: "Cloud Systems", icon: Globe }
              ].map((service, i) => (
                <motion.div
                  key={`badge-${i}`}
                  className={styles.floatingBadge}
                  style={{
                    top: `${50 + 52 * Math.sin((i * Math.PI * 2) / 6 - Math.PI / 2)}%`,
                    left: `${50 + 52 * Math.cos((i * Math.PI * 2) / 6 - Math.PI / 2)}%`,
                  }}
                  animate={{
                    y: [0, i % 2 === 0 ? -12 : 12, 0],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className={styles.badgeIcon}>
                    <service.icon size={12} />
                  </div>
                  <span>{service.name}</span>
                </motion.div>
              ))}

              <div className={styles.cube} ref={cubeRef}>
                <div className={styles.cubeFace} />
              </div>
              <div className={styles.particles}>
                {[...Array(6)].map((_, i) => (
                  <motion.span
                    key={`particle-${i}`}
                    className={styles.particle}
                    animate={{
                      y: [0, -30, 0],
                      x: [0, (i % 2 ? 15 : -15), 0],
                      opacity: [0.2, 0.8, 0.2],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
            </motion.div>
        </div>
        <div className={styles.heroLine} />
      </section>

      {/* ===== MARQUEE ===== */}
      <div className="marquee">
        <div className="marquee-track">
          BRANDING <b>•</b> UI/UX <b>•</b> WEB DESIGN <b>•</b> MOBILE APP <b>•</b> USER-FRIENDLY <b>•</b> STREAMLINE <b>•</b> BRANDING <b>•</b> UI/UX <b>•</b> WEB DESIGN <b>•</b> MOBILE APP <b>•</b> USER-FRIENDLY <b>•</b> STREAMLINE <b>•</b> BRANDING <b>•</b> UI/UX <b>•</b> WEB DESIGN <b>•</b> MOBILE APP <b>•</b>
        </div>
      </div>

      {/* ===== WELCOME ===== */}
      <section className={`section ${styles.welcome}`}>
        <div className="container" style={{ textAlign: "center" }}>
          <ScrollReveal>
            <span className="kicker" style={{ display: "inline-block", marginBottom: 16 }}>About Us</span>
            <h2>
              Welcome to <span className="highlight">Upwrd</span>,
              your partner in digital innovation.
            </h2>
            <p className="lead" style={{ maxWidth: 700, margin: "20px auto 0", fontSize: 16 }}>
              We specialize in creating dynamic websites, web applications,
              and mobile applications tailored to your unique needs.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="section" id="services">
        <div className="container">
          <ScrollReveal>
            <div className="section-head">
              <div>
                <span className="kicker">Services</span>
                <h2 style={{ marginTop: 10 }}>
                  We Provide End-to-End Digital Solutions
                </h2>
                <p className="lead" style={{ marginTop: 12 }}>
                  We offer a comprehensive suite of services designed to elevate your
                  digital presence. Our team of experts is dedicated to delivering
                  business solutions that meet your specific needs.
                </p>
              </div>
              <Link href="/services" className="btn btn-outline btn-sm">
                View All Services <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>

          <StaggerGroup className="grid-3" staggerDelay={0.1}>
            {services.map((s, i) => (
              <div key={i} className="card hover-target">
                <div className="card-icon">
                  <s.icon size={28} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="section" id="process">
        <div className="container">
          <ScrollReveal>
            <div className="section-head">
              <div>
                <span className="kicker">Our Process</span>
                <h2 style={{ marginTop: 10 }}>From Idea to Impact</h2>
                <p className="lead" style={{ marginTop: 8 }}>
                  A simple and transparent process to bring your vision to life.
                </p>
              </div>
              <span className="kicker" style={{ opacity: 0.5 }}>
                Simple · Transparent · Effective
              </span>
            </div>
          </ScrollReveal>

          <StaggerGroup className={styles.process} staggerDelay={0.15}>
            {processSteps.map((step, i) => (
              <div key={i} className={styles.step}>
                <div className={styles.stepNum}>{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                {i < processSteps.length - 1 && (
                  <ChevronRight className={styles.stepArrow} size={20} />
                )}
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>



      {/* ===== TESTIMONIALS ===== */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-head">
              <div>
                <span className="kicker">Testimonials</span>
                <h2 style={{ marginTop: 10 }}>What Our Clients Say</h2>
                <p className="lead" style={{ marginTop: 8 }}>
                  We take pride in building long-term relationships with our clients.
                </p>
              </div>
              <span className="kicker" style={{ opacity: 0.5 }}>
                Trusted by innovators
              </span>
            </div>
          </ScrollReveal>

          <StaggerGroup className="grid-3" staggerDelay={0.1}>
            {testimonials.map((t, i) => (
              <div key={i} className={styles.testimonial}>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} fill="var(--yellow)" color="var(--yellow)" />
                  ))}
                </div>
                <p className={styles.testimonialText}>&quot;{t.text}&quot;</p>
                <div className={styles.person}>
                  <div className={styles.avatar}>{t.name.charAt(0)}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
