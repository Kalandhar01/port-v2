"use client";

import { testimonials } from "@/data";
import { ChapterLabel, useScrollReveal } from "./reveal";

export default function Voices() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      id="voices"
      ref={sectionRef}
      className="relative z-10 px-5 sm:px-10 py-28 sm:py-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <ChapterLabel num="05" name="Voices" />
        <h2
          data-reveal
          className="text-4xl sm:text-6xl font-semibold tracking-tight mb-16 sm:mb-20 max-w-2xl"
        >
          Words from{" "}
          <span className="text-gradient-accent">my people</span>
        </h2>
      </div>

      <div className="relative w-full">
        <div
          className="flex w-max px-4 animate-marquee-fast hover:[animation-play-state:paused]"
          data-reveal
        >
          {[0, 1].map((half) => (
            <div key={half} className="flex gap-6 pr-6" aria-hidden={half === 1}>
              {testimonials.map((t, i) => (
                <figure
                  key={i}
                  className="w-[19rem] sm:w-[24rem] shrink-0 rounded-2xl border border-white/10 bg-space-800/60 backdrop-blur p-6 sm:p-8 flex flex-col justify-between gap-6"
                >
                  <blockquote className="text-ice/90 text-sm sm:text-base leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-4">
                    <img
                      src={t.img}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/10"
                      loading="lazy"
                    />
                    <div>
                      <div className="text-ice text-sm font-medium">
                        {t.name}
                      </div>
                      <div className="hud-label mt-0.5">{t.title}</div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-space-900 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-space-900 to-transparent" />
      </div>
    </section>
  );
}
