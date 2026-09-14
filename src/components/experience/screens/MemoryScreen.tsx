"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Memory } from "@/lib/types";
import { Screen } from "../Screen";

export function MemoryScreen({
  memory,
  index,
  total,
  onNext,
}: {
  memory: Memory;
  index: number;
  total: number;
  onNext: () => void;
}) {
  const [showCaption, setShowCaption] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- resets the caption reveal when the memory changes
    setShowCaption(false);
    const t = setTimeout(() => setShowCaption(true), 500);
    return () => clearTimeout(t);
  }, [memory.id]);

  const isLast = index === total - 1;

  return (
    <Screen>
      {index === 0 && (
        <p className="mb-5 text-sm text-ink-faint">A memory, first of {total}</p>
      )}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-[0_20px_60px_-20px_rgba(0,0,0,0.55)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={memory.image}
          alt={memory.caption || `Memory ${index + 1}`}
          className="max-h-[50vh] w-full object-cover"
        />
      </motion.div>

      {memory.caption && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={showCaption ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mt-5 text-ink-dim text-balance"
        >
          {memory.caption}
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={showCaption ? { opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Button onClick={onNext} className="mt-8">
          {isLast ? "Continue" : index === 0 ? "There's more →" : "Next →"}
        </Button>
      </motion.div>
    </Screen>
  );
}
