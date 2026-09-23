"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Monitor,
  Globe,
  Smartphone,
  Palette,
  TrendingUp,
  Fingerprint,
  Code,
  Database,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Headphones,
  BarChart3,
  Camera,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./services.module.css";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 50, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const services = [
  {
    icon: Monitor,
    title: "Digital Platforms",
    desc: "Modern, responsive, and high-performing digital platforms that capture your brand essence and convert visitors into customers.",
    features: ["Custom Design", "SEO Optimized", "Fast Load Times", "Mobile-First"],
    featured: true,
  },
  {
    icon: Globe,
    title: "Cloud Applications",
    desc: "Custom cloud applications built with cutting-edge technologies to streamline your enterprise operations.",
    features: ["React/Next.js", "Real-time Features", "Scalable Architecture", "API Integration"],
  },
  {
    icon: Smartphone,
    title: "Native Mobile Ecosystems",
    desc: "Powerful native mobile experiences for Android & iOS that keep your users engaged and coming back.",
    features: ["React Native", "Native Performance", "Push Notifications", "Offline Support"],
    featured: true,
  },
  {
    icon: TrendingUp,
    title: "Performance Marketing",
    desc: "Strategic performance marketing campaigns that drive visibility, engagement, and measurable growth.",
    features: ["SEO Strategy", "Social Media", "Content Marketing", "Analytics"],
  },
  {
    icon: Fingerprint,
    title: "Visual Identity Systems",
    desc: "Build a memorable visual identity that resonates with your audience and stands out in the market.",
    features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
  },
  {
    icon: Code,
    title: "Custom Software",
    desc: "Bespoke, high-performance software architectures engineered to give your enterprise a decisive competitive advantage.",
    features: ["Bespoke Solutions", "System Integration", "Automation", "Maintenance"],
  },
  {
    icon: Database,
    title: "ERP & Business Systems",
    desc: "Intelligent, centralized command centers designed to automate complex operations and drive limitless scale.",
    features: ["Inventory Management", "Finance", "HR Module", "Reporting"],
  },
  {
    icon: Camera,
    title: "Media Production",
    desc: "High-end photography and cinematic videography shoots tailored to elevate your brand's visual storytelling.",
    features: ["Brand Photography", "Corporate Videos", "Product Shoots", "Post-Production"],
  },
];

const whyUs = [
  { icon: Zap, num: "50+", label: "Projects Delivered" },
  { icon: Shield, num: "100%", label: "Client Satisfaction" },
  { icon: Headphones, num: "24/7", label: "Support Available" },
  { icon: BarChart3, num: "10+", label: "Industries Covered" },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className={styles.heroContent}
            >
              <span className="kicker">Our Services</span>
              <h1 style={{ marginTop: 14 }}>
                We Turn Ideas Into{" "}
                <span className="highlight">Digital Reality</span>
              </h1>
              <p className="lead" style={{ maxWidth: 520, fontSize: 16, marginTop: 16 }}>
                From concept to launch, we provide comprehensive digital services
                that empower your business to thrive in the digital landscape.
              </p>
              <div className={styles.heroActions}>
                <Link href="/contact" className="btn">
                  Start a Project <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>

            {/* Floating service badges */}
            <motion.div
              className={styles.heroVisual}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <div className={styles.orbitRing} />
              <div className={styles.orbitRingInner} />
              {[Monitor, Globe, Smartphone, Palette, TrendingUp, Fingerprint].map((Icon, i) => (
                <motion.div
                  key={i}
                  className={styles.floatingBadge}
                  style={{
                    top: `${50 + 42 * Math.sin((i * Math.PI * 2) / 6 - Math.PI / 2)}%`,
                    left: `${50 + 42 * Math.cos((i * Math.PI * 2) / 6 - Math.PI / 2)}%`,
                  }}
                  animate={{
                    y: [0, i % 2 === 0 ? -8 : 8, 0],
                  }}
                  transition={{
                    duration: 3 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Icon size={20} />
                </motion.div>
              ))}
              <div className={styles.centerBadge}>
                <Code size={28} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <span className="kicker">What We Offer</span>
              <h2 style={{ marginTop: 12 }}>
                End-to-End Digital <span className="highlight">Solutions</span>
              </h2>
              <p className="lead" style={{ maxWidth: 550, margin: "16px auto 0", fontSize: 15 }}>
                Comprehensive services designed to elevate your digital presence
                and drive measurable business growth.
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            className={styles.servicesGrid}
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {services.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`${styles.serviceCard} ${s.featured ? styles.featured : ""}`}
                whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number] } }}
              >
                {s.featured && <span className={styles.badge}>Popular</span>}
                <div className={styles.serviceIcon}>
                  <s.icon size={28} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <ul className={styles.features}>
                  {s.features.map((f, j) => (
                    <li key={j}>
                      <CheckCircle size={14} /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={styles.serviceLink}>
                  Get Started <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <span className="kicker">Why Choose Upwrd</span>
              <h2 style={{ marginTop: 12 }}>
                We Deliver <span className="highlight">Excellence</span>
              </h2>
            </div>
          </ScrollReveal>
          <motion.div
            className={styles.whyGrid}
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {whyUs.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={styles.whyCard}
                whileHover={{ y: -6, transition: { duration: 0.35 } }}
              >
                <div className={styles.whyIcon}>
                  <item.icon size={22} />
                </div>
                <strong>{item.num}</strong>
                <span>{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
