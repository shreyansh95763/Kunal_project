"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HERO_SLIDES } from "@/lib/site";

const INTERVAL_MS = 4500;
const SWIPE_THRESHOLD_PX = 40;

/**
 * Cross-fading background carousel for the hero. Autoplays, pauses on hover,
 * and supports horizontal swipes on touch devices.
 */
export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % HERO_SLIDES.length),
    []
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <div
      className="absolute inset-0 h-full w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        setPaused(true);
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const startX = touchStartX.current;
        touchStartX.current = null;
        setPaused(false);
        if (startX === null) return;

        const moved = e.changedTouches[0].clientX - startX;
        if (moved < -SWIPE_THRESHOLD_PX) next();
        else if (moved > SWIPE_THRESHOLD_PX) prev();
      }}
    >
      <div className="relative h-full w-full overflow-hidden">
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            aria-hidden={i !== index}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === index ? 1 : 0, zIndex: i === index ? 2 : 1 }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
            {/* Whiten the photo so the dark headline and search bar stay legible */}
            <div className="absolute inset-0 bg-white/[0.78]" />
          </div>
        ))}
      </div>
    </div>
  );
}
