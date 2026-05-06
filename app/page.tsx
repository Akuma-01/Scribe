"use client";

import { SettingsBar } from "@/components/layout/SettingsBar";
import { StatsScreen } from "@/components/layout/StatsScreen";
import { TypingArea } from "@/components/layout/TypingArea";
import {
  Keyboard,
  type KeyboardInteractionEvent,
  type KeyboardThemeName,
} from "@/components/ui/keyboard";
import { useTypingTest, type TestMode } from "@/hooks/useTypingTest";
import { Keyboard as KeyboardIcon, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

const THEMES: KeyboardThemeName[] = [
  "classic",
  "mint",
  "royal",
  "dolch",
  "sand",
  "scarlet",
];

const SITE_THEMES: Record<
  KeyboardThemeName,
  {
    background: string;
    text: string;
    muted: string;
    accent: string;
    secondaryBg: string;
    error: string;
  }
> = {
  classic: {
    background: "#323437",
    text: "#ffddd0ff",
    muted: "#646669",
    accent: "#ff4901ff",
    secondaryBg: "#2c2e31",
    error: "#ca4754",
  },
  mint: {
    background: "#0f1719",
    text: "#d5e8e6",
    muted: "#4e7c78",
    accent: "#86c8ac",
    secondaryBg: "#162022",
    error: "#ca4754",
  },
  royal: {
    background: "#232530",
    text: "#e1e2e6",
    muted: "#6a7ea3",
    accent: "#e4d440",
    secondaryBg: "#2a2c38",
    error: "#ca4754",
  },
  dolch: {
    background: "#202020",
    text: "#ebebeb",
    muted: "#585858",
    accent: "#d73e42",
    secondaryBg: "#2a2a2a",
    error: "#ca4754",
  },
  sand: {
    background: "#2e2a24",
    text: "#fdf6e3",
    muted: "#8c7f70",
    accent: "#e0ab76",
    secondaryBg: "#36322b",
    error: "#ca4754",
  },
  scarlet: {
    background: "#2b1d1d",
    text: "#ffffff",
    muted: "#e8d5d5",
    accent: "#d5868a",
    secondaryBg: "#362424",
    error: "#ca4754",
  },
};

export default function Home() {
  const [timeLimit, setTimeLimit] = useState<number>(30);
  const [wordCount, setWordCount] = useState<number>(25);
  const [testMode, setTestMode] = useState<TestMode>("time");
  const [themeIndex, setThemeIndex] = useState<number>(0);

  const activeTheme = THEMES[themeIndex];

  // Apply site theme CSS custom properties
  useEffect(() => {
    const theme = SITE_THEMES[activeTheme];
    const root = document.documentElement;
    root.style.setProperty("--theme-bg", theme.background);
    root.style.setProperty("--theme-text", theme.text);
    root.style.setProperty("--theme-muted", theme.muted);
    root.style.setProperty("--theme-accent", theme.accent);
    root.style.setProperty("--theme-secondary-bg", theme.secondaryBg);
    root.style.setProperty("--theme-error", theme.error);
  }, [activeTheme]);

  const currentTarget = testMode === "time" ? timeLimit : wordCount;

  const {
    words,
    typedWords,
    currentWordIndex,
    currentInput,
    status,
    timeLeft,
    timeElapsed,
    history,
    handleKeyDown,
    reset,
    stats,
  } = useTypingTest(testMode, currentTarget);

  // Capture physical keyboard input globally
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const resetBtn = document.getElementById("reset-test-button");
        if (resetBtn) resetBtn.focus();
        return;
      }

      if (
        e.key === "Enter" &&
        document.activeElement?.id === "reset-test-button"
      ) {
        // Let the button's onClick handle it
      } else if (e.key === "Enter" && status === "finished") {
        reset();
        return;
      }

      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setThemeIndex((prev) => (prev - 1 + THEMES.length) % THEMES.length);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setThemeIndex((prev) => (prev + 1) % THEMES.length);
        return;
      }

      handleKeyDown(e.key, e.ctrlKey);
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [handleKeyDown, status, reset]);

  const onKeyEvent = (event: KeyboardInteractionEvent) => {
    if (event.phase === "down" && event.source === "pointer") {
      let char = event.code;
      if (char.startsWith("Key")) char = char.replace("Key", "").toLowerCase();
      if (char === "Space") char = " ";
      if (char === "Backspace") char = "Backspace";

      if (char.length === 1 || char === "Backspace" || char === " ") {
        handleKeyDown(char);
      }
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-(--theme-bg) text-(--theme-text) font-sans selection:bg-(--theme-accent) selection:text-(--theme-bg) flex flex-col items-center relative">

      {/* Logo */}
      <div className="absolute top-6 left-6 flex flex-col">
        <h1 className="text-2xl font-bold tracking-tighter text-[var(--theme-text)] select-none flex items-center gap-1">
          <span className="text-[var(--theme-accent)]">scribe</span>
          <KeyboardIcon className="w-6 h-6 text-[var(--theme-text)]" />

        </h1>
        <span className="text-xs text-[var(--theme-muted)] mt-1 ml-1 select-none">
          @Anurag
        </span>
      </div>

      {/* Vertical Theme Toggle — right edge */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4">
        <div className="flex flex-col gap-3 bg-[var(--theme-secondary-bg)] p-3 rounded-full shadow-lg">
          {THEMES.map((theme, index) => (
            <button
              key={theme}
              onClick={(e) => {
                setThemeIndex(index);
                e.currentTarget.blur();
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${activeTheme === theme
                ? "bg-[var(--theme-accent)] scale-150"
                : "bg-[var(--theme-muted)] hover:bg-[var(--theme-text)] hover:scale-125"
                }`}
              style={{
                boxShadow:
                  activeTheme === theme
                    ? `0 0 10px var(--theme-accent)`
                    : "none",
              }}
              title={`Theme: ${theme}`}
              aria-label={`Select ${theme} theme`}
            />
          ))}
        </div>
        <div className="text-[10px] uppercase tracking-widest text-[var(--theme-muted)] font-bold rotate-90 origin-center whitespace-nowrap translate-y-8 select-none">
          {activeTheme}
        </div>
      </div>

      <div className="w-full max-w-5xl h-full flex flex-col px-8">
        <main className="flex-1 w-full flex flex-col justify-center items-center pb-4 pt-16">
          {status !== "finished" ? (
            <>
              <div className="flex items-center h-10 mb-6 gap-4">
                {status === "idle" && (
                  <SettingsBar
                    mode={testMode}
                    setMode={setTestMode}
                    time={timeLimit}
                    setTime={setTimeLimit}
                    wordCount={wordCount}
                    setWordCount={setWordCount}
                  />
                )}

                {status === "playing" && (
                  <div className="flex items-center justify-center text-2xl font-bold text-[var(--theme-accent)] px-4">
                    {testMode === "time"
                      ? `${timeLeft}s`
                      : `${typedWords.length}/${wordCount}`}
                  </div>
                )}

                <button
                  id="reset-test-button"
                  onClick={(e) => {
                    e.currentTarget.blur();
                    reset();
                  }}
                  title="tab + enter to restart test"
                  className="flex items-center justify-center gap-2 p-2 rounded-md outline-none text-[var(--theme-muted)] hover:text-[var(--theme-text)] focus-visible:text-[var(--theme-text)] focus-visible:bg-[var(--theme-secondary-bg)] transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>

              <TypingArea
                words={words}
                typedWords={typedWords}
                currentWordIndex={currentWordIndex}
                currentInput={currentInput}
              />

              <div className="flex flex-col items-center justify-center mt-15">
                <div className="transform scale-75 origin-top">
                  <Keyboard
                    enableHaptics={true}
                    enableSound={true}
                    theme={activeTheme}
                    onKeyEvent={onKeyEvent}
                  />
                </div>
              </div>
            </>
          ) : (
            <StatsScreen
              stats={stats}
              history={history}
              mode={testMode}
              targetValue={currentTarget}
              timeElapsed={timeElapsed}
              onRestart={reset}
            />
          )}
        </main>
      </div>
    </div>
  );
}
