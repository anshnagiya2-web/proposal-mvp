"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { fillName } from "@/lib/types";
import { Screen } from "../Screen";

const BUTTON_SIZE = "w-32 py-3.5 justify-center text-center";

export function ProposalPage7({
  confession,
  proposalText,
  recipientName,
  onYes,
}: {
  confession: string;
  proposalText: string;
  recipientName: string;
  onYes: () => void;
}) {
  const [phase, setPhase] = useState<"confession" | "ask">("confession");
  const [noPos, setNoPos] = useState({ top: 50, left: 66 });
  const [dodges, setDodges] = useState(0);

  const paragraphs = confession.split("\n\n").filter((p) => p.trim());

  function moveNo() {
    setDodges((d) => d + 1);
    setNoPos({
      top: 12 + Math.random() * 66,
      left: 8 + Math.random() * 70,
    });
  }

  if (phase === "confession") {
    return (
      <Screen>
        <div className="flex flex-col gap-4">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.5, duration: 0.6 }}
              className="font-display text-xl leading-relaxed text-ink text-balance sm:text-2xl"
            >
              {p}
            </motion.p>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: paragraphs.length * 0.5 + 0.4, duration: 0.5 }}
        >
          <Button onClick={() => setPhase("ask")} className="mt-10">
            Continue →
          </Button>
        </motion.div>
      </Screen>
    );
  }

  return (
    <Screen>
      <p className="text-ink-dim">And here is a proper proposal from my side&hellip;</p>
      <h2 className="mt-3 font-display text-2xl text-ink text-balance sm:text-3xl">
        {fillName(proposalText, recipientName)}
      </h2>

      <div className="relative mt-10 h-56 w-full">
        <div className="absolute left-1/2 top-1/2 -translate-x-[calc(100%+8px)] -translate-y-1/2">
          <Button onClick={onYes} className={BUTTON_SIZE}>
            YES ❤️
          </Button>
        </div>
        <motion.div
          className="absolute"
          animate={{ top: `${noPos.top}%`, left: `${noPos.left}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Button
            variant="secondary"
            onClick={moveNo}
            onTouchStart={(e) => {
              e.preventDefault();
              moveNo();
            }}
            className={BUTTON_SIZE}
          >
            NO
          </Button>
        </motion.div>
      </div>

      {dodges >= 3 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-xs text-ink-faint"
        >
          It&rsquo;s not going anywhere else but YES. 😌
        </motion.p>
      )}
    </Screen>
  );
}
