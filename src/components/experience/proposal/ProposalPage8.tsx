"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Screen } from "../Screen";

export function ProposalPage8({
  text,
  finalLine,
}: {
  text: string;
  finalLine: string;
}) {
  const [showFinal, setShowFinal] = useState(false);
  const paragraphs = text.split("\n\n").filter((p) => p.trim());

  useEffect(() => {
    const t = setTimeout(
      () => setShowFinal(true),
      paragraphs.length * 700 + 800
    );
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen>
      <div className="flex flex-col gap-4">
        {paragraphs.map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.7, duration: 0.6 }}
            className="text-[15px] leading-relaxed text-ink-dim text-balance"
          >
            {p}
          </motion.p>
        ))}
      </div>

      {showFinal && (
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 font-display text-4xl text-ink sm:text-5xl"
        >
          {finalLine}
        </motion.p>
      )}
    </Screen>
  );
}
