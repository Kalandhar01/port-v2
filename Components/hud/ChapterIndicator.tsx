"use client";

import { useEffect, useState } from "react";
import { useSite } from "../SoundProvider";

const CHAPTERS = [
  { id: "#top", label: "Launch" },
  { id: "#about", label: "About" },
  { id: "#services", label: "Services" },
  { id: "#work", label: "Work" },
  { id: "#voices", label: "Voices" },
  { id: "#journey", label: "Journey" },
  { id: "#contact", label: "Contact" },
];

export default function ChapterIndicator() {
  const { entered } = useSite();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!entered) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = CHAPTERS.findIndex(
              (c) => c.id === `#${entry.target.id}`
            );
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    CHAPTERS.forEach((c) => {
      const el = document.querySelector(c.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [entered]);

  if (!entered) return null;

  return (
    <nav
      aria-label="Chapters"
      className="fixed right-5 sm:right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3 pointer-events-auto"
    >
      {CHAPTERS.map((chapter, i) => (
        <a
          key={chapter.id}
          href={chapter.id}
          className="group flex items-center justify-end gap-3 font-mono text-[10px] uppercase tracking-[0.2em]"
        >
          <span
            className={
              i === active
                ? "text-ice"
                : "text-mist/50 group-hover:text-mist transition-colors"
            }
          >
            {chapter.label}
          </span>
          <span
            className={
              i === active
                ? "w-6 h-px bg-accent"
                : "w-3 h-px bg-mist/40 group-hover:w-5 group-hover:bg-mist transition-all"
            }
          />
        </a>
      ))}
    </nav>
  );
}
