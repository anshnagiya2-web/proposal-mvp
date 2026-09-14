import { Label, Textarea } from "@/components/ui/Field";
import { SurpriseData } from "@/lib/types";

export function StepMessage({
  data,
  onChange,
}: {
  data: SurpriseData;
  onChange: (patch: Partial<SurpriseData>) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl text-ink sm:text-3xl">
        Your message
      </h2>
      <p className="mt-2 text-sm text-ink-dim">
        This is the heart of it. Write like you&rsquo;re talking to them, not
        writing a card.
      </p>
      <div className="mt-8">
        <Label hint={`${data.message.length}/600`}>
          Start writing something from the heart...
        </Label>
        <Textarea
          value={data.message}
          onChange={(e) => onChange({ message: e.target.value })}
          placeholder="There's something I've been wanting to tell you..."
          rows={8}
          maxLength={600}
          autoFocus
        />
      </div>
    </div>
  );
}
