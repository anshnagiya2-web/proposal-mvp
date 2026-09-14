import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Screen } from "../Screen";

export function HiddenPromptScreen({
  prompt,
  onNext,
}: {
  prompt: string;
  onNext: () => void;
}) {
  return (
    <Screen>
      <motion.div
        animate={{ rotate: [0, -4, 4, -4, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.5 }}
        className="mx-auto mb-6 text-4xl"
      >
        🔒
      </motion.div>
      <h2 className="font-display text-2xl text-ink text-balance sm:text-3xl">
        {prompt}
      </h2>
      <Button onClick={onNext} className="mt-10">
        Show me
      </Button>
    </Screen>
  );
}

export function HiddenRevealScreen({
  message,
  onNext,
}: {
  message: string;
  onNext: () => void;
}) {
  return (
    <Screen>
      <motion.p
        initial={{ opacity: 0, filter: "blur(8px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8 }}
        className="font-display text-2xl leading-relaxed text-ink text-balance sm:text-3xl"
      >
        {message.trim() || "…"}
      </motion.p>
      <Button onClick={onNext} className="mt-10">
        Continue
      </Button>
    </Screen>
  );
}
