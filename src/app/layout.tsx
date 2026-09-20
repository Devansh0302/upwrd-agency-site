import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Emperian Tech Solutions — Innovative Digital Solutions For A Connected World",
  description:
    "We specialize in creating dynamic websites, web applications, and mobile applications tailored to your unique needs. Transform your ideas into reality.",
  keywords: [
    "web development",
    "mobile app development",
    "UI/UX design",
    "digital marketing",
    "branding",
    "technology solutions",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <CursorGlow />
        <Navbar />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
