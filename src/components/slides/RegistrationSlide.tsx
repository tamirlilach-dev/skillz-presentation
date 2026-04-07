"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/AnimatedCounter";
import { REGISTRATION_URL, PAYMENT_STEPS } from "@/lib/constants";

interface RegistrationSlideProps {
  isActive: boolean;
}

export default function RegistrationSlide({ isActive }: RegistrationSlideProps) {
  return (
    <div
      dir="rtl"
      className="slide-rtl w-full h-screen flex flex-col items-center justify-center px-4 md:px-10 gap-4 md:gap-5 relative overflow-hidden overflow-y-auto slide-grain bg-pattern-burst"
    >
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
            style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            עלויות, תשלומים והרשמה
          </h2>
          <div className="accent-line-center mt-3" />
        </motion.div>
      )}

      {/* Price */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
          className="text-center"
        >
          <div
            className="font-black"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              background: "linear-gradient(135deg, #e63946 0%, #ff6b6b 50%, #e63946 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.03em",
              filter: "drop-shadow(0 0 30px rgba(230,57,70,0.4))",
            }}
          >
            <AnimatedCounter target={8400} suffix=" ₪" isActive={isActive} />
          </div>
          <p className="text-xs md:text-sm mt-1 max-w-md" style={{ color: "#b0b0b0" }}>
            כולל: טיסות, אירוח מלא (3 ארוחות), מתקנים, אטרקציות וביגוד (3 חולצות).
          </p>
          <p className="text-xs md:text-sm font-bold mt-1" style={{ color: "#e63946" }}>
            הנחה מיוחדת למשתתפים חוזרים!
          </p>
        </motion.div>
      )}

      {/* Payment timeline */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-full max-w-2xl"
        >
          {/* Desktop: horizontal timeline */}
          <div className="hidden lg:flex flex-row items-center gap-0 relative">
            <div className="absolute top-5 right-10 left-10 h-px" style={{ background: "rgba(220,38,38,0.3)" }} />
            <div className="absolute top-5 right-10 h-px transition-all duration-1000"
              style={{ width: "calc(100% - 80px)", background: "linear-gradient(90deg, #dc2626, #f87171, #dc2626)", boxShadow: "0 0 12px rgba(220,38,38,0.5)" }} />
            {PAYMENT_STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                className="flex-1 flex flex-col items-center text-center gap-1 relative z-10 px-1"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white"
                  style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)", boxShadow: "0 0 20px rgba(220,38,38,0.55)" }}>
                  {i + 1}
                </div>
                <p className="text-xs" style={{ color: "#555" }}>{step.date}</p>
                <p className="text-sm font-bold text-white leading-tight">{step.title}</p>
                <p className="text-sm font-bold" style={{ color: "#dc2626" }}>{step.amount}</p>
              </motion.div>
            ))}
          </div>
          {/* Mobile: vertical timeline */}
          <div className="flex flex-col gap-3 lg:hidden relative">
            <div className="absolute top-5 bottom-5 right-5 w-px" style={{ background: "linear-gradient(to bottom, #dc2626, #f87171, #dc2626)", boxShadow: "0 0 8px rgba(220,38,38,0.4)" }} />
            {PAYMENT_STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
                className="flex items-center gap-3 relative z-10 pr-10"
              >
                <div className="absolute right-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)", boxShadow: "0 0 16px rgba(220,38,38,0.55)" }}>
                  {i + 1}
                </div>
                <div>
                  <p className="text-xs" style={{ color: "#555" }}>{step.date}</p>
                  <p className="text-sm font-bold text-white leading-tight">{step.title}</p>
                  <p className="text-sm font-bold" style={{ color: "#dc2626" }}>{step.amount}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Bank transfer */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="text-center text-xs md:text-sm max-w-md w-full rounded-2xl p-3 md:p-4 slide-grain"
          style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(16px)", color: "#b0b0b0" }}
        >
          <p className="font-bold text-white mb-1">העברה בנקאית:</p>
          <p>שם מוטב: אופיר פרחי</p>
          <p>בנק: 14 – אוצר החייל | סניף: 392 | חשבון: 061376</p>
          <p className="text-xs mt-1.5" style={{ color: "#555" }}>
            יש להעביר צילום של ההעברה לדינה 054-831-5274 או לורד 052-524-2228
          </p>
        </motion.div>
      )}

      {/* CTA */}
      {isActive && (
        <motion.a
          href={REGISTRATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
          className="cta-button animate-pulse-red w-full md:w-auto text-center px-8 md:px-12 py-3 md:py-4 text-white text-lg md:text-xl font-black"
        >
          להרשמה עכשיו
        </motion.a>
      )}

      {/* Contacts */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="text-center text-xs space-y-0.5"
          style={{ color: "#444" }}
        >
          <p style={{ color: "#777" }}>לפרטים נוספים:</p>
          <p>שי בלסקי 054-831-5977 | עידו קוזיקרו 054-222-3777</p>
          <p>אבישי גורדון 054-666-4945 | אופיר פרחי 052-888-5647</p>
        </motion.div>
      )}
    </div>
  );
}
