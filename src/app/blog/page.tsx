"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, User } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./blog.module.css";

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

const posts = [
  {
    title: "The Future of Web Development in 2026",
    excerpt: "Explore the latest trends shaping the web development landscape, from AI-powered tools to new frameworks.",
    category: "Technology",
    date: "Sep 15, 2026",
    readTime: "5 min read",
    author: "Arjun Patel",
    featured: true,
    gradient: "linear-gradient(135deg, #1a1a2e, #0a0a15)",
  },
  {
    title: "Why Your Business Needs a Mobile App",
    excerpt: "Discover how mobile applications can drive customer engagement and boost your bottom line.",
    category: "Business",
    date: "Sep 10, 2026",
    readTime: "4 min read",
    author: "Sneha Kapoor",
    featured: true,
    gradient: "linear-gradient(135deg, #1e2a1e, #0a150a)",
  },
  {
    title: "UI/UX Design Principles for Modern Apps",
    excerpt: "Learn the key design principles that make applications intuitive, beautiful, and effective.",
    category: "Design",
    date: "Sep 05, 2026",
    readTime: "6 min read",
    author: "Meera Joshi",
    featured: false,
    gradient: "linear-gradient(135deg, #2a1e1e, #150a0a)",
  },
  {
    title: "SEO Best Practices for 2026",
    excerpt: "Stay ahead of the competition with the latest search engine optimization strategies.",
    category: "Marketing",
    date: "Aug 28, 2026",
    readTime: "7 min read",
    author: "Vikram Singh",
    featured: false,
    gradient: "linear-gradient(135deg, #2a2a1e, #15150a)",
  },
  {
    title: "How to Choose the Right Tech Stack",
    excerpt: "A comprehensive guide to selecting the best technologies for your next project.",
    category: "Technology",
    date: "Aug 20, 2026",
    readTime: "8 min read",
    author: "Arjun Patel",
    featured: false,
    gradient: "linear-gradient(135deg, #1e1e2a, #0a0a15)",
  },
  {
    title: "The Power of Branding in the Digital Age",
    excerpt: "Why strong branding is more important than ever in today's crowded digital marketplace.",
    category: "Branding",
    date: "Aug 12, 2026",
    readTime: "5 min read",
    author: "Sneha Kapoor",
    featured: false,
    gradient: "linear-gradient(135deg, #1a2a1e, #0a150a)",
  },
];

export default function BlogPage() {
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
            <span className="kicker">Our Blog</span>
            <h1 style={{ marginTop: 14 }}>
              Insights & <span className="highlight">Ideas</span>
            </h1>
            <p className="lead" style={{ maxWidth: 600, fontSize: 16, marginTop: 16 }}>
              Thoughts on technology, design, and building digital products that
              make a difference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <ScrollReveal>
            <span className="kicker" style={{ marginBottom: 24, display: "inline-block" }}>Featured</span>
          </ScrollReveal>
          <motion.div
            className={styles.featuredGrid}
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {posts.filter(p => p.featured).map((post, i) => (
              <motion.article key={i} variants={fadeUp} className={styles.featuredCard}>
                <div className={styles.featuredImg} style={{ background: post.gradient }}>
                  <span className={styles.categoryBadge}>{post.category}</span>
                </div>
                <div className={styles.featuredBody}>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <div className={styles.meta}>
                    <span><User size={13} /> {post.author}</span>
                    <span><Clock size={13} /> {post.readTime}</span>
                  </div>
                  <Link href="#" className={styles.readMore}>
                    Read Article <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* All Posts */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <span className="kicker" style={{ marginBottom: 24, display: "inline-block" }}>All Articles</span>
          </ScrollReveal>
          <motion.div
            className={styles.postsGrid}
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {posts.filter(p => !p.featured).map((post, i) => (
              <motion.article key={i} variants={fadeUp} className={styles.postCard}>
                <div className={styles.postImg} style={{ background: post.gradient }}>
                  <span className={styles.categoryBadge}>{post.category}</span>
                </div>
                <div className={styles.postBody}>
                  <div className={styles.postDate}>{post.date}</div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className={styles.meta}>
                    <span><Clock size={13} /> {post.readTime}</span>
                  </div>
                  <Link href="#" className={styles.readMore}>
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
