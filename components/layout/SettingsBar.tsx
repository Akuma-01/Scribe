"use client";

import type { TestMode } from "@/hooks/useTypingTest";

interface SettingsBarProps {
  mode: TestMode;
  setMode: (mode: TestMode) => void;
  time: number;
  setTime: (time: number) => void;
  wordCount: number;
  setWordCount: (count: number) => void;
}

export function SettingsBar({
  mode,
  setMode,
  time,
  setTime,
  wordCount,
  setWordCount,
}: SettingsBarProps) {
  const timeOptions = [15, 30, 60, 120];
  const wordOptions = [10, 25, 50, 100];

  return (
    <div className="flex items-center gap-4 bg-[var(--theme-secondary-bg)] px-4 py-1.5 rounded-xl text-[11px] font-bold text-[var(--theme-muted)]">
      <div className="flex items-center gap-3 pr-4 border-r border-[var(--theme-muted)]/30">
        <button
          onClick={() => setMode("time")}
          className={`flex items-center gap-2 transition-colors ${
            mode === "time"
              ? "text-[var(--theme-accent)]"
              : "hover:text-[var(--theme-text)]"
          }`}
        >
          @ time
        </button>
        <button
          onClick={() => setMode("words")}
          className={`flex items-center gap-2 transition-colors ${
            mode === "words"
              ? "text-[var(--theme-accent)]"
              : "hover:text-[var(--theme-text)]"
          }`}
        >
          A words
        </button>
      </div>
      <div className="flex items-center gap-5">
        {mode === "time"
          ? timeOptions.map((t) => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={`transition-colors ${
                  time === t
                    ? "text-[var(--theme-accent)]"
                    : "hover:text-[var(--theme-text)]"
                }`}
              >
                {t}
              </button>
            ))
          : wordOptions.map((w) => (
              <button
                key={w}
                onClick={() => setWordCount(w)}
                className={`transition-colors ${
                  wordCount === w
                    ? "text-[var(--theme-accent)]"
                    : "hover:text-[var(--theme-text)]"
                }`}
              >
                {w}
              </button>
            ))}
      </div>
    </div>
  );
}
