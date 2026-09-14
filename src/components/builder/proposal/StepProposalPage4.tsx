import { Label, Textarea } from "@/components/ui/Field";
import { ProposalData } from "@/lib/types";
import { MediaUploader } from "./MediaUploader";

export function StepProposalPage4({
  data,
  onChange,
}: {
  data: ProposalData;
  onChange: (patch: Partial<ProposalData>) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl text-ink sm:text-3xl">
        Page 4 · The beginning
      </h2>
      <p className="mt-2 text-sm text-ink-dim">
        Where the story starts. Add up to 3 photos or videos.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        <div>
          <Label>Text</Label>
          <Textarea
            value={data.page4.text}
            onChange={(e) =>
              onChange({ page4: { ...data.page4, text: e.target.value } })
            }
            rows={3}
            maxLength={300}
          />
        </div>
        <div>
          <Label>Photos / videos</Label>
          <MediaUploader
            media={data.page4.media}
            max={3}
            onChange={(media) => onChange({ page4: { ...data.page4, media } })}
          />
        </div>
      </div>
    </div>
  );
}
