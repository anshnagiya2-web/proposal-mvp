import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Screen } from "../Screen";

export function IntroScreen({
  recipientName,
  onNext,
}: {
  recipientName: string;
  onNext: () => void;
}) {
  const name = recipientName.trim() || "you";
  return (
    <Screen>
      <motion.div
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="mx-auto mb-8 h-2 w-2 rounded-full bg-accent"
      />
      <h1 className="font-display text-3xl leading-snug text-ink text-balance sm:text-4xl">
        Hey, {name}&hellip; 👀
      </h1>
      <p className="mt-4 text-ink-dim">
        Someone made something special for you.
      </p>
      <Button onClick={onNext} className="mt-10">
        Open it
      </Button>
    </Screen>
  );
}

export function SuspenseScreen({ onNext }: { onNext: () => void }) {
  return (
    <Screen>
      <p className="text-ink-dim">Before I show you everything&hellip;</p>
      <h2 className="mt-3 font-display text-2xl text-ink text-balance sm:text-3xl">
        There&rsquo;s something you need to do.
      </h2>
      <Button onClick={onNext} className="mt-10">
        Okay 👀
      </Button>
    </Screen>
  );
}
