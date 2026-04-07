"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { COACHES } from "@/lib/constants";
import AnimatedCounter from "@/components/AnimatedCounter";

interface CoachesSlideProps {
  isActive: boolean;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.35 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export default function CoachesSlide({ isActive }: CoachesSlideProps) {
  return (
    <div
      dir="rtl"
      className="slide-rtl w-full h-screen flex flex-col items-center justify-center px-4 md:px-12 gap-6 md:gap-8 relative overflow-hidden slide-grain bg-pattern-parquet"
    >
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
            הצוות המקצועי
          </h2>
          <p className="text-lg font-bold mt-2" style={{ color: "#e63946" }}>
            מעל{" "}
            <AnimatedCounter target={100} suffix="+" isActive={isActive} />{" "}
            שנות ניסיון על הפרקט
          </p>
          <div className="accent-line-center mt-3" />
        </motion.div>
      )}

      {/* Coaches – 1 col mobile, 3 desktop */}
      {isActive && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-5xl"
        >
          {COACHES.map((coach) => (
            <motion.div
              key={coach.name}
              variants={cardVariant}
              className="group flex flex-col items-center gap-4 rounded-2xl relative overflow-hidden slide-grain"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid #e63946",
                backdropFilter: "blur(20px)",
                padding: "2rem 1.5rem 1.5rem",
                boxShadow: "0 0 8px rgba(230,57,70,0.4), 0 0 20px rgba(230,57,70,0.15), inset 0 0 8px rgba(230,57,70,0.05)",
                transition: "box-shadow 0.3s ease, transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = "0 0 12px rgba(230,57,70,0.6), 0 0 35px rgba(230,57,70,0.25), inset 0 0 12px rgba(230,57,70,0.1)";
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = "0 0 8px rgba(230,57,70,0.4), 0 0 20px rgba(230,57,70,0.15), inset 0 0 8px rgba(230,57,70,0.05)";
                el.style.transform = "";
              }}
            >
              <div
                className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0"
                style={{ boxShadow: "0 0 0 3px #e63946, 0 0 30px rgba(230,57,70,0.3)" }}
              >
                <Image
                  src={coach.image}
                  alt={coach.name}
                  fill
                  className="object-cover transition-all duration-500"
                  style={{ filter: "grayscale(30%)" }}
                  onMouseEnter={(e) => { (e.target as HTMLImageElement).style.filter = "grayscale(0%)"; }}
                  onMouseLeave={(e) => { (e.target as HTMLImageElement).style.filter = "grayscale(30%)"; }}
                />
              </div>

              {/* Name + accent line */}
              <div className="text-center">
                <h3 className="text-lg md:text-xl font-black text-white">{coach.name}</h3>
                <div
                  className="h-0.5 mt-2 mx-auto rounded-full transition-all duration-300 group-hover:w-20"
                  style={{ width: 40, background: "linear-gradient(90deg, #e63946, #ff6b6b)" }}
                />
              </div>

              {/* Details – visible on mobile, hover on desktop */}
              <ul className="flex flex-col gap-1 w-full text-center">
                {coach.details.map((d) => (
                  <li key={d} className="text-xs md:text-sm" style={{ color: "#b0b0b0" }}>
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Bottom note */}
      {isActive && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-xs md:text-sm text-center max-w-xl px-4"
          style={{ color: "#555" }}
        >
          ניהול מקצועי נוסף: שי בלסקי. יחס אישי מובטח, חלוקה לקבוצות לפי גיל ורמה.
        </motion.p>
      )}
    </div>
  );
}
