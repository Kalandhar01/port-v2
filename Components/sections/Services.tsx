"use client";

import { services } from "@/data";
import { ChapterLabel, useScrollReveal } from "./reveal";

export default function Services() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative z-10 px-5 sm:px-10 py-28 sm:py-40"
    >
      <div className="max-w-7xl mx-auto">
        <ChapterLabel num="03" name="Services" />

        <h2
          data-reveal
          className="text-4xl sm:text-6xl font-semibold tracking-tight mb-16 sm:mb-20 max-w-2xl"
        >
          What I can <span className="text-gradient-accent">do for you</span>
        </h2>

        <div className="border-t border-white/10">
          {services.map((service) => (
            <div
              key={service.id}
              data-reveal
              className="group border-b border-white/10 transition-colors duration-300 hover:bg-white/[0.03]"
            >
              <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[5rem_1fr_1.2fr] gap-x-6 gap-y-2 items-baseline px-2 sm:px-4 py-8 sm:py-10 cursor-default">
                <span className="font-mono text-xs text-accent tracking-widest">
                  {service.id}
                </span>
                <h3 className="text-2xl sm:text-3xl font-medium text-ice transition-transform duration-300 group-hover:translate-x-2">
                  {service.title}
                </h3>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-mist text-sm sm:text-base leading-relaxed mb-3">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] uppercase tracking-[0.15em] text-ice/70 border border-white/10 rounded-full px-3 py-1 transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
