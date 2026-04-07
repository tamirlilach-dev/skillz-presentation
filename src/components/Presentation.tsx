"use client";

import { useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Pagination, A11y } from "swiper/modules";
import type { SwiperClass } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import SlideNavigation from "./SlideNavigation";
import BasketballParticles from "./BasketballParticles";
import NavMenu from "./NavMenu";

import HeroSlide from "./slides/HeroSlide";
import DNASlide from "./slides/DNASlide";
import CoachesSlide from "./slides/CoachesSlide";
import ArenaSlide from "./slides/ArenaSlide";
import ScheduleSlide from "./slides/ScheduleSlide";
import DailyRoutineSlide from "./slides/DailyRoutineSlide";
import HotelSlide from "./slides/HotelSlide";
import AttractionsSlide from "./slides/AttractionsSlide";
import SecuritySlide from "./slides/SecuritySlide";
import TestimonialsSlide from "./slides/TestimonialsSlide";
import RegistrationSlide from "./slides/RegistrationSlide";

const SLIDES = [
  HeroSlide,
  DNASlide,
  CoachesSlide,
  ArenaSlide,
  ScheduleSlide,
  DailyRoutineSlide,
  HotelSlide,
  AttractionsSlide,
  SecuritySlide,
  TestimonialsSlide,
  RegistrationSlide,
];

export default function Presentation() {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = useCallback((s: SwiperClass) => {
    setCurrentSlide(s.activeIndex);
  }, []);

  return (
    <div className="w-full h-screen overflow-y-auto lg:overflow-hidden relative" style={{ background: "#0a0a0a" }}>
      <BasketballParticles />

      <Swiper
        modules={[Keyboard, Mousewheel, Pagination, A11y]}
        direction="horizontal"
        keyboard={{ enabled: true, onlyInViewport: false }}
        mousewheel={{ sensitivity: 1 }}
        touchEventsTarget="container"
        touchRatio={1}
        simulateTouch
        speed={600}
        onSwiper={setSwiper}
        onSlideChange={handleSlideChange}
        autoHeight
        className="w-full h-full"
        style={{ direction: "ltr" }}
        a11y={{ prevSlideMessage: "הסלייד הקודם", nextSlideMessage: "הסלייד הבא" }}
      >
        {SLIDES.map((SlideComponent, index) => (
          <SwiperSlide key={index}>
            <SlideComponent isActive={currentSlide === index} />
          </SwiperSlide>
        ))}
      </Swiper>

      <SlideNavigation
        swiper={swiper}
        currentSlide={currentSlide}
        totalSlides={SLIDES.length}
      />

      <NavMenu swiper={swiper} currentSlide={currentSlide} />
    </div>
  );
}
