"use client";

import { useEffect, useRef } from "react";

interface TypingAreaProps {
  words: string[];
  typedWords: string[];
  currentWordIndex: number;
  currentInput: string;
}

export function TypingArea({
  words,
  typedWords,
  currentWordIndex,
  currentInput,
}: TypingAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeWordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeWordRef.current && containerRef.current) {
      activeWordRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentWordIndex]);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-4xl text-left relative h-[140px] mb-6 overflow-hidden select-none outline-none"
    >
      <div className="text-2xl leading-relaxed tracking-wide font-medium flex flex-wrap gap-x-2 gap-y-1">
        {words.map((word, wordIdx) => {
          const isCurrentWord = wordIdx === currentWordIndex;
          const isPastWord = wordIdx < currentWordIndex;

          let typedWord = "";
          if (isPastWord) {
            typedWord = typedWords[wordIdx] || "";
          } else if (isCurrentWord) {
            typedWord = currentInput;
          }

          const lengthToRender = Math.max(word.length, typedWord.length);
          const letters = [];

          for (let i = 0; i < lengthToRender; i++) {
            const expectedChar = word[i];
            const typedChar = typedWord[i];

            let colorClass = "text-[var(--theme-muted)]";

            if (typedChar === expectedChar) {
              colorClass = "text-[var(--theme-text)]";
            } else if (typedChar !== undefined && expectedChar !== undefined) {
              colorClass = "text-[var(--theme-error)]";
            } else if (typedChar !== undefined && expectedChar === undefined) {
              colorClass = "text-[var(--theme-error)] opacity-50";
            }

            const isCaretHere = isCurrentWord && i === typedWord.length;

            letters.push(
              <span
                key={i}
                className={`relative transition-colors duration-150 ${colorClass}`}
              >
                {isCaretHere && (
                  <span className="absolute -left-0.5 top-1 bottom-1 w-0.75 bg-[var(--theme-accent)] animate-pulse rounded-full" />
                )}
                {expectedChar || typedChar}
              </span>
            );
          }

          const isCaretAtEnd =
            isCurrentWord && typedWord.length === word.length;
          if (isCaretAtEnd) {
            letters.push(
              <span key="end-caret" className="relative">
                <span className="absolute -left-0.5 top-1 bottom-1 w-0.75 bg-[var(--theme-accent)] animate-pulse rounded-full" />
              </span>
            );
          }

          const isWordError = isPastWord && typedWord !== word;

          return (
            <div
              key={wordIdx}
              ref={isCurrentWord ? activeWordRef : null}
              className={`relative ${
                isWordError ? "border-b-2 border-[var(--theme-error)]" : ""
              }`}
            >
              {letters}
            </div>
          );
        })}
      </div>
    </div>
  );
}
