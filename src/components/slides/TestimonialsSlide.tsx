"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { TESTIMONIALS } from "@/lib/constants";

interface TestimonialsSlideProps {
  isActive: boolean;
}

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

function TypingText({ text, isActive, delay = 0 }: { text: string; isActive: boolean; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    const timer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [isActive, delay]);

  useEffect(() => {
    if (!started) return;
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++; }
      else clearInterval(interval);
    }, 22);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span className={displayed.length < text.length && started ? "typing-cursor" : ""}>
      {displayed}
    </span>
  );
}

export default function TestimonialsSlide({ isActive }: TestimonialsSlideProps) {
  return (
    <div
      dir="rtl"
      className="slide-rtl w-full h-screen flex flex-col items-center justify-center px-4 md:px-12 gap-6 md:gap-8 relative overflow-hidden slide-grain"
      style={{ background: "#0a0a0a" }}
    >
      {/* ── Layer 1 (z:1): photo ─────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <Image
          src="/images/kids_in_hotel_pool.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ filter: "grayscale(100%)", opacity: 0.15 }}
        />
      </div>

      {/* ── Layer 2 (z:2): dark overlay ──────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2, background: "rgba(10,10,10,0.8)" }}
      />

      {/* ── Decorative giant quotes (z:3) ────────────────────── */}
      <span
        className="absolute font-black select-none pointer-events-none"
        style={{
          top: "2%", right: "2%",
          fontSize: "clamp(80px, 15vw, 200px)", lineHeight: 1,
          color: "#dc2626", opacity: 0.12,
          fontFamily: "serif",
          zIndex: 3,
        }}
      >
        ❝
      </span>
      <span
        className="absolute font-black select-none pointer-events-none"
        style={{
          bottom: "2%", left: "2%",
          fontSize: "clamp(80px, 15vw, 200px)", lineHeight: 1,
          color: "#dc2626", opacity: 0.12,
          fontFamily: "serif",
          zIndex: 3,
        }}
      >
        ❞
      </span>

      {/* ── Layer 3 (z:10): all content ──────────────────────── */}
      <div className="relative flex flex-col items-center w-full gap-6 md:gap-8" style={{ zIndex: 10 }}>

        {/* Title */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center"
          >
            <h2
              className="font-black text-white heading-glow"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", letterSpacing: "-0.02em" }}
            >
              <span dir="rtl">ה-<bdi>MVP</bdi> האמיתיים</span>
            </h2>
            <p className="text-base md:text-lg font-bold mt-1" style={{ color: "#e63946" }}>
              מה אומרים ההורים?
            </p>
            <div className="accent-line-center mt-3" />
          </motion.div>
        )}

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-5xl">
          {TESTIMONIALS.map((t, i) => (
            isActive && (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i === 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.25 + i * 0.2, ease: EASE }}
                className="relative rounded-2xl overflow-hidden slide-grain"
                style={{
                  background: "rgba(10,10,10,0.6)",
                  border: "1px solid rgba(230,57,70,0.4)",
                  borderRight: "3px solid #e63946",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 0 8px rgba(230,57,70,0.3), 0 0 20px rgba(230,57,70,0.12)",
                  padding: "32px",
                }}
              >
                <p
                  className="relative leading-relaxed"
                  style={{ color: "#d0d0d0", lineHeight: 1.75, fontSize: "clamp(1rem, 1.5vw, 1.05rem)", minHeight: "4rem" }}
                >
                  <TypingText text={t.text} isActive={isActive} delay={0.7 + i * 0.2} />
                </p>

                {/* Signature with fade-in delay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 + i * 0.2 }}
                  className="mt-5 pt-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="rounded-full mb-3"
                    style={{ width: 40, height: 3, background: "linear-gradient(90deg, #e63946, transparent)" }}
                  />
                  <p className="font-bold" style={{ color: "#e63946", fontSize: "clamp(0.95rem, 1.8vw, 1.125rem)" }}>
                    – {t.author}
                  </p>
                </motion.div>
              </motion.div>
            )
          ))}
        </div>

      </div>{/* end Layer 3 content */}
    </div>
  );
}
