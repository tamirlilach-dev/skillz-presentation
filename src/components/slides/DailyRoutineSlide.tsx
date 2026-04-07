"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface DailyRoutineSlideProps {
  isActive: boolean;
}

const EASE_SPRING = [0.34, 1.56, 0.64, 1] as [number, number, number, number];
const EASE_SMOOTH = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

// gap between grid cells in px — connector divs must match this
const GAP = 20;

/* Card style shared */
const cardStyle: React.CSSProperties = {
  background: "rgba(10,10,10,0.7)",
  backdropFilter: "blur(10px)",
  borderRadius: "12px",
  border: "1px solid rgba(230,57,70,0.5)",
  boxShadow: "0 0 8px rgba(230,57,70,0.3), 0 0 20px rgba(230,57,70,0.12)",
  padding: "24px",
};

/* Glowing connector line styles */
const connectorV: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  width: 1,
  height: GAP,
  background: "rgba(255,255,255,0.3)",
  boxShadow: "0 0 6px rgba(255,255,255,0.3), 0 0 12px rgba(230,57,70,0.2)",
};

const connectorH: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: GAP,
  height: 1,
  background: "rgba(255,255,255,0.3)",
  boxShadow: "0 0 6px rgba(255,255,255,0.3), 0 0 12px rgba(230,57,70,0.2)",
};

export default function DailyRoutineSlide({ isActive }: DailyRoutineSlideProps) {
  return (
    <div
      dir="rtl"
      className="slide-rtl w-full h-screen flex flex-col items-center justify-center px-4 md:px-12 gap-4 md:gap-5 relative overflow-hidden slide-grain"
    >
      {/* ── Photo background ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        <Image
          src="/images/training4.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ filter: "grayscale(100%)", opacity: 0.25 }}
          priority
        />
        <div className="absolute inset-0" style={{ background: "rgba(10,10,10,0.75)" }} />
      </div>

      {/* ── Title ─────────────────────────────────────────────── */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: -22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_SMOOTH }}
          className="text-center"
        >
          <h2
            className="font-black text-white heading-glow"
            style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.8rem)", letterSpacing: "-0.02em" }}
          >
            הקצב של קפריסין: סדר יום משוער
          </h2>
          <div className="accent-line-center mt-3" />
        </motion.div>
      )}

      {/* ── Mobile layout: infinity + 2×2 cards ──────────────── */}
      {isActive && (
        <div className="flex flex-col items-center gap-3 w-full md:hidden">
          <motion.span
            className="font-black select-none"
            style={{
              fontSize: "5rem",
              lineHeight: 1,
              display: "block",
              background: "linear-gradient(135deg, #ffffff 0%, #dc2626 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            animate={{
              filter: [
                "drop-shadow(0 0 6px rgba(255,255,255,0.3)) drop-shadow(0 0 15px rgba(220,38,38,0.3))",
                "drop-shadow(0 0 12px rgba(255,255,255,0.6)) drop-shadow(0 0 30px rgba(220,38,38,0.6))",
                "drop-shadow(0 0 6px rgba(255,255,255,0.3)) drop-shadow(0 0 15px rgba(220,38,38,0.3))",
              ],
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            ∞
          </motion.span>
          <div className="grid grid-cols-2 gap-2 w-full">
            {[
              { title: "בוקר 🏀", time: "10:00", body: "אימון בוקר אינטנסיבי – עבודה על יסודות, כושר וטכניקה." },
              { title: "צהריים 🏀", time: null, body: "התאוששות במלון – ארוחת צהריים, מנוחה וזמן בריכה." },
              { title: 'אחה"צ/ערב 🏀', time: "17:00", body: "אימון ערב או משחק תחרותי (כולל מול קבוצות מקומיות)." },
              { title: "לילה 🏀", time: null, body: "פעילויות גיבוש חברתיות, סיכום יום וארוחת ערב." },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: EASE_SPRING }}
                className="flex flex-col gap-1 rounded-xl"
                style={{ ...cardStyle, padding: "14px", overflow: "visible" }}
              >
                <div style={{ marginBottom: 4 }}>
                  <span className="text-xs font-bold text-white">{card.title}</span>
                  {card.time && <span className="text-xs font-bold block" style={{ color: "#dc2626" }}>{card.time}</span>}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#d0d0d0", lineHeight: 1.55 }}>{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ── Desktop grid 3×3 ──────────────────────────────────── */}
      {isActive && (
        <div
          className="hidden md:grid w-full max-w-4xl"
          style={{
            gridTemplateColumns: "1fr auto 1fr",
            gridTemplateRows: "auto auto auto",
            gap: GAP,
          }}
        >
          {/* ── TOP box: לילה (enters from top) ─────────────── */}
          <motion.div
            initial={{ opacity: 0, y: -45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35, ease: EASE_SPRING }}
            className="col-start-2 row-start-1 flex flex-col gap-1 relative"
            style={{ ...cardStyle, minWidth: "clamp(160px, 24vw, 260px)", overflow: "visible" }}
          >
            <div className="flex items-center gap-2 flex-nowrap" style={{ marginBottom: 8 }}>
              <span className="text-sm md:text-base font-bold text-white">לילה</span>
              <span>🏀</span>
            </div>
            <p className="text-xs md:text-sm leading-relaxed" style={{ color: "#d0d0d0", lineHeight: 1.65 }}>
              פעילויות גיבוש חברתיות, סיכום יום וארוחת ערב.
            </p>
            {/* Connector ↓ */}
            <div style={{ ...connectorV, bottom: -GAP }} />
          </motion.div>

          {/* ── RIGHT box: בוקר (enters from right) ──────────── */}
          <motion.div
            initial={{ opacity: 0, x: 55 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.5, ease: EASE_SPRING }}
            className="col-start-3 row-start-2 flex flex-col gap-1 relative"
            style={{ ...cardStyle, overflow: "visible" }}
          >
            <div style={{ marginBottom: 8 }}>
              <div className="flex items-center gap-2 flex-nowrap">
                <span className="text-sm md:text-base font-bold text-white">בוקר</span>
                <span>🏀</span>
              </div>
              <span className="text-xs font-bold" style={{ color: "#e63946" }}>10:00</span>
            </div>
            <p className="text-xs md:text-sm leading-relaxed" style={{ color: "#d0d0d0", lineHeight: 1.65 }}>
              אימון בוקר אינטנסיבי – עבודה על יסודות, כושר וטכניקה.
            </p>
            {/* Connector ← */}
            <div style={{ ...connectorH, left: -GAP }} />
          </motion.div>

          {/* ── CENTER: ∞ symbol ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.2, ease: EASE_SPRING }}
            className="col-start-2 row-start-2 flex items-center justify-center"
          >
            <motion.span
              className="font-black select-none"
              style={{
                fontSize: "clamp(8rem, 18vw, 15rem)",
                lineHeight: 1,
                display: "block",
                background: "linear-gradient(135deg, #ffffff 0%, #e63946 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              animate={{
                filter: [
                  "drop-shadow(0 0 8px rgba(255,255,255,0.4)) drop-shadow(0 0 20px rgba(230,57,70,0.3)) drop-shadow(0 0 40px rgba(230,57,70,0.15))",
                  "drop-shadow(0 0 16px rgba(255,255,255,0.7)) drop-shadow(0 0 40px rgba(230,57,70,0.6)) drop-shadow(0 0 80px rgba(230,57,70,0.35))",
                  "drop-shadow(0 0 8px rgba(255,255,255,0.4)) drop-shadow(0 0 20px rgba(230,57,70,0.3)) drop-shadow(0 0 40px rgba(230,57,70,0.15))",
                ],
              }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              ∞
            </motion.span>
          </motion.div>

          {/* ── BOTTOM box: צהריים (enters from bottom) ───────── */}
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.5, ease: EASE_SPRING }}
            className="col-start-2 row-start-3 flex flex-col gap-1 relative"
            style={{ ...cardStyle, minWidth: "clamp(160px, 24vw, 260px)", overflow: "visible" }}
          >
            <div className="flex items-center gap-2 flex-nowrap" style={{ marginBottom: 8 }}>
              <span className="text-sm md:text-base font-bold text-white">צהריים</span>
              <span>🏀</span>
            </div>
            <p className="text-xs md:text-sm leading-relaxed" style={{ color: "#d0d0d0", lineHeight: 1.65 }}>
              התאוששות במלון – ארוחת צהריים, מנוחה וזמן בריכה.
            </p>
            {/* Connector ↑ */}
            <div style={{ ...connectorV, top: -GAP }} />
          </motion.div>

          {/* ── LEFT box: אחה״צ/ערב (enters from left) ─────────── */}
          <motion.div
            initial={{ opacity: 0, x: -55 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.5, ease: EASE_SPRING }}
            className="col-start-1 row-start-2 flex flex-col gap-1 relative"
            style={{ ...cardStyle, overflow: "visible" }}
          >
            <div style={{ marginBottom: 8 }}>
              <div className="flex items-center gap-2 flex-nowrap">
                <span className="text-sm md:text-base font-bold text-white">אחה&quot;צ/ערב</span>
                <span>🏀</span>
              </div>
              <span className="text-xs font-bold" style={{ color: "#e63946" }}>17:00</span>
            </div>
            <p className="text-xs md:text-sm leading-relaxed" style={{ color: "#d0d0d0", lineHeight: 1.65 }}>
              אימון ערב או משחק תחרותי (כולל מול קבוצות מקומיות).
            </p>
            {/* Connector → */}
            <div style={{ ...connectorH, right: -GAP }} />
          </motion.div>
        </div>
      )}

      {/* ── Bottom note ───────────────────────────────────────── */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="rounded-3xl px-5 py-3 text-xs md:text-sm font-bold text-white text-center max-w-xl"
          style={{
            background: "linear-gradient(135deg, #e63946 0%, #c1303b 100%)",
            boxShadow: "0 4px 24px rgba(230,57,70,0.4), 0 0 0 1px rgba(255,255,255,0.08)",
          }}
        >
          📌 הערה: לו&quot;ז גמיש הכולל גם חצאי ימים המוקדשים לאטרקציות ופנאי!
        </motion.div>
      )}
    </div>
  );
}
