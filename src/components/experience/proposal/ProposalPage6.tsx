"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Screen } from "../Screen";

const nudges = [
  "Aww, come on... 🥹",
  "You know you want to. 👀",
  "Just a little more courage...",
];

export function ProposalPage6({
  line1,
  line2,
  onNext,
}: {
  line1: string;
  line2: string;
  onNext: () => void;
}) {
  const [nudge, setNudge] = useState<string | null>(null);

  return (
    <Screen>
      <p className="text-ink-dim">{line1}</p>
      <h2 className="mt-3 font-display text-2xl text-ink text-balance sm:text-3xl">
        {line2}
      </h2>
      <div className="mt-10 flex flex-col items-center gap-4">
        <Button
          onClick={onNext}
          className="px-10 py-4 text-lg shadow-[0_12px_40px_-12px_rgba(231,166,103,0.6)]"
        >
          YESS ❤️
        </Button>
        <button
          type="button"
          onClick={() =>
            setNudge(nudges[Math.floor(Math.random() * nudges.length)])
          }
          className="text-xs text-ink-faint underline decoration-line-strong underline-offset-4 hover:text-ink-dim"
        >
          No
        </button>
      </div>
      <div className="mt-4 h-5">
        <AnimatePresence mode="wait">
          {nudge && (
            <motion.p
              key={nudge}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs text-ink-faint"
            >
              {nudge}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </Screen>
  );
}
