"use client";

import { useEffect, useRef, useState } from "react";
import { useSite } from "./SoundProvider";

const PRELOAD_IMAGES = [
  "/profile1.jpg",
  "/main1.jpg",
  "/anime.jpg",
  "/ura1.jpg",
];

export default function Loader() {
  const { enter, audioAvailable } = useSite();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "gate" | "exiting">(
    "loading"
  );
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const startTime = performance.now();
    const MIN_DURATION = 2000;
    let loaded = 0;
    let target = 0;
    let current = 0;
    let rafId = 0;

    const bump = () => {
      loaded += 1;
      target = Math.min(92, (loaded / PRELOAD_IMAGES.length) * 92);
    };

    PRELOAD_IMAGES.forEach((src) => {
      const img = new Image();
      img.onload = bump;
      img.onerror = bump;
      img.src = src;
    });

    const tick = () => {
      const elapsed = performance.now() - startTime;
      if (elapsed > MIN_DURATION && loaded >= PRELOAD_IMAGES.length) {
        target = 100;
      } else if (elapsed > MIN_DURATION + 1500) {
        target = 100;
      }
      current += (target - current) * 0.08;
      if (target === 100 && current > 99.4) {
        setProgress(100);
        window.setTimeout(() => setPhase("gate"), 350);
        return;
      }
      setProgress(Math.floor(current));
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleEnter = (withSound: boolean) => {
    setPhase("exiting");
    window.setTimeout(() => {
      window.__lenis?.start();
      enter(withSound);
    }, 700);
  };

  if (phase === "exiting") {
    return (
      <div className="fixed inset-0 z-[100] bg-space-950 animate-loader-out pointer-events-none" />
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-space-950 flex flex-col items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-dot-white/[0.04]" />

      {phase === "loading" ? (
        <div className="relative flex flex-col items-center gap-10 px-6">
          <div className="hud-label absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap hidden sm:block">
            Kalandhar // Deep Space Portfolio
          </div>

          <div
            className="font-mono text-[18vw] sm:text-[12vw] leading-none font-light text-ice tabular-nums"
            aria-live="polite"
          >
            {progress}
            <span className="text-accent text-[8vw] sm:text-[5vw] align-super ml-1">
              %
            </span>
          </div>

          <div className="w-[70vw] sm:w-[420px] h-px bg-space-600 relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex gap-8 sm:gap-14 font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
            <span>
              Particles <span className="text-ice tabular-nums">{(progress * 32).toLocaleString()}</span>
            </span>
            <span>
              Orbit <span className="text-ice tabular-nums">{Math.round(progress * 4.08)} km</span>
            </span>
            <span className="hidden sm:inline">
              Systems{" "}
              <span className="text-accent">
                {progress < 100 ? "charging" : "online"}
              </span>
            </span>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col items-center gap-8 px-6 text-center animate-in fade-in duration-700">
          <p className="hud-label">Orbit achieved — 408 km</p>
          <h2 className="font-mono text-4xl sm:text-6xl font-light text-ice tracking-tight">
            Ready for <span className="text-accent">launch</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={() => handleEnter(true)}
              disabled={!audioAvailable}
              className="group relative px-8 py-4 font-mono text-xs uppercase tracking-[0.25em] text-space-950 bg-accent rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(125,249,255,0.4)] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Enter with sound
            </button>
            <button
              onClick={() => handleEnter(false)}
              className="px-8 py-4 font-mono text-xs uppercase tracking-[0.25em] text-ice border border-white/15 rounded-full transition-all duration-300 hover:border-accent/60 hover:text-accent"
            >
              Enter without sound
            </button>
          </div>
          {!audioAvailable && (
            <p className="hud-label text-mist/60">
              ambient.mp3 not found — add public/audio/ambient.mp3
            </p>
          )}
        </div>
      )}
    </div>
  );
}
