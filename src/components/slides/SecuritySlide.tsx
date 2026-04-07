"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Plane, Shield, FileText } from "lucide-react";

interface SecuritySlideProps {
  isActive: boolean;
}

const COLUMNS = [
  { Icon: Plane, title: "טיסות מאורגנות", text: "טיסות הלוך ושוב מסודרות יחד עם כל צוות המחנה. המראה 1/7 צהריים, חזור 9/7. שימוש בחברות תעופה ישראליות בלבד לביטחון מקסימלי." },
  { Icon: Shield, title: "אבטחה צמודה", text: "מאבטח ישראלי צמוד אשר יוצב מחוץ למלון ויבטיח מעטפת ביטחון לכל אורך השהייה." },
  { Icon: FileText, title: "ביטוח וביטולים", text: 'חובה לרכוש ביטוח נסיעות לחו"ל באופן עצמאי. סוכן מומלץ: דור גלס 052-527-8539. החזר כספי מלא בגין ביטול בשל מצב ביטחוני, עד שבועיים מתחילת המחנה.' },
];

const PHONE_RE = /(\d{3}-\d{3}-\d{4})/g;

/** Renders text with phone numbers highlighted in red */
function HighlightedText({ text }: { text: string }) {
  const parts = text.split(PHONE_RE);
  return (
    <>
      {parts.map((part, i) =>
        PHONE_RE.test(part) ? (
          <span key={i} style={{ color: "#e63946", fontWeight: 700 }}>{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.3 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export default function SecuritySlide({ isActive }: SecuritySlideProps) {
  return (
    <div
      dir="rtl"
      className="slide-rtl w-full min-h-screen lg:h-screen flex flex-col items-center justify-start lg:justify-center px-4 md:px-12 gap-4 md:gap-8 relative overflow-y-auto lg:overflow-hidden slide-grain py-6 lg:py-0"
      style={{ background: "#0a0a0a" }}
    >
      {/* ── Layer 1 (z:1): photo ─────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <Image
          src="/images/in_the_airport.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ filter: "grayscale(100%)", opacity: 0.2 }}
        />
      </div>

      {/* ── Layer 2 (z:2): dark overlay ──────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2, background: "rgba(10,10,10,0.8)" }}
      />

      {/* ── Layer 3 (z:10): all content ──────────────────────── */}
      <div className="relative flex flex-col items-center w-full gap-8 md:gap-10" style={{ zIndex: 10 }}>

      {/* Title */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          className="text-center"
        >
          <h2
            className="font-black text-white heading-glow"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", letterSpacing: "-0.02em" }}
          >
            הגנה הרמטית
          </h2>
          <p className="text-base md:text-lg font-bold mt-1" style={{ color: "#e63946" }}>
            לוגיסטיקה, ביטחון ושקט נפשי
          </p>
          <div className="accent-line-center mt-3" />
        </motion.div>
      )}

      {/* 3 columns – 1 col mobile, 3 desktop */}
      {isActive && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 w-full max-w-5xl"
        >
          {COLUMNS.map(({ Icon, title, text }) => (
            <motion.div
              key={title}
              variants={cardVariant}
              className="flex flex-col items-center text-center gap-3 rounded-2xl slide-grain p-4 md:p-8"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(230,57,70,0.4)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 0 8px rgba(230,57,70,0.3), 0 0 20px rgba(230,57,70,0.12)",
                transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(230,57,70,0.7)";
                e.currentTarget.style.boxShadow = "0 0 14px rgba(230,57,70,0.5), 0 0 35px rgba(230,57,70,0.25)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(230,57,70,0.4)";
                e.currentTarget.style.boxShadow = "0 0 8px rgba(230,57,70,0.3), 0 0 20px rgba(230,57,70,0.12)";
                e.currentTarget.style.transform = "";
              }}
            >
              {/* Icon with pulse glow */}
              <motion.div
                className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(230,57,70,0.1)",
                  border: "1px solid rgba(230,57,70,0.2)",
                }}
                animate={{
                  boxShadow: [
                    "0 0 10px rgba(230,57,70,0.2), 0 0 20px rgba(230,57,70,0.1)",
                    "0 0 20px rgba(230,57,70,0.45), 0 0 40px rgba(230,57,70,0.25)",
                    "0 0 10px rgba(230,57,70,0.2), 0 0 20px rgba(230,57,70,0.1)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Icon className="w-5 h-5 md:w-8 md:h-8" style={{ color: "#e63946" }} />
              </motion.div>

              <h3
                className="font-black text-white"
                style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", marginBottom: 12 }}
              >
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#b0b0b0", lineHeight: 1.65 }}>
                <HighlightedText text={text} />
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}

      </div>{/* end Layer 3 content */}
    </div>
  );
}
