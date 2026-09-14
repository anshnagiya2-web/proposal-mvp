import { Input, Label, Textarea } from "@/components/ui/Field";
import { SurpriseData } from "@/lib/types";

export function StepFinalReveal({
  data,
  onChange,
}: {
  data: SurpriseData;
  onChange: (patch: Partial<SurpriseData>) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl text-ink sm:text-3xl">
        Final reveal
      </h2>
      <p className="mt-2 text-sm text-ink-dim">
        The payoff — what they land on after everything else. Keep it short;
        let it land.
      </p>
      <div className="mt-8 flex flex-col gap-6">
        <div>
          <Label hint={`${data.finalMessage.length}/240`}>
            The last thing they read
          </Label>
          <Textarea
            value={data.finalMessage}
            onChange={(e) => onChange({ finalMessage: e.target.value })}
            placeholder="You mean more to me than you probably realize."
            rows={4}
            maxLength={240}
            autoFocus
          />
        </div>
        <div>
          <Label>Sign-off</Label>
          <Input
            value={data.finalSignoff}
            onChange={(e) => onChange({ finalSignoff: e.target.value })}
            placeholder="Made just for you."
            maxLength={60}
          />
        </div>
      </div>
    </div>
  );
}
