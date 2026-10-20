"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type SiteContextValue = {
  entered: boolean;
  enter: (withSound: boolean) => void;
  soundOn: boolean;
  toggleSound: () => void;
  motionOn: boolean;
  toggleMotion: () => void;
  audioAvailable: boolean;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [entered, setEntered] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [motionOn, setMotionOn] = useState(true);
  const [audioAvailable, setAudioAvailable] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/audio/ambient.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audio.addEventListener("error", () => setAudioAvailable(false));
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const enter = useCallback((withSound: boolean) => {
    setEntered(true);
    if (withSound && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setSoundOn(true))
        .catch(() => setSoundOn(false));
    }
  }, []);

  const toggleSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audioAvailable) return;
    if (soundOn) {
      audio.pause();
      setSoundOn(false);
    } else {
      audio
        .play()
        .then(() => setSoundOn(true))
        .catch(() => setSoundOn(false));
    }
  }, [soundOn, audioAvailable]);

  const toggleMotion = useCallback(() => {
    setMotionOn((prev) => {
      const next = !prev;
      document.documentElement.setAttribute(
        "data-motion",
        next ? "on" : "off"
      );
      return next;
    });
  }, []);

  return (
    <SiteContext.Provider
      value={{
        entered,
        enter,
        soundOn,
        toggleSound,
        motionOn,
        toggleMotion,
        audioAvailable,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SoundProvider");
  return ctx;
}
