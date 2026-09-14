import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Screen } from "../Screen";

export function FinalSuspenseScreen({ onNext }: { onNext: () => void }) {
  return (
    <Screen>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-ink-dim"
      >
        But&hellip;
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-2 font-display text-2xl text-ink text-balance sm:text-3xl"
      >
        There&rsquo;s one last thing.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <p className="mt-6 text-ink-dim">Ready?</p>
        <Button onClick={onNext} className="mt-6">
          Show me
        </Button>
      </motion.div>
    </Screen>
  );
}

export function FinalRevealScreen({
  message,
  signoff,
  isPreview,
  onRestart,
}: {
  message: string;
  signoff: string;
  isPreview?: boolean;
  onRestart?: () => void;
}) {
  return (
    <Screen>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto mb-6 h-px w-10 bg-accent" />
        <p className="font-display text-2xl leading-relaxed text-ink text-balance sm:text-3xl">
          {message.trim() || "You mean more to me than you probably realize."}
        </p>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-8 text-sm text-ink-faint"
      >
        {signoff || "Made just for you."}
      </motion.p>

      {!isPreview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <Link
            href="/create"
            className="mt-10 inline-block text-sm text-ink-faint underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink-dim"
          >
            Create one for someone else
          </Link>
        </motion.div>
      )}

      {isPreview && onRestart && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <button
            onClick={onRestart}
            className="mt-10 text-sm text-ink-faint underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink-dim"
          >
            Watch it again
          </button>
        </motion.div>
      )}
    </Screen>
  );
}
