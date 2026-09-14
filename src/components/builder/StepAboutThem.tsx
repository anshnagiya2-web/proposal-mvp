import { Input, Label } from "@/components/ui/Field";
import { SurpriseData } from "@/lib/types";

export function StepAboutThem({
  data,
  onChange,
}: {
  data: SurpriseData;
  onChange: (patch: Partial<SurpriseData>) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl text-ink sm:text-3xl">
        Who is this for?
      </h2>
      <p className="mt-2 text-sm text-ink-dim">
        Just the basics — this shapes how the whole experience talks to them.
      </p>
      <div className="mt-8 flex flex-col gap-6">
        <div>
          <Label>Recipient&rsquo;s name</Label>
          <Input
            value={data.recipientName}
            onChange={(e) => onChange({ recipientName: e.target.value })}
            placeholder="Sarah"
            maxLength={40}
            autoFocus
          />
        </div>
        <div>
          <Label>Your name</Label>
          <Input
            value={data.senderName}
            onChange={(e) => onChange({ senderName: e.target.value })}
            placeholder="Alex"
            maxLength={40}
          />
        </div>
      </div>
    </div>
  );
}
