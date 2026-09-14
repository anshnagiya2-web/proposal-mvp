import { Input, Label } from "@/components/ui/Field";
import { ProposalData } from "@/lib/types";

export function StepProposalPage1({
  data,
  onChange,
}: {
  data: ProposalData;
  onChange: (patch: Partial<ProposalData>) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl text-ink sm:text-3xl">
        Page 1 · Opening
      </h2>
      <p className="mt-2 text-sm text-ink-dim">
        The first thing they see. Their name gets dropped in wherever you
        write <code className="text-ink-faint">{"{name}"}</code>.
      </p>
      <div className="mt-8 flex flex-col gap-6">
        <div>
          <Label>Recipient&rsquo;s name</Label>
          <Input
            value={data.recipientName}
            onChange={(e) => onChange({ recipientName: e.target.value })}
            placeholder="Ananya"
            maxLength={40}
            autoFocus
          />
        </div>
        <div>
          <Label hint="use {name} for the recipient's name">Opening line</Label>
          <Input
            value={data.page1.text}
            onChange={(e) =>
              onChange({ page1: { text: e.target.value } })
            }
            placeholder="Hi... {name} ❤️"
            maxLength={120}
          />
          <p className="mt-2 text-xs text-ink-faint">
            Preview: {data.page1.text.replaceAll("{name}", data.recipientName.trim() || "…")}
          </p>
        </div>
      </div>
    </div>
  );
}
