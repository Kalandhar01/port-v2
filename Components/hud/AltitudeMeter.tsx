"use client";

import { useEffect, useState } from "react";
import { useSite } from "../SoundProvider";

export default function AltitudeMeter() {
  const { entered } = useSite();
  const [altitude, setAltitude] = useState(0);

  useEffect(() => {
    if (!entered) return;

    let rafId = 0;
    const update = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      setAltitude(Math.round(Math.min(1, Math.max(0, progress)) * 408));
      rafId = 0;
    };
    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [entered]);

  if (!entered) return null;

  return (
    <div className="fixed left-5 sm:left-8 bottom-8 z-50 flex items-end gap-3 pointer-events-none">
      <div className="relative w-px h-24 bg-white/10">
        <div
          className="absolute bottom-0 left-0 w-px bg-accent transition-all duration-200"
          style={{ height: `${(altitude / 408) * 100}%` }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(125,249,255,0.8)] transition-all duration-200"
          style={{ bottom: `calc(${(altitude / 408) * 100}% - 3px)` }}
        />
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist leading-relaxed">
        <div>
          Alt{" "}
          <span className="text-ice tabular-nums">
            {String(altitude).padStart(3, "0")}
          </span>{" "}
          km
        </div>
        <div className="text-mist/50">
          {altitude >= 400 ? "orbit achieved" : altitude > 0 ? "ascending" : "ground"}
        </div>
      </div>
    </div>
  );
}
