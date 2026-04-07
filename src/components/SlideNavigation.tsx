"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import type { SwiperClass } from "swiper/react";

interface SlideNavigationProps {
  swiper: SwiperClass | null;
  currentSlide: number;
  totalSlides: number;
}

export default function SlideNavigation({ swiper, currentSlide, totalSlides }: SlideNavigationProps) {
  const goNext = () => swiper?.slideNext();
  const goPrev = () => swiper?.slidePrev();

  const arrowStyle = {
    width: 48,
    height: 48,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(12px)",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  return (
    <>
      {/* Right arrow – hidden on mobile */}
      {currentSlide > 0 && (
        <button
          onClick={goPrev}
          className="nav-arrow fixed top-1/2 -translate-y-1/2 z-50 group hidden md:flex"
          style={{ ...arrowStyle, right: 80 }}
          aria-label="הסלייד הקודם"
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, {
              background: "rgba(230,57,70,0.15)",
              borderColor: "rgba(230,57,70,0.4)",
              boxShadow: "0 0 20px rgba(230,57,70,0.2)",
              transform: "translateY(-50%) scale(1.1)",
            });
          }}
          onMouseLeave={(e) => {
            Object.assign(e.currentTarget.style, {
              background: "rgba(255,255,255,0.06)",
              borderColor: "rgba(255,255,255,0.12)",
              boxShadow: "",
              transform: "translateY(-50%) scale(1)",
            });
          }}
        >
          <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
        </button>
      )}

      {/* Left arrow – hidden on mobile */}
      {currentSlide < totalSlides - 1 && (
        <button
          onClick={goNext}
          className="nav-arrow fixed top-1/2 -translate-y-1/2 z-50 group hidden md:flex"
          style={{ ...arrowStyle, left: 80 }}
          aria-label="הסלייד הבא"
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, {
              background: "rgba(230,57,70,0.15)",
              borderColor: "rgba(230,57,70,0.4)",
              boxShadow: "0 0 20px rgba(230,57,70,0.2)",
              transform: "translateY(-50%) scale(1.1)",
            });
          }}
          onMouseLeave={(e) => {
            Object.assign(e.currentTarget.style, {
              background: "rgba(255,255,255,0.06)",
              borderColor: "rgba(255,255,255,0.12)",
              boxShadow: "",
              transform: "translateY(-50%) scale(1)",
            });
          }}
        >
          <ChevronLeft className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
        </button>
      )}

      {/* Glowing dots */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2.5 items-center">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => swiper?.slideTo(i)}
            aria-label={`עבור לסלייד ${i + 1}`}
            className="rounded-full transition-all duration-350"
            style={{
              width: i === currentSlide ? 26 : 8,
              height: i === currentSlide ? 8 : 8,
              background: i === currentSlide ? "#e63946" : "rgba(255,255,255,0.3)",
              boxShadow: i === currentSlide ? "0 0 16px rgba(230,57,70,0.65)" : "",
              transform: i === currentSlide ? "scale(1.15)" : "scale(1)",
              transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        ))}
      </div>
    </>
  );
}
