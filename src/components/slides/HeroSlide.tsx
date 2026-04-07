"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { REGISTRATION_URL } from "@/lib/constants";

interface HeroSlideProps {
  isActive: boolean;
}

export default function HeroSlide({ isActive }: HeroSlideProps) {
  const scrollToNext = () => {
    const swiperEl = document.querySelector(".swiper") as HTMLElement & {
      swiper?: { slideNext: () => void };
    };
    swiperEl?.swiper?.slideNext();
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center slide-grain">
      {/* Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover scale-105"
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero_poster.jpg"
        style={{ willChange: "transform" }}
      />

      {/* Cinematic gradient overlay – NOT flat black */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 40%, rgba(10,10,10,0.92) 100%)",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 vignette z-10" />

      {/* Red radial glow behind content */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(230,57,70,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 gap-5">
        {/* Logo – blur-in */}
        {isActive && (
          <motion.div
            initial={{ scale: 0.75, opacity: 0, filter: "blur(20px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Image
              src="/images/logo2026_white.png"
              alt="SKILLZ 2026"
              width={300}
              height={150}
              className="object-contain drop-shadow-2xl w-44 md:w-72"
              priority
            />
          </motion.div>
        )}

        {/* Main title – clip-path reveal */}
        {isActive && (
          <motion.h1
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
            transition={{ duration: 0.85, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight heading-glow"
            style={{ letterSpacing: "-0.02em" }}
          >
            מחנה אימונים SKILLZ קפריסין 2026
          </motion.h1>
        )}

        {/* Tagline */}
        {isActive && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-5xl font-black"
            style={{ color: "#dc2626", textShadow: "0 0 30px rgba(220,38,38,0.4)" }}
          >
            כדורסל בליגה אחרת
          </motion.p>
        )}

        {/* Accent divider */}
        {isActive && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 1.25 }}
            className="accent-line-center"
          />
        )}

        {/* Info line */}
        {isActive && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.35 }}
            className="text-sm md:text-base font-medium"
            style={{ color: "rgba(255,255,255,0.55)", letterSpacing: "0.04em" }}
          >
            📍 לימסול, קפריסין &nbsp;·&nbsp; 📅 1–9 ביולי 2026 &nbsp;·&nbsp; 🏀 8 ימי כדורסל נטו
          </motion.p>
        )}

        {/* Buttons */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="flex flex-col sm:flex-row gap-4 mt-2"
          >
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button animate-pulse-red px-9 py-4 text-white text-lg font-bold"
            >
              להרשמה
            </a>
            <button
              onClick={scrollToNext}
              className="px-9 py-4 rounded-full text-white text-lg font-bold transition-all duration-300 hover:bg-white/10 hover:scale-105"
              style={{
                border: "1px solid rgba(255,255,255,0.25)",
                backdropFilter: "blur(8px)",
              }}
            >
              לפרטי המחנה →
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
