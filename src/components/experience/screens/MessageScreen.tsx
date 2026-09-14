"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Screen } from "../Screen";

export function MessageScreen({
  message,
  onNext,
}: {
  message: string;
  onNext: () => void;
}) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const paragraphs = message.trim().length
    ? message.trim().split(/\n+/)
    : ["…"];

  return (
    <Screen>
      {!revealed ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-ink-dim">Okay&hellip;</p>
          <p className="mt-2 font-display text-2xl text-ink">
            I think you&rsquo;re ready.
          </p>
        </motion.div>
      ) : (
        <div>
          <div className="flex flex-col gap-4">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.35, duration: 0.6 }}
                className="font-display text-xl leading-relaxed text-ink text-balance sm:text-2xl"
              >
                {p}
              </motion.p>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: paragraphs.length * 0.35 + 0.3, duration: 0.5 }}
          >
            <Button onClick={onNext} className="mt-10">
              Continue
            </Button>
          </motion.div>
        </div>
      )}
    </Screen>
  );
}
