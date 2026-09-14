import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { MediaItem } from "@/lib/types";
import { Screen } from "../Screen";
import { MediaDisplay } from "./MediaDisplay";

export function ProposalPage5({
  text,
  media,
  onNext,
}: {
  text: string;
  media: MediaItem[];
  onNext: () => void;
}) {
  const [first, ...rest] = media;

  return (
    <Screen>
      <p className="font-display text-2xl leading-relaxed text-ink text-balance sm:text-3xl">
        {text}
      </p>

      {media.length > 0 && (
        <div className="mt-8 flex flex-col gap-3">
          {first && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-[0_20px_60px_-25px_rgba(0,0,0,0.55)]"
            >
              <MediaDisplay item={first} className="max-h-[38vh] w-full object-cover" />
            </motion.div>
          )}
          {rest.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {rest.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 * (i + 1), duration: 0.55 }}
                  className="overflow-hidden rounded-xl border border-line-strong bg-surface"
                >
                  <MediaDisplay item={item} className="h-28 w-full object-cover sm:h-32" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      <Button onClick={onNext} className="mt-8">
        Continue →
      </Button>
    </Screen>
  );
}
