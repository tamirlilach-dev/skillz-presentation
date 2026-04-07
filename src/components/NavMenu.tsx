"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Dna, Users, Building, Calendar,
  Infinity as InfinityIcon, Hotel, Palmtree,
  Shield, Quote, CreditCard, Menu, X,
} from "lucide-react";
import type { SwiperClass } from "swiper/react";

const NAV_ITEMS = [
  { Icon: Home,         label: "פתיחה" },
  { Icon: Dna,          label: "DNA סקילז" },
  { Icon: Users,        label: "הצוות" },
  { Icon: Building,     label: "הארנה" },
  { Icon: Calendar,     label: 'לו"ז המחנה' },
  { Icon: InfinityIcon, label: "סדר יום" },
  { Icon: Hotel,        label: "מלון פפקוס" },
  { Icon: Palmtree,     label: "אטרקציות" },
  { Icon: Shield,       label: "ביטחון" },
  { Icon: Quote,        label: "הורים מספרים" },
  { Icon: CreditCard,   label: "הרשמה" },
];

interface NavMenuProps {
  swiper: SwiperClass | null;
  currentSlide: number;
}

export default function NavMenu({ swiper, currentSlide }: NavMenuProps) {
  const [open, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const goTo = (index: number) => {
    swiper?.slideTo(index);
    setOpen(false);
  };

  return (
    <motion.div
      dir="ltr"
      animate={{ width: open ? 250 : 60 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 right-0 h-full flex-col items-stretch hidden md:flex"
      style={{
        zIndex: 50,
        background: "rgba(10,10,10,0.7)",
        backdropFilter: "blur(15px)",
        borderLeft: "1px solid rgba(230,57,70,0.2)",
        overflow: "hidden",
      }}
    >
      {/* ── Hamburger button ────────────────────────────────── */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: 60,
          height: 60,
          color: "rgba(255,255,255,0.6)",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#e63946"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "x" : "menu"}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </motion.span>
        </AnimatePresence>
      </button>

      {/* ── Divider ─────────────────────────────────────────── */}
      <div style={{ height: 1, background: "rgba(230,57,70,0.15)", flexShrink: 0 }} />

      {/* ── Nav items ───────────────────────────────────────── */}
      <div className="flex flex-col overflow-y-auto flex-1" style={{ scrollbarWidth: "none" }}>
        {NAV_ITEMS.map(({ Icon, label }, index) => {
          const active = currentSlide === index;
          const hovered = hoveredIndex === index;

          return (
            <div key={index} className="relative">
              <button
                onClick={() => goTo(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex items-center gap-3 w-full text-right"
                style={{
                  height: 52,
                  paddingRight: 0,
                  paddingLeft: 0,
                  background: active && open
                    ? "rgba(230,57,70,0.12)"
                    : hovered ? "rgba(255,255,255,0.04)" : "transparent",
                  borderRight: active ? "3px solid #e63946" : "3px solid transparent",
                  transition: "background 0.2s, border-color 0.2s",
                  flexShrink: 0,
                  minWidth: 0,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {/* Icon column — fixed 60px */}
                <span
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 60,
                    color: active ? "#e63946" : "rgba(255,255,255,0.5)",
                    filter: active
                      ? "drop-shadow(0 0 6px rgba(230,57,70,0.6))"
                      : hovered ? "drop-shadow(0 0 4px rgba(255,255,255,0.2))" : "none",
                    transition: "color 0.2s, filter 0.2s",
                  }}
                >
                  <Icon size={18} />
                </span>

                {/* Label — visible only when open */}
                <AnimatePresence>
                  {open && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="text-sm font-bold"
                      style={{
                        color: active ? "#e63946" : "rgba(255,255,255,0.7)",
                        direction: "rtl",
                      }}
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Tooltip (collapsed state only) */}
              {!open && hovered && (
                <div
                  className="absolute pointer-events-none"
                  style={{
                    right: 64,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(10,10,10,0.9)",
                    border: "1px solid rgba(230,57,70,0.3)",
                    borderRadius: 8,
                    padding: "6px 12px",
                    whiteSpace: "nowrap",
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 600,
                    zIndex: 60,
                    direction: "rtl",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                  }}
                >
                  {label}
                  {/* Arrow */}
                  <span
                    style={{
                      position: "absolute",
                      right: -6,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 0,
                      height: 0,
                      borderTop: "5px solid transparent",
                      borderBottom: "5px solid transparent",
                      borderLeft: "6px solid rgba(10,10,10,0.9)",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
