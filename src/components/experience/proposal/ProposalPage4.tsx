import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { MediaItem } from "@/lib/types";
import { Screen } from "../Screen";
import { MediaDisplay } from "./MediaDisplay";

export function ProposalPage4({
  text,
  media,
  onNext,
}: {
  text: string;
  media: MediaItem[];
  onNext: () => void;
}) {
  return (
    <Screen>
      <p className="font-display text-2xl leading-relaxed text-ink text-balance sm:text-3xl">
        {text}
      </p>

      {media.length > 0 && (
        <div className="mt-8 flex flex-col gap-4">
          {media.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.15 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-[0_20px_60px_-25px_rgba(0,0,0,0.55)]"
            >
              <MediaDisplay item={item} className="max-h-[45vh] w-full object-cover" />
            </motion.div>
          ))}
        </div>
      )}

      <Button onClick={onNext} className="mt-8">
        Continue →
      </Button>
    </Screen>
  );
}
