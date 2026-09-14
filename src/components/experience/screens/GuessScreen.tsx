"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Screen } from "../Screen";

const responses = [
  "Good guess… but you're going to have to keep going 😏",
  "Interesting choice. You'll see soon enough.",
  "Noted. Let's find out if you're right.",
];

export function GuessScreen({
  prompt,
  options,
  onNext,
}: {
  prompt: string;
  options: string[];
  onNext: () => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [response] = useState(
    () => responses[Math.floor(Math.random() * responses.length)]
  );

  return (
    <Screen>
      <p className="text-ink-dim">Take a guess&hellip;</p>
      <h2 className="mt-3 font-display text-2xl text-ink text-balance sm:text-3xl">
        {prompt}
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
          <p className="mt-6 text-sm text-ink-dim">{response}</p>
          <Button onClick={onNext} className="mt-6">
            Keep going
          </Button>
        </motion.div>
      )}
    </Screen>
  );
}
