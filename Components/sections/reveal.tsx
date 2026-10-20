"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ChapterLabel({ num, name }: { num: string; name: string }) {
  return (
    <div className="flex items-center gap-4 mb-12 sm:mb-16" data-reveal>
      <span className="font-mono text-[10px] tracking-[0.3em] text-accent">
        {num}
      </span>
      <span className="h-px w-10 bg-white/15" />
      <span className="hud-label">{name}</span>
    </div>
  );
}

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.documentElement.dataset.motion === "off") return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll<HTMLElement>("[data-reveal]");
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: (i % 6) * 0.06,
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
