"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

const MiniMap = dynamic(() => import("@/components/MiniMap"), { ssr: false });

interface ArenaSlideProps {
  isActive: boolean;
}

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];
const EASE_SPRING = [0.34, 1.56, 0.64, 1] as [number, number, number, number];

const COURT_IMAGES = [
  { src: "/images/court1.jpg",              alt: "אולם כדורסל 1" },
  { src: "/images/court2.jpeg",             alt: "אולם כדורסל 2" },
  { src: "/images/games_v_local_teams.jpg", alt: "משחק מול קבוצה מקומית" },
];

export default function ArenaSlide({ isActive }: ArenaSlideProps) {
  const [imgIndex, setImgIndex] = useState(0);

  // auto-advance every 4 s, pause when slide is not active
  useEffect(() => {
    if (!isActive) return;
    const timer = setInterval(() => {
      setImgIndex((i) => (i + 1) % COURT_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isActive]);

  return (
    <div
      dir="rtl"
      className="slide-rtl w-full h-screen flex flex-col items-center justify-center px-4 md:px-12 gap-5 relative overflow-hidden slide-grain bg-pattern-tactical"
    >
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
            style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.8rem)", letterSpacing: "-0.02em" }}
          >
            הארנה: מתקנים ברמת יורוליג
          </h2>
          <div className="accent-line-center mt-3" />
        </motion.div>
      )}

      {/* Layout: images left (RTL = right visually), text+map right */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-center">

        {/* ── Cinematic carousel ────────────────────────────────── */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: EASE }}
            className="flex flex-col gap-2 flex-shrink-0"
          >
            {/* Rotated frame with neon border */}
            <div
              className="relative h-52 md:h-68 rounded-2xl overflow-hidden"
              style={{
                transform: "rotate(2deg)",
                border: "1px solid #e63946",
                boxShadow: "0 0 8px rgba(230,57,70,0.4), 0 0 20px rgba(230,57,70,0.15), inset 0 0 8px rgba(230,57,70,0.05), 0 20px 60px rgba(0,0,0,0.65)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={imgIndex}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <Image
                    src={COURT_IMAGES[imgIndex].src}
                    alt={COURT_IMAGES[imgIndex].alt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent 55%)" }} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot navigation */}
            <div className="flex justify-center gap-2 pt-1">
              {COURT_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIndex(i)}
                  style={{
                    width: i === imgIndex ? 22 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === imgIndex ? "#e63946" : "rgba(255,255,255,0.25)",
                    boxShadow: i === imgIndex ? "0 0 10px rgba(230,57,70,0.6)" : "",
                    transition: "all 0.3s ease",
                    border: "none",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Text + Map ────────────────────────────────────────── */}
        <div className="flex flex-col gap-3">
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.35, ease: EASE }}
              className="rounded-2xl p-4 md:p-5 flex flex-col gap-3 slide-grain relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Decorative large "2" in background */}
              <span
                className="absolute font-black select-none pointer-events-none"
                style={{
                  fontSize: "8rem",
                  lineHeight: 1,
                  color: "#e63946",
                  opacity: 0.1,
                  top: "-1rem",
                  left: "0.5rem",
                  letterSpacing: "-0.05em",
                }}
              >
                2
              </span>

              <div className="relative">
                <h3 className="text-base md:text-lg font-bold mb-1" style={{ color: "#e63946" }}>
                  מתחם אימונים מקצועי
                </h3>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: "#d0d0d0", lineHeight: 1.7 }}>
                  שני אולמות כדורסל תקניים ברמה הגבוהה ביותר, צמודים למלון כדי למקסם את זמן האימון ולשמור על מיקוד.
                </p>
              </div>

              <div className="accent-line opacity-40" />

              <div className="relative">
                <h3 className="text-base md:text-lg font-bold mb-1" style={{ color: "#e63946" }}>
                  תחרות בינלאומית
                </h3>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: "#d0d0d0", lineHeight: 1.7 }}>
                  משחקי אימון מרתקים נגד קבוצות נוער מקומיות מקפריסין. חוויה שמעלה את הרמה התחרותית ומדמה משחקי חוץ באירופה.
                </p>
              </div>

              {/* Walking distance badge */}
              <div className="relative flex">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #e63946, #c1303b)",
                    boxShadow: "0 2px 12px rgba(230,57,70,0.4)",
                  }}
                >
                  🚶 מרחק הליכה: 2 דקות
                </span>
              </div>
            </motion.div>
          )}

          {/* Map with neon border */}
          {isActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.55, ease: EASE_SPRING }}
              className="rounded-2xl overflow-hidden h-40 md:h-44"
              style={{
                border: "1px solid #e63946",
                boxShadow: "0 0 8px rgba(230,57,70,0.4), 0 0 20px rgba(230,57,70,0.15), inset 0 0 8px rgba(230,57,70,0.05)",
              }}
            >
              <MiniMap />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
