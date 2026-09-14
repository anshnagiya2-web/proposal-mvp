"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { SurpriseData } from "@/lib/types";
import { IntroScreen, SuspenseScreen } from "./screens/OpeningScreens";
import { GuessScreen } from "./screens/GuessScreen";
import { TapScreen } from "./screens/TapScreen";
import { MemoryScreen } from "./screens/MemoryScreen";
import { MessageScreen } from "./screens/MessageScreen";
import {
  HiddenPromptScreen,
  HiddenRevealScreen,
} from "./screens/HiddenMessageScreens";
import { FinalRevealScreen, FinalSuspenseScreen } from "./screens/FinalScreens";

type Phase =
  | { kind: "intro" }
  | { kind: "suspense" }
  | { kind: "guess" }
  | { kind: "tap" }
  | { kind: "memory"; index: number }
  | { kind: "message" }
  | { kind: "hiddenPrompt" }
  | { kind: "hiddenReveal" }
  | { kind: "finalSuspense" }
  | { kind: "finalReveal" };

function buildPhases(data: SurpriseData): Phase[] {
  const phases: Phase[] = [{ kind: "intro" }, { kind: "suspense" }];
  if (data.guess.enabled && data.guess.options.some((o) => o.trim())) {
    phases.push({ kind: "guess" });
  }
  if (data.tap.enabled) phases.push({ kind: "tap" });
  data.memories.forEach((_, index) => phases.push({ kind: "memory", index }));
  phases.push({ kind: "message" });
  if (data.hidden.enabled && data.hidden.message.trim()) {
    phases.push({ kind: "hiddenPrompt" }, { kind: "hiddenReveal" });
  }
  phases.push({ kind: "finalSuspense" }, { kind: "finalReveal" });
  return phases;
}

function phaseKey(phase: Phase) {
  return phase.kind === "memory" ? `memory-${phase.index}` : phase.kind;
}

export function RecipientExperience({
  data,
  isPreview,
}: {
  data: SurpriseData;
  isPreview?: boolean;
}) {
  const phases = useMemo(() => buildPhases(data), [data]);
  const [i, setI] = useState(0);
  const safeIndex = Math.min(i, phases.length - 1);
  const phase = phases[safeIndex];
  const next = () => setI((v) => Math.min(v + 1, phases.length - 1));
  const restart = () => setI(0);

  return (
    <div className="grain relative flex h-full min-h-[100dvh] w-full flex-col overflow-hidden bg-gradient-to-b from-bg-soft to-bg">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-72 bg-[radial-gradient(ellipse_at_top,rgba(231,166,103,0.08),transparent_65%)]" />
      <AnimatePresence mode="wait">
        <motion.div
          key={phaseKey(phase)}
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-1 flex-col"
        >
          {phase.kind === "intro" && (
            <IntroScreen recipientName={data.recipientName} onNext={next} />
          )}
          {phase.kind === "suspense" && <SuspenseScreen onNext={next} />}
          {phase.kind === "guess" && (
            <GuessScreen
              prompt={data.guess.prompt}
              options={data.guess.options.filter((o) => o.trim())}
              onNext={next}
            />
          )}
          {phase.kind === "tap" && (
            <TapScreen
              prompt={data.tap.prompt}
              required={data.tap.taps}
              onNext={next}
            />
          )}
          {phase.kind === "memory" && (
            <MemoryScreen
              memory={data.memories[phase.index]}
              index={phase.index}
              total={data.memories.length}
              onNext={next}
            />
          )}
          {phase.kind === "message" && (
            <MessageScreen message={data.message} onNext={next} />
          )}
          {phase.kind === "hiddenPrompt" && (
            <HiddenPromptScreen prompt={data.hidden.prompt} onNext={next} />
          )}
          {phase.kind === "hiddenReveal" && (
            <HiddenRevealScreen message={data.hidden.message} onNext={next} />
          )}
          {phase.kind === "finalSuspense" && (
            <FinalSuspenseScreen onNext={next} />
          )}
          {phase.kind === "finalReveal" && (
            <FinalRevealScreen
              message={data.finalMessage}
              signoff={data.finalSignoff}
              isPreview={isPreview}
              onRestart={restart}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
