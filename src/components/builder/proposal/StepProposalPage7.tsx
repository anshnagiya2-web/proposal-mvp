import { Input, Label, Textarea } from "@/components/ui/Field";
import { ProposalData } from "@/lib/types";

export function StepProposalPage7({
  data,
  onChange,
}: {
  data: ProposalData;
  onChange: (patch: Partial<ProposalData>) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl text-ink sm:text-3xl">
        Page 7 · The actual proposal
      </h2>
      <p className="mt-2 text-sm text-ink-dim">
        The emotional climax. Take your time with this one.
      </p>
      <div className="mt-8 flex flex-col gap-6">
        <div>
          <Label hint="a blank line starts a new beat">Confession</Label>
          <Textarea
            value={data.page7.confession}
            onChange={(e) =>
              onChange({ page7: { ...data.page7, confession: e.target.value } })
            }
            rows={10}
            maxLength={1200}
          />
        </div>
        <div>
          <Label hint="use {name} for the recipient's name">
            The proposal question
          </Label>
          <Input
            value={data.page7.proposalText}
            onChange={(e) =>
              onChange({
                page7: { ...data.page7, proposalText: e.target.value },
              })
            }
            placeholder="Will you be my girlfriend, Miss {name}?"
            maxLength={140}
          />
        </div>
      </div>
    </div>
  );
}
