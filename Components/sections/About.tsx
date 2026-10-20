"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills, stats } from "@/data";
import { ChapterLabel, useScrollReveal } from "./reveal";

gsap.registerPlugin(ScrollTrigger);

const STATEMENT = [
  "I build for the modern web.",
  "MERN stack by day,",
  "motion & 3D after hours.",
  "Clean code. Bold ideas.",
  "Shipped, not just designed.",
];

export default function About() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = linesRef.current;
    if (!el) return;
    if (document.documentElement.dataset.motion === "off") return;

    const ctx = gsap.context(() => {
      const lines = el.querySelectorAll<HTMLElement>("[data-line]");
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { opacity: 0.12 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: line,
              start: "top 75%",
              end: "top 40%",
              scrub: true,
            },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 px-5 sm:px-10 py-28 sm:py-40"
    >
      <div className="max-w-7xl mx-auto">
        <ChapterLabel num="02" name="About" />

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-16 lg:gap-24 items-start">
          <div>
            <div ref={linesRef} className="mb-14">
              {STATEMENT.map((line, i) => (
                <p
                  key={i}
                  data-line
                  className="text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[1.15] tracking-tight text-ice"
                >
                  {line}
                </p>
              ))}
            </div>

            <p data-reveal className="text-mist leading-relaxed max-w-xl mb-10">
              Hi — I&apos;m Kalandhar, a developer who lives at the
              intersection of engineering and craft. I&apos;ve built
              e-commerce platforms, anime streaming UIs, social apps and
              portfolios like this one. I care about performance, details
              and shipping things that feel alive.
            </p>

            <div data-reveal className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="border-t border-white/10 pt-4">
                  <div className="text-3xl sm:text-4xl font-semibold text-ice">
                    {stat.value}
                  </div>
                  <div className="hud-label mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/5]">
              <img
                src="/profile1.jpg"
                alt="Kalandhar"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ice/80">
                Kalandhar — MERN &amp; Next.js
              </div>
            </div>
            <div className="absolute -top-3 -right-3 w-16 h-16 border-t border-r border-accent/40 rounded-tr-2xl" />
            <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b border-l border-accent/40 rounded-bl-2xl" />
          </div>
        </div>
      </div>

      <div className="mt-24 sm:mt-32 overflow-hidden border-y border-white/10 py-5">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[0, 1].map((half) => (
            <div key={half} className="flex gap-10 pr-10" aria-hidden={half === 1}>
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="font-mono text-sm uppercase tracking-[0.2em] text-mist whitespace-nowrap flex items-center gap-10"
                >
                  {skill}
                  <span className="w-1 h-1 rounded-full bg-accent/60" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-hidden border-b border-white/10 py-5 -mt-px">
        <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused]">
          {[0, 1].map((half) => (
            <div key={half} className="flex gap-10 pr-10" aria-hidden={half === 1}>
              {skills
                .slice()
                .reverse()
                .map((skill, i) => (
                  <span
                    key={i}
                    className="font-mono text-sm uppercase tracking-[0.2em] text-mist/60 whitespace-nowrap flex items-center gap-10"
                  >
                    {skill}
                    <span className="w-1 h-1 rounded-full bg-nova/60" />
                  </span>
                ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
