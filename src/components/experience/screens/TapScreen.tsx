"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Screen } from "../Screen";

export function TapScreen({
  prompt,
  required,
  onNext,
}: {
  prompt: string;
  required: number;
  onNext: () => void;
}) {
  const [count, setCount] = useState(0);
  const [burst, setBurst] = useState(0);
  const done = count >= required;

  function tap() {
    if (done) return;
    setCount((c) => c + 1);
    setBurst((b) => b + 1);
  }

  return (
    <Screen>
      {!done ? (
        <p className="text-ink-dim">{prompt}</p>
      ) : (
        <p className="text-ink-dim">Okay 😂 you really wanted to know.</p>
      )}

      <div className="relative mx-auto mt-10 flex h-40 w-40 items-center justify-center">
        <motion.button
          type="button"
          onClick={tap}
          disabled={done}
          aria-label="Tap the heart"
          whileTap={{ scale: 0.85 }}
          animate={
            done
              ? { scale: 1.1 }
              : { scale: [1, 1.08, 1] }
          }
          transition={
            done
              ? { type: "spring", stiffness: 260, damping: 14 }
              : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
          }
          className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-accent-2/20 to-accent/20 text-6xl disabled:cursor-default"
        >
          <motion.span key={burst} initial={{ scale: 1 }} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.3 }}>
            ❤️
          </motion.span>
        </motion.button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-1.5">
        {Array.from({ length: required }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i < count ? "bg-accent" : "bg-line-strong"
            }`}
          />
        ))}
      </div>

      {done && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button onClick={onNext} className="mt-8">
            Continue
          </Button>
        </motion.div>
      )}
    </Screen>
  );
}
