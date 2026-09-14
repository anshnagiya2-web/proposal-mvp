import { Input, Label, Textarea } from "@/components/ui/Field";
import { ProposalData } from "@/lib/types";

export function StepProposalPage8({
  data,
  onChange,
}: {
  data: ProposalData;
  onChange: (patch: Partial<ProposalData>) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl text-ink sm:text-3xl">
        Page 8 · Final message
      </h2>
      <p className="mt-2 text-sm text-ink-dim">
        What they read right after saying yes, and the very last line.
      </p>
      <div className="mt-8 flex flex-col gap-6">
        <div>
          <Label hint="a blank line starts a new paragraph">Final paragraph</Label>
          <Textarea
            value={data.page8.text}
            onChange={(e) =>
              onChange({ page8: { ...data.page8, text: e.target.value } })
            }
            rows={10}
            maxLength={1600}
          />
        </div>
        <div>
          <Label>Closing line</Label>
          <Input
            value={data.page8.finalLine}
            onChange={(e) =>
              onChange({ page8: { ...data.page8, finalLine: e.target.value } })
            }
            placeholder="I LOVE YOU ❤️"
            maxLength={60}
          />
        </div>
      </div>
    </div>
  );
}
