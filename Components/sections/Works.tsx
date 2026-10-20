"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { projects } from "@/data";
import { ChapterLabel, useScrollReveal } from "./reveal";

function isRealLink(link: string) {
  return link.startsWith("http");
}

export default function Works() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(preview, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.5, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX + 24);
      yTo(e.clientY - 150);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    gsap.to(preview, {
      autoAlpha: activeIndex === null ? 0 : 1,
      scale: activeIndex === null ? 0.9 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [activeIndex]);

  const current = activeIndex !== null ? projects[activeIndex] : null;

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative z-10 px-5 sm:px-10 py-28 sm:py-40"
    >
      <div className="max-w-7xl mx-auto">
        <ChapterLabel num="04" name="Work" />

        <div className="flex items-baseline justify-between mb-12 sm:mb-16" data-reveal>
          <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight">
            Selected <span className="text-gradient-accent">missions</span>
          </h2>
          <span className="font-mono text-xs text-mist tabular-nums">
            {String((activeIndex ?? 0) + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <div className="border-t border-white/10" data-reveal>
          {projects.map((project, i) => {
            const Wrapper = isRealLink(project.link)
              ? "a"
              : "div";
            const props: Record<string, unknown> = {};
            if (isRealLink(project.link)) {
              props.href = project.link;
              props.target = "_blank";
              props.rel = "noreferrer";
            }
            return (
              <Wrapper
                key={project.id}
                {...props}
                className="group block border-b border-white/10 relative"
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="grid grid-cols-1 sm:grid-cols-[3rem_1fr_auto] gap-x-8 gap-y-4 items-center px-2 sm:px-6 py-10 sm:py-14 transition-colors duration-300 group-hover:bg-white/[0.03]">
                  <span className="font-mono text-xs text-mist tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-3xl sm:text-5xl font-medium tracking-tight text-ice transition-all duration-300 group-hover:translate-x-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-ice group-hover:to-accent">
                      {project.title}
                    </h3>
                    <p className="text-mist text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
                      {project.des}
                    </p>
                    <div className="flex gap-2 mt-5">
                      {project.iconLists.map((icon) => (
                        <img
                          key={icon}
                          src={icon}
                          alt=""
                          className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
                    {isRealLink(project.link) ? (
                      <span className="text-accent group-hover:translate-x-1 transition-transform inline-block">
                        Visit ↗
                      </span>
                    ) : (
                      <span className="text-mist/50">In orbit</span>
                    )}
                  </div>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>

      {/* Cursor-following image preview */}
      <div
        ref={previewRef}
        className="fixed top-0 left-0 z-40 pointer-events-none hidden lg:block w-[26rem] h-[18rem] rounded-xl overflow-hidden border border-white/10 opacity-0 invisible"
        aria-hidden
      >
        {current && (
          <img
            src={current.img}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-space-950/20" />
        {current && (
          <div className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ice bg-space-950/70 backdrop-blur px-3 py-1.5 rounded-full">
            {current.title}
          </div>
        )}
      </div>
    </section>
  );
}
