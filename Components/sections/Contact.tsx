"use client";

import { useState } from "react";
import { socialMedia } from "@/data";
import { ChapterLabel, useScrollReveal } from "./reveal";

const EMAIL = "kalandars2004@gmail.com";

const SOCIAL_NAMES: Record<string, string> = {
  "https://github.com/kalandhar01": "GitHub",
  "https://linktr.ee/kalandhar01": "Linktree",
  "https://www.linkedin.com/in/kalandhar-naina-mohamed-339b14276?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app":
    "LinkedIn",
};

export default function Contact() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 px-5 sm:px-10 pt-28 sm:pt-40 pb-12"
    >
      <div className="max-w-7xl mx-auto">
        <ChapterLabel num="07" name="Contact" />

        <h2
          data-reveal
          className="text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.05] mb-8"
        >
          Have an idea?
          <br />
          <span className="text-gradient-accent">Let&apos;s launch it.</span>
        </h2>

        <p data-reveal className="text-mist text-base sm:text-lg max-w-xl mb-12">
          Open for freelance work, collaborations and full-time missions.
          Tell me what you&apos;re building — I&apos;ll reply from orbit.
        </p>

        <div data-reveal className="flex flex-wrap items-center gap-5 mb-24">
          <a
            href={`mailto:${EMAIL}`}
            className="px-8 py-4 font-mono text-xs uppercase tracking-[0.25em] text-space-950 bg-accent rounded-full transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(125,249,255,0.35)]"
          >
            Send a transmission
          </a>
          <button
            onClick={copyEmail}
            className="px-8 py-4 font-mono text-xs uppercase tracking-[0.25em] text-ice border border-white/15 rounded-full transition-colors duration-300 hover:border-accent/60 hover:text-accent"
          >
            {copied ? "Copied ✓" : "Copy my email"}
          </button>
        </div>

        <div className="border-t border-white/10" data-reveal>
          {socialMedia.map((social, i) => (
            <a
              key={social.id}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between py-6 border-b border-white/10 transition-colors duration-300 hover:bg-white/[0.02]"
            >
              <span className="font-mono text-[10px] text-mist tracking-widest w-8">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-xl sm:text-2xl text-ice transition-transform duration-300 group-hover:translate-x-2">
                {SOCIAL_NAMES[social.link] ?? "Link"}
              </span>
              <img
                src={social.img}
                alt=""
                className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity mr-6"
                loading="lazy"
              />
              <span className="font-mono text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                ↗
              </span>
            </a>
          ))}
        </div>

        <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-16 pb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
          <span>© 2026 Kalandhar</span>
          <span className="hidden sm:inline">
            Built with Next.js · GSAP · three.js
          </span>
          <a
            href="#top"
            className="hover:text-accent transition-colors"
          >
            Return to orbit ↑
          </a>
        </footer>
      </div>
    </section>
  );
}

