import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { fillName } from "@/lib/types";
import { Screen } from "../Screen";

export function ProposalPage1({
  text,
  recipientName,
  onNext,
}: {
  text: string;
  recipientName: string;
  onNext: () => void;
}) {
  return (
    <Screen>
      <motion.div
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="mx-auto mb-8 h-2 w-2 rounded-full bg-accent"
      />
      <h1 className="font-display text-3xl leading-snug text-ink text-balance sm:text-4xl">
        {fillName(text, recipientName)}
      </h1>
      <Button onClick={onNext} className="mt-10">
        Continue →
      </Button>
    </Screen>
  );
}
