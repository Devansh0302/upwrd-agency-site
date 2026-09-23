"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Users, Target, Zap, Heart, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./about.module.css";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as [number, number, number, number] },
  },
};

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    desc: "Every project starts with understanding your mission and ends with delivering measurable impact.",
  },
  {
    icon: Zap,
    title: "Innovation First",
    desc: "We leverage the latest technologies and methodologies to build solutions that are future-proof.",
  },
  {
    icon: Users,
    title: "Collaborative Spirit",
    desc: "Your team is our team. We work closely with you throughout every step of the process.",
  },
  {
    icon: Heart,
    title: "Passion for Craft",
    desc: "We pour craftsmanship into every pixel, every line of code, and every interaction.",
  },
];

const team = [
  { name: "Devansh Khandelwal", role: "Founder & CTO", initial: "D" },
  { name: "Vansh Khandelwal", role: "Co-Founder", initial: "V" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <span className="kicker">About Us</span>
            <h1 style={{ marginTop: 14 }}>
              We Build Digital Products{" "}
              <span className="highlight">That Matter</span>
            </h1>
            <p className="lead" style={{ maxWidth: 620, fontSize: 16, marginTop: 16 }}>
              We combine technology, design and business thinking to create practical
              systems that make companies faster, more organized and easier to scale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section">
        <div className="container">
          <div className={styles.storyGrid}>
            <ScrollReveal>
              <div className={styles.storyContent}>
                <span className="kicker">Our Story</span>
                <h2 style={{ marginTop: 12 }}>
                  From a Small Idea to a{" "}
                  <span className="highlight">Big Vision</span>
                </h2>
                <p>
                  Upwrd was founded with a simple belief: technology
                  should empower businesses, not complicate them. Starting from Jaipur,
                  Rajasthan, our team of passionate developers and designers set out to
                  bridge the gap between innovative technology and practical business needs.
                </p>
                <p>
                  Today, we serve clients across multiple industries, helping them
                  transform their digital presence and streamline their operations. Our
                  approach combines cutting-edge technology with deep business understanding
                  to deliver solutions that truly make a difference.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className={styles.quoteBox}>
                <div className={styles.quoteText}>
                  &ldquo;We don&apos;t just build software.{" "}
                  <span className="highlight">
                    We build the systems behind growth.
                  </span>
                  &rdquo;
                </div>
                <div className={styles.quoteDivider} />
                <p style={{ color: "var(--muted)", fontSize: 13 }}>
                  — The Upwrd Team
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <span className="kicker">Our Values</span>
              <h2 style={{ marginTop: 12 }}>What Drives Us</h2>
            </div>
          </ScrollReveal>
          <motion.div
            className="grid-4"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {values.map((v, i) => (
              <motion.div key={i} variants={fadeUp} className="card">
                <div className="card-icon">
                  <v.icon size={28} />
                </div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <span className="kicker">Our Team</span>
              <h2 style={{ marginTop: 12 }}>
                The Minds Behind <span className="highlight">Upwrd</span>
              </h2>
            </div>
          </ScrollReveal>
          <motion.div
            className="grid-2"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {team.map((t, i) => (
              <motion.div key={i} variants={fadeUp} className={styles.teamCard}>
                <div className={styles.teamAvatar}>{t.initial}</div>
                <h3>{t.name}</h3>
                <span className={styles.teamRole}>{t.role}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section">
        <div className="container">
          <motion.div
            className={styles.statsGrid}
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              { value: "2025", label: "Founded" },
              { value: "10+", label: "Projects Completed" },
              { value: "7+", label: "Clients Served" },
              { value: "3+", label: "Team Members" },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} className={styles.statItem}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
