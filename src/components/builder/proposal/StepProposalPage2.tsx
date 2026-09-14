import { Input, Label } from "@/components/ui/Field";
import { ProposalData } from "@/lib/types";

export function StepProposalPage2({
  data,
  onChange,
}: {
  data: ProposalData;
  onChange: (patch: Partial<ProposalData>) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl text-ink sm:text-3xl">
        Page 2 · Curiosity
      </h2>
      <p className="mt-2 text-sm text-ink-dim">
        A short line to pull them in before the YES/NO choice.
      </p>
      <div className="mt-8 flex flex-col gap-6">
        <div>
          <Label>First line</Label>
          <Input
            value={data.page2.line1}
            onChange={(e) =>
              onChange({ page2: { ...data.page2, line1: e.target.value } })
            }
            placeholder="I really wanted to tell you something..."
            maxLength={120}
          />
        </div>
        <div>
          <Label>Second line</Label>
          <Input
            value={data.page2.line2}
            onChange={(e) =>
              onChange({ page2: { ...data.page2, line2: e.target.value } })
            }
            placeholder="Are you interested to know what?"
            maxLength={120}
          />
        </div>
      </div>
    </div>
  );
}
