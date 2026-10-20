"use client";

import { workExperience } from "@/data";
import { ChapterLabel, useScrollReveal } from "./reveal";

export default function Trajectory() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative z-10 px-5 sm:px-10 py-28 sm:py-40"
    >
      <div className="max-w-7xl mx-auto">
        <ChapterLabel num="06" name="Journey" />

        <h2
          data-reveal
          className="text-4xl sm:text-6xl font-semibold tracking-tight mb-16 sm:mb-20 max-w-2xl"
        >
          The <span className="text-gradient-accent">trajectory</span> so far
        </h2>

        <div className="relative pl-8 sm:pl-12" data-reveal>
          <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-white/10 to-transparent" />

          {workExperience.map((exp) => (
            <div
              key={exp.id}
              className="relative pb-12 last:pb-0"
            >
              <div className="absolute -left-8 sm:-left-12 top-6">
                <span className="block w-2.5 h-2.5 rounded-full bg-space-900 border border-accent shadow-[0_0_10px_rgba(125,249,255,0.5)]" />
              </div>

              <div className="rounded-2xl border border-white/10 bg-space-800/50 backdrop-blur p-6 sm:p-8 hover:bg-white/[0.04] transition-colors duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={exp.thumbnail}
                    alt=""
                    className="w-10 h-10 rounded-lg border border-white/10 p-1.5 object-contain"
                    loading="lazy"
                  />
                  <h3 className="text-lg sm:text-2xl font-medium text-ice">
                    {exp.title}
                  </h3>
                </div>
                <p className="text-mist text-sm sm:text-base leading-relaxed max-w-2xl">
                  {exp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
