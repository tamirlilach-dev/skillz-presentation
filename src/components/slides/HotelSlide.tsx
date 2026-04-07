"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight, ChevronLeft, Bed, Utensils, Waves } from "lucide-react";

interface HotelSlideProps {
  isActive: boolean;
}

const HOTEL_IMAGES = [
  { src: "/images/hotel1.jpg", alt: "מלון פפקוס - חיצוני" },
  { src: "/images/hotel2.jpg", alt: "מלון פפקוס - בריכה" },
  { src: "/images/hotel_room.jpg", alt: "חדר במלון" },
  { src: "/images/kids_in_hotel_pool.jpg", alt: "ילדים בבריכת המלון" },
];

const FEATURES = [
  { Icon: Bed, title: "לינה ברמה גבוהה", text: "חדרים מרווחים, מודרניים וממוזגים המותאמים לספורטאים. לינה קבוצתית בנפרד מההורים." },
  { Icon: Utensils, title: "פנסיון מלא", text: "3 ארוחות עשירות ביום (בוקר, צהריים וערב) לאורך כל ימי המחנה." },
  { Icon: Waves, title: "התאוששות", text: "גישה חופשית לבריכת המלון למנוחה וגיבוש בין האימונים." },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.3 } },
};

const itemVariant = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export default function HotelSlide({ isActive }: HotelSlideProps) {
  const [imgIndex, setImgIndex] = useState(0);

  const prev = () => setImgIndex((i) => (i - 1 + HOTEL_IMAGES.length) % HOTEL_IMAGES.length);
  const next = () => setImgIndex((i) => (i + 1) % HOTEL_IMAGES.length);

  return (
    <div
      dir="rtl"
      className="slide-rtl w-full h-screen flex flex-col items-center justify-center px-4 md:px-12 gap-5 relative overflow-hidden slide-grain bg-pattern-waves"
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
            style={{ fontSize: "clamp(1.2rem, 3.2vw, 2.6rem)", letterSpacing: "-0.02em" }}
          >
            הכפר האולימפי שלנו: מלון פפקוס (<bdi>Pefkos</bdi>)
          </h2>
          <div className="accent-line-center mt-3" />
        </motion.div>
      )}

      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-4 md:gap-5 items-start">
        {/* Carousel */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            className="relative w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden flex-shrink-0"
            style={{ boxShadow: "0 0 60px rgba(0,0,0,0.6)" }}
          >
            <Image src={HOTEL_IMAGES[imgIndex].src} alt={HOTEL_IMAGES[imgIndex].alt} fill className="object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent 50%)" }} />
            <button onClick={prev} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
            <button onClick={next} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {HOTEL_IMAGES.map((_, i) => (
                <button key={i} onClick={() => setImgIndex(i)} className="rounded-full transition-all duration-300"
                  style={{ width: i === imgIndex ? 20 : 7, height: 7,
                    background: i === imgIndex ? "#e63946" : "rgba(255,255,255,0.4)",
                    boxShadow: i === imgIndex ? "0 0 10px rgba(230,57,70,0.6)" : "" }} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Features */}
        {isActive && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-3 w-full"
          >
            {FEATURES.map(({ Icon, title, text }) => (
              <motion.div
                key={title}
                variants={itemVariant}
                className="flex items-start gap-3 rounded-2xl p-3 md:p-4 slide-grain"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(20px)",
                  transition: "all 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(230,57,70,0.3)";
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(230,57,70,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                     style={{ background: "rgba(230,57,70,0.12)", boxShadow: "inset 0 1px 0 rgba(230,57,70,0.2)" }}>
                  <Icon className="w-5 h-5" style={{ color: "#e63946" }} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-0.5">{title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#b0b0b0", lineHeight: 1.65 }}>{text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
