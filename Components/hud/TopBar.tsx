"use client";

import { useSite } from "../SoundProvider";

export default function TopBar() {
  const { entered, soundOn, toggleSound, motionOn, toggleMotion, audioAvailable } =
    useSite();

  if (!entered) return null;

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-5 sm:px-8 py-5 flex items-center justify-between pointer-events-none">
      <a
        href="#top"
        className="pointer-events-auto font-mono text-sm tracking-widest text-ice hover:text-accent transition-colors"
      >
        K<span className="text-accent">.</span>
      </a>

      <div className="pointer-events-auto flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
        <button
          onClick={toggleMotion}
          className="hover:text-ice transition-colors"
          aria-pressed={!motionOn}
        >
          Motion <span className={motionOn ? "text-ice" : "text-accent"}>{motionOn ? "on" : "off"}</span>
        </button>
        <span className="w-px h-3 bg-white/15" aria-hidden />
        <button
          onClick={toggleSound}
          disabled={!audioAvailable}
          className="hover:text-ice transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-pressed={soundOn}
        >
          Sound <span className={soundOn ? "text-accent" : "text-ice"}>{soundOn ? "on" : "off"}</span>
        </button>
      </div>
    </header>
  );
}
