"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "@/lib/site";

const INTERVAL_MS = 5000;
const SWIPE_THRESHOLD_PX = 40;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % TESTIMONIALS.length),
    []
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section className="testimonials">
      <div className="wrap">
        <h2>Testimonials</h2>

        <div
          className="testimonial-slider"
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
          <div className="testimonial-slides">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.author}
                className={`testimonial-slide ${i === index ? "active" : ""}`}
                aria-hidden={i !== index}
              >
                <div className="testimonial-quote">&ldquo;{t.quote}&rdquo;</div>
                <div className="testimonial-author">{t.author}</div>
                <div className="testimonial-role">{t.role}</div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="testimonial-arrow left"
            aria-label="Previous testimonial"
            onClick={prev}
          >
            ‹
          </button>
          <button
            type="button"
            className="testimonial-arrow right"
            aria-label="Next testimonial"
            onClick={next}
          >
            ›
          </button>

          <div className="testimonial-dots">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.author}
                type="button"
                className={`testimonial-dot ${i === index ? "active" : ""}`}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
