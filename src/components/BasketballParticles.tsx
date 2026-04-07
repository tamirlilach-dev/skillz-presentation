"use client";

import { useEffect, useState } from "react";

const PARTICLE_COUNT = 15;

type Particle = {
  id: number;
  left: string;
  duration: number;
  delay: number;
  width: number;
  height: number;
  borderRadius: number | string;
  backgroundColor: string;
  border: string;
  rotate: string;
};

export default function BasketballParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate only on the client to avoid hydration mismatch
  useEffect(() => {
    setParticles(
      Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
        const type = i % 3;
        const size = Math.random() * 12 + 5;
        return {
          id: i,
          left: `${5 + Math.random() * 90}%`,
          duration: Math.random() * 14 + 12,
          delay: Math.random() * 10,
          width: type === 2 ? 2 : size,
          height: type === 2 ? size * 3 : size,
          borderRadius: type === 2 ? 1 : "50%",
          backgroundColor:
            type === 0
              ? "rgba(230,57,70,0.18)"
              : type === 1
              ? "transparent"
              : "rgba(230,57,70,0.12)",
          border: type === 1 ? "1px solid rgba(230,57,70,0.25)" : "none",
          rotate: type === 2 ? "rotate(-20deg)" : "none",
        };
      })
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 hidden lg:block overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle absolute bottom-0"
          style={{
            left: p.left,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            width: p.width,
            height: p.height,
            borderRadius: p.borderRadius,
            backgroundColor: p.backgroundColor,
            border: p.border,
            transform: p.rotate !== "none" ? p.rotate : undefined,
            opacity: 0.15,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
