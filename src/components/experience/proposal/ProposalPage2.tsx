import { Button } from "@/components/ui/Button";
import { Screen } from "../Screen";

export function ProposalPage2({
  line1,
  line2,
  onChoose,
}: {
  line1: string;
  line2: string;
  onChoose: (choice: "yes" | "no") => void;
}) {
  return (
    <Screen>
      <p className="text-ink-dim">{line1}</p>
      <h2 className="mt-3 font-display text-2xl text-ink text-balance sm:text-3xl">
        {line2}
      </h2>
      <div className="mt-10 flex items-center justify-center gap-3">
        <Button onClick={() => onChoose("yes")}>YES ❤️</Button>
        <Button variant="secondary" onClick={() => onChoose("no")}>
          NO
        </Button>
      </div>
    </Screen>
  );
}
