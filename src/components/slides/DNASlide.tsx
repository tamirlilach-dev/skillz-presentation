"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DNA_CARDS } from "@/lib/constants";

interface DNASlideProps {
  isActive: boolean;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.3 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

/* ── FloatingPaths background ──────────────────────────────────────
   36 animated SVG paths per layer (×2 mirrored layers).
   Math.random() replaced with deterministic (i % 10) to avoid SSR
   hydration mismatch. Strokes are white on the dark background.   */
function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.8 + i * 0.04,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        style={{ color: "#ef4444" }}
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.15 + path.id * 0.02}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + (path.id % 10),
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

function FlipCard({ number, title, back }: { number: string; title: string; back: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      variants={cardVariant}
      className="flip-card w-full cursor-pointer slide-grain"
      style={{ aspectRatio: "4/3" }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div className="flip-card-inner w-full h-full"
           style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
        {/* Front */}
        <div
          className="flip-card-front w-full h-full rounded-2xl flex flex-col items-center justify-center gap-3 p-6"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <span
            className="font-black leading-none select-none"
            style={{
              fontSize: "clamp(3.5rem, 7vw, 5.5rem)",
              background: "linear-gradient(135deg, #e63946 0%, #ff6b6b 60%, #e63946 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.03em",
            }}
          >
            {number}
          </span>
          <span className="text-lg md:text-2xl font-bold text-white text-center">{title}</span>
          <div className="accent-line-center mt-1 opacity-50" />
          <span className="text-xs text-white/30 mt-1">לחץ לפרטים</span>
        </div>

        {/* Back */}
        <div
          className="flip-card-back w-full h-full rounded-2xl flex flex-col items-center justify-center p-5 gap-3"
          style={{
            background: "linear-gradient(135deg, rgba(230,57,70,0.85) 0%, rgba(180,30,40,0.95) 100%)",
            border: "1px solid rgba(230,57,70,0.4)",
            boxShadow: "0 0 60px rgba(230,57,70,0.25)",
          }}
        >
          <span className="text-base md:text-lg font-bold text-white text-center leading-relaxed">
            {back}
          </span>
          <span className="text-xs text-white/50">לחץ לחזרה</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function DNASlide({ isActive }: DNASlideProps) {
  return (
    <div
      dir="rtl"
      className="slide-rtl w-full h-screen flex flex-col items-center justify-center px-4 md:px-12 gap-6 md:gap-8 relative overflow-hidden slide-grain bg-pattern-court"
    >
      {/* ── Layer 1 (z:-1): dark base + red corner glow ─────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          background:
            "radial-gradient(ellipse at 92% 5%, rgba(230,57,70,0.14) 0%, transparent 50%), rgba(10,10,10,0.88)",
        }}
      />

      {/* ── Layer 2 (z:1): animated red paths ────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* ── Layer 3 (z:10): all slide content ────────────────────── */}
      <div
        className="relative flex flex-col items-center justify-center w-full h-full gap-6 md:gap-8 px-4 md:px-12"
        style={{ zIndex: 10 }}
      >
      {/* Decorative diagonal */}
      <div
        className="absolute top-16 left-8 opacity-10 pointer-events-none hidden md:block"
        style={{ width: 3, height: 120, background: "linear-gradient(to bottom, #e63946, transparent)", transform: "rotate(-20deg)" }}
      />

      {/* Header */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          className="text-center"
        >
          <h2
            className="font-black text-white heading-glow"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", letterSpacing: "-0.02em" }}
          >
            <span dir="rtl">ה-<bdi>DNA</bdi> של סקילז</span>
          </h2>
          <p className="text-base md:text-lg font-bold mt-2" style={{ color: "#e63946" }}>
            הרבה מעבר למשחק
          </p>
          <div className="accent-line-center mt-3" />
        </motion.div>
      )}

      {/* Cards – 2 cols mobile, 4 desktop */}
      {isActive && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 w-full max-w-5xl"
        >
          {DNA_CARDS.map((card) => (
            <FlipCard key={card.number} {...card} />
          ))}
        </motion.div>
      )}
      </div>{/* end Layer 3 content wrapper */}
    </div>
  );
}
