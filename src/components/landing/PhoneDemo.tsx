"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const scenes = [
  {
    key: "curious",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="font-display text-xl text-ink">Hey, Sarah… 👀</p>
        <p className="text-sm text-ink-dim">
          Someone made something special for you.
        </p>
        <div className="mt-2 rounded-full border border-line-strong px-4 py-1.5 text-xs text-ink-dim">
          Open it
        </div>
      </div>
    ),
  },
  {
    key: "guess",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-sm text-ink-dim">Take a guess…</p>
        <p className="font-display text-lg text-ink">
          What&rsquo;s waiting for you?
        </p>
        <div className="mt-1 flex flex-col gap-1.5 w-full">
          {["Something cute", "Something emotional", "Something unexpected"].map(
            (o, i) => (
              <div
                key={o}
                className={`rounded-xl border px-3 py-1.5 text-xs ${
                  i === 1
                    ? "border-accent/60 bg-accent/10 text-accent-soft"
                    : "border-line text-ink-dim"
                }`}
              >
                {o}
              </div>
            )
          )}
        </div>
      </div>
    ),
  },
  {
    key: "tap",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-sm text-ink-dim">Tap the heart 5 times.</p>
        <motion.div
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          className="text-4xl"
        >
          ❤️
        </motion.div>
      </div>
    ),
  },
  {
    key: "memory",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
        <div className="h-24 w-full rounded-xl bg-gradient-to-br from-accent-2/30 via-surface-2 to-accent/20" />
        <p className="text-xs text-ink-dim">
          One of my favorite days with you.
        </p>
      </div>
    ),
  },
  {
    key: "reveal",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-7 text-center">
        <p className="font-display text-lg leading-snug text-ink text-balance">
          You mean more to me than you probably realize.
        </p>
        <p className="text-xs text-ink-faint">Made just for you.</p>
      </div>
    ),
  },
];

export function PhoneDemo() {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads a platform API once after mount
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % scenes.length);
    }, 2400);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <div className="relative mx-auto w-[260px] select-none sm:w-[280px]">
      <div className="absolute -inset-10 -z-10 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative rounded-[2.25rem] border border-line-strong bg-surface p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
        <div className="grain relative h-[440px] overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-bg-soft to-bg">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center pt-2.5">
            <div className="h-1 w-10 rounded-full bg-line-strong" />
          </div>
          <div className="absolute inset-0 flex gap-1 px-4 pt-4">
            {scenes.map((s, i) => (
              <div
                key={s.key}
                className="h-0.5 flex-1 overflow-hidden rounded-full bg-line-strong"
              >
                <motion.div
                  className="h-full bg-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: i === index ? "100%" : i < index ? "100%" : "0%" }}
                  transition={{ duration: i === index ? 2.4 : 0 }}
                />
              </div>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={scenes[index].key}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              {scenes[index].content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
