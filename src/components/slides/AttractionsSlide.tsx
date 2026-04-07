"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface AttractionsSlideProps {
  isActive: boolean;
}

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const neonBorder: React.CSSProperties = {
  border: "1px solid rgba(230,57,70,0.4)",
  boxShadow: "0 0 8px rgba(230,57,70,0.3), 0 0 20px rgba(230,57,70,0.12)",
  transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
};

const neonBorderHover = {
  border: "1px solid rgba(230,57,70,0.7)",
  boxShadow: "0 0 14px rgba(230,57,70,0.5), 0 0 35px rgba(230,57,70,0.25)",
  transform: "scale(1.02)",
};

export default function AttractionsSlide({ isActive }: AttractionsSlideProps) {
  return (
    <div
      dir="rtl"
      className="slide-rtl w-full h-screen flex flex-col items-center justify-center px-4 md:px-12 gap-6 md:gap-8 relative overflow-hidden slide-grain bg-pattern-dots"
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
            style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", letterSpacing: "-0.02em" }}
          >
            מחוץ למגרש: אטרקציות ופנאי
          </h2>
          <div className="accent-line-center mt-3" />
        </motion.div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-4xl">

        {/* Water park */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="rounded-2xl overflow-hidden group cursor-pointer"
            style={neonBorder}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, neonBorderHover);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, neonBorder);
            }}
          >
            <div className="relative w-full aspect-video overflow-hidden">
              <Image src="/images/water_park_limasol.jpg" alt="פארק המים פאסורי" fill
                className="object-cover group-hover:scale-105 transition-transform duration-600" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent 50%)" }} />
              {/* "כלול במחיר" badge */}
              <div className="absolute top-3 left-3">
                <span
                  className="text-xs font-bold text-white px-2.5 py-1 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #e63946, #c1303b)",
                    boxShadow: "0 2px 10px rgba(230,57,70,0.5)",
                  }}
                >
                  כלול במחיר
                </span>
              </div>
              <div className="absolute bottom-0 p-4 md:p-5">
                <h3 className="text-lg md:text-xl font-black text-white">
                  פארק המים פאסורי (<bdi>Fasouri</bdi>)
                </h3>
              </div>
            </div>
            <div className="p-5" style={{ background: "rgba(255,255,255,0.025)", backdropFilter: "blur(12px)" }}>
              <p className="text-xs md:text-sm leading-relaxed" style={{ color: "#b0b0b0", lineHeight: 1.65 }}>
                חצי יום של שבירת שגרה ואדרנלין בפארק המים הגדול בלימסול. כלול במחיר ההשתתפות.
              </p>
            </div>
          </motion.div>
        )}

        {/* Mall */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
            className="rounded-2xl overflow-hidden group cursor-pointer"
            style={neonBorder}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, neonBorderHover);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, neonBorder);
            }}
          >
            {/* Shopping image – same pattern as water park card */}
            <div className="relative w-full aspect-video overflow-hidden">
              <Image src="/images/shopping.jpeg" alt="זמן חופשי ומסחר" fill
                className="object-cover group-hover:scale-105 transition-transform duration-600" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent 50%)" }} />
              <div className="absolute bottom-0 p-4 md:p-5">
                <h3 className="text-lg md:text-xl font-black text-white">זמן חופשי ומסחר</h3>
              </div>
            </div>
            <div className="p-5" style={{ background: "rgba(255,255,255,0.025)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <p className="text-xs md:text-sm leading-relaxed" style={{ color: "#b0b0b0", lineHeight: 1.65 }}>
                ביקור מתוכנן בקניון המקומי לקניות, התאווררות וגיבוש חברתי. מומלץ להביא דמי כיס.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Summary */}
      {isActive && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-base md:text-lg font-bold text-center"
          style={{
            color: "#e63946",
            textShadow: "0 0 12px rgba(230,57,70,0.5), 0 0 30px rgba(230,57,70,0.25)",
          }}
        >
          האיזון המושלם בין עבודה קשה על המגרש לחוויית קיץ בלתי נשכחת.
        </motion.p>
      )}
    </div>
  );
}
