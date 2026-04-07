"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  isActive: boolean;
}

export default function AnimatedCounter({
  target,
  duration = 2000,
  suffix = "",
  prefix = "",
  isActive,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!isActive || animatedRef.current) return;
    animatedRef.current = true;

    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isActive, target, duration]);

  return (
    <span>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}
