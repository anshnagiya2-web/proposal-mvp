import { Input, Label } from "@/components/ui/Field";
import { ProposalData } from "@/lib/types";

export function StepProposalPage6({
  data,
  onChange,
}: {
  data: ProposalData;
  onChange: (patch: Partial<ProposalData>) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl text-ink sm:text-3xl">
        Page 6 · Build up
      </h2>
      <p className="mt-2 text-sm text-ink-dim">
        The last stretch before the actual proposal.
      </p>
      <div className="mt-8 flex flex-col gap-6">
        <div>
          <Label>First line</Label>
          <Input
            value={data.page6.line1}
            onChange={(e) =>
              onChange({ page6: { ...data.page6, line1: e.target.value } })
            }
            placeholder="Finally, there's something I want to tell you..."
            maxLength={120}
          />
        </div>
        <div>
          <Label>Second line</Label>
          <Input
            value={data.page6.line2}
            onChange={(e) =>
              onChange({ page6: { ...data.page6, line2: e.target.value } })
            }
            placeholder="Are you ready to hear it? ❤️"
            maxLength={120}
          />
        </div>
      </div>
    </div>
  );
}
