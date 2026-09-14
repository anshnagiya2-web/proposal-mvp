"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Screen } from "../Screen";

export function ProposalPage3({
  choice,
  yesText,
  noText,
  gameIntro,
  gameQuestion,
  options,
  responses,
  onNext,
}: {
  choice: "yes" | "no";
  yesText: string;
  noText: string;
  gameIntro: string;
  gameQuestion: string;
  options: [string, string, string];
  responses: [string, string, string];
  onNext: () => void;
}) {
  const [phase, setPhase] = useState<"response" | "game">("response");
  const [picked, setPicked] = useState<number | null>(null);

  const responseLines = (choice === "yes" ? yesText : noText)
    .split("\n")
    .filter((l) => l.trim());

  if (phase === "response") {
    return (
      <Screen>
        <div className="flex flex-col gap-3">
          {responseLines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.35, duration: 0.5 }}
              className="font-display text-2xl text-ink text-balance sm:text-3xl"
            >
              {line}
            </motion.p>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: responseLines.length * 0.35 + 0.3, duration: 0.5 }}
        >
          <Button onClick={() => setPhase("game")} className="mt-10">
            Continue →
          </Button>
        </motion.div>
      </Screen>
    );
  }

  return (
    <Screen>
      <p className="text-ink-dim">{gameIntro}</p>
      <h2 className="mt-3 font-display text-2xl text-ink text-balance sm:text-3xl">
        {gameQuestion}
      </h2>
      <div className="mt-8 flex flex-col gap-3">
        {options.map((option, i) => (
          <button
            key={i}
            type="button"
            disabled={picked !== null}
            onClick={() => setPicked(i)}
            className={`rounded-xl border px-5 py-3 text-left text-[15px] transition-colors ${
              picked === i
                ? "border-accent bg-accent/10 text-accent-soft"
                : "border-line-strong bg-surface text-ink hover:border-ink-faint"
            } disabled:opacity-60`}
          >
            {option}
          </button>
        ))}
      </div>
      {picked !== null && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="mt-6 text-sm text-ink-dim">{responses[picked]}</p>
          <Button onClick={onNext} className="mt-6">
            Continue →
          </Button>
        </motion.div>
      )}
    </Screen>
  );
}
