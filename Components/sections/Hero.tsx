"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useSite } from "../SoundProvider";

const NAME = "KALANDHAR";

export default function Hero() {
  const { entered } = useSite();
  const rootRef = useRef<HTMLElement>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    if (!entered || playedRef.current || !rootRef.current) return;
    if (document.documentElement.dataset.motion === "off") return;
    playedRef.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        "[data-hero-kicker]",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
        .fromTo(
          "[data-hero-letter]",
          { y: 110, opacity: 0, rotateX: -60 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.05,
          },
          "-=0.4"
        )
        .fromTo(
          "[data-hero-tagline]",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.5"
        )
        .fromTo(
          "[data-hero-cue]",
          { opacity: 0 },
          { opacity: 1, duration: 1.2 },
          "-=0.3"
        );
    }, rootRef);

    return () => ctx.revert();
  }, [entered]);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-5 sm:px-10 pt-24 pb-32 overflow-hidden"
    >
      <div
        className="absolute top-1/4 right-[12%] w-40 h-40 sm:w-64 sm:h-64 rounded-full opacity-70 animate-float pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, rgba(125,249,255,0.45), rgba(139,92,246,0.25) 45%, transparent 70%)",
          filter: "blur(24px)",
        }}
        aria-hidden
      />
      <div
        className="absolute bottom-[18%] left-[8%] w-24 h-24 sm:w-40 sm:h-40 rounded-full opacity-50 animate-drift pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.5), transparent 70%)",
          filter: "blur(20px)",
        }}
        aria-hidden
      />

      <p
        data-hero-kicker
        className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent mb-8 sm:mb-12"
      >
        MERN &amp; Next.js Developer
      </p>

      <h1
        className="relative flex justify-center overflow-hidden mb-8 sm:mb-10"
        aria-label={NAME}
      >
        <span className="sr-only">{NAME}</span>
        <div className="flex" aria-hidden>
          {NAME.split("").map((letter, i) => (
            <span
              key={i}
              data-hero-letter
              className="inline-block text-[16vw] sm:text-[11vw] lg:text-[9.5rem] leading-[0.9] font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-ice via-ice to-mist/40"
              style={{ transformOrigin: "50% 100%" }}
            >
              {letter}
            </span>
          ))}
        </div>
      </h1>

      <p
        data-hero-tagline
        className="max-w-xl text-center text-mist text-base sm:text-lg leading-relaxed"
      >
        I turn ideas into fast, immersive web products — from the database
        all the way to the last pixel.
      </p>

      <div data-hero-cue className="absolute bottom-10 flex flex-col items-center gap-3">
        <span className="hud-label">Scroll to explore</span>
        <div className="w-px h-10 bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
}

