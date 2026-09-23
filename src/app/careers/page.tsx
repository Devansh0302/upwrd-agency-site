"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Clock, ArrowRight, Briefcase, Coffee, BookOpen, Heart } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./careers.module.css";

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

const perks = [
  { icon: Coffee, title: "Flexible Hours", desc: "Work when you're most productive." },
  { icon: BookOpen, title: "Learning Budget", desc: "Annual budget for courses and conferences." },
  { icon: Heart, title: "Health Benefits", desc: "Comprehensive health coverage for the team." },
  { icon: Briefcase, title: "Remote-Friendly", desc: "Work from anywhere that inspires you." },
];

const openings = [
  {
    title: "Senior Frontend Developer",
    dept: "Engineering",
    location: "Jaipur / Remote",
    type: "Full-Time",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "UI/UX Designer",
    dept: "Design",
    location: "Jaipur / Remote",
    type: "Full-Time",
    tags: ["Figma", "Design Systems", "Prototyping"],
  },
  {
    title: "Backend Developer",
    dept: "Engineering",
    location: "Jaipur",
    type: "Full-Time",
    tags: ["Node.js", "Python", "PostgreSQL"],
  },
  {
    title: "Digital Marketing Specialist",
    dept: "Marketing",
    location: "Remote",
    type: "Full-Time",
    tags: ["SEO", "Analytics", "Content Strategy"],
  },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            style={{ textAlign: "center", maxWidth: 700, margin: "0 auto" }}
          >
            <span className="kicker">Careers</span>
            <h1 style={{ marginTop: 14 }}>
              Join the <span className="highlight">Upwrd</span> Team
            </h1>
            <p className="lead" style={{ maxWidth: 600, margin: "16px auto 0", fontSize: 16 }}>
              We&apos;re looking for talented individuals who are passionate about
              building exceptional digital products.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Perks */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 50 }}>
              <span className="kicker">Why Work With Us</span>
              <h2 style={{ marginTop: 12 }}>Perks & Benefits</h2>
            </div>
          </ScrollReveal>
          <motion.div
            className="grid-4"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {perks.map((p, i) => (
              <motion.div key={i} variants={fadeUp} className="card" style={{ minHeight: 180 }}>
                <div className="card-icon">
                  <p.icon size={28} />
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 50 }}>
              <span className="kicker">Open Positions</span>
              <h2 style={{ marginTop: 12 }}>
                Find Your <span className="highlight">Role</span>
              </h2>
            </div>
          </ScrollReveal>
          <motion.div
            className={styles.jobsList}
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {openings.map((job, i) => (
              <motion.div key={i} variants={fadeUp} className={styles.jobCard}>
                <div className={styles.jobMain}>
                  <div>
                    <span className={styles.jobDept}>{job.dept}</span>
                    <h3>{job.title}</h3>
                    <div className={styles.jobMeta}>
                      <span><MapPin size={13} /> {job.location}</span>
                      <span><Clock size={13} /> {job.type}</span>
                    </div>
                  </div>
                  <div className={styles.jobRight}>
                    <div className={styles.jobTags}>
                      {job.tags.map((tag, j) => (
                        <span key={j} className={styles.jobTag}>{tag}</span>
                      ))}
                    </div>
                    <Link href="/contact" className="btn btn-sm">
                      Apply <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
