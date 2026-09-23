"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send, Clock, Loader2, CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./contact.module.css";

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

// Get your free access key at https://web3forms.com
const WEB3FORMS_KEY = "504b6eb6-3b01-4fff-95a2-66b91461b44d";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("loading");

    const formData = new FormData(formRef.current);
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", "New Inquiry from Upwrd Website");
    formData.append("from_name", "Upwrd Website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        formRef.current.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

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
            <span className="kicker">Get In Touch</span>
            <h1 style={{ marginTop: 14 }}>
              Let&apos;s Start a <span className="highlight">Conversation</span>
            </h1>
            <p className="lead" style={{ maxWidth: 550, margin: "16px auto 0", fontSize: 16 }}>
              Have a project in mind? We&apos;d love to hear about it. Tell us what
              you need and we&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <div className={styles.contactGrid}>
            {/* Info Cards */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={styles.infoColumn}
            >
              <motion.div variants={fadeUp} className={styles.infoCard}>
                <div className={styles.infoIcon}><Mail size={22} /></div>
                <div>
                  <h3>Email Us</h3>
                  <a href="mailto:upwrd.tech@gmail.com">upwrd.tech@gmail.com</a>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className={styles.infoCard}>
                <div className={styles.infoIcon}><Phone size={22} /></div>
                <div>
                  <h3>Call Us</h3>
                  <a href="tel:+918005621022">+91 80056 21022</a>
                  <a href="tel:+917976024405" style={{ display: 'block', marginTop: 4 }}>+91 79760 24405</a>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className={styles.infoCard}>
                <div className={styles.infoIcon}><Clock size={22} /></div>
                <div>
                  <h3>Business Hours</h3>
                  <p>Mon - Sat: 10:00 AM - 7:00 PM</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Form */}
            <ScrollReveal delay={100}>
              <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
                <h2 className={styles.formTitle}>
                  Send us a <span className="highlight">Message</span>
                </h2>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Full Name</label>
                    <input type="text" name="name" placeholder="Alex Smith" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Email Address</label>
                    <input type="email" name="email" placeholder="alex@example.com" required />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Phone</label>
                    <input type="tel" name="phone" placeholder="+91 00000 00000" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Service Needed</label>
                    <select name="service" defaultValue="">
                      <option value="" disabled>Select a service</option>
                      <option>Digital Platforms</option>
                      <option>Cloud Applications</option>
                      <option>ERP & Custom Software</option>
                      <option>Performance Marketing</option>
                      <option>Visual Identity Systems</option>
                      <option>Media Production</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className={styles.formGroup} style={{ marginTop: 16 }}>
                  <label>Project Details</label>
                  <textarea name="message" rows={5} placeholder="Tell us about your project..." required />
                </div>
                <button
                  type="submit"
                  className={`btn ${styles.submitBtn}`}
                  disabled={status === "loading"}
                >
                  {status === "loading" && (
                    <><Loader2 size={16} className={styles.spinner} /> Sending...</>
                  )}
                  {status === "success" && (
                    <><CheckCircle size={16} /> Message Sent!</>
                  )}
                  {status === "error" && (
                    <>Failed — Try Again</>
                  )}
                  {status === "idle" && (
                    <>Send Message <Send size={16} /></>
                  )}
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
