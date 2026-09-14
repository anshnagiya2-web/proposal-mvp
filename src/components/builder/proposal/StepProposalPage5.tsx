import { Label, Textarea } from "@/components/ui/Field";
import { ProposalData } from "@/lib/types";
import { MediaUploader } from "./MediaUploader";

export function StepProposalPage5({
  data,
  onChange,
}: {
  data: ProposalData;
  onChange: (patch: Partial<ProposalData>) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl text-ink sm:text-3xl">
        Page 5 · The moments
      </h2>
      <p className="mt-2 text-sm text-ink-dim">
        The heart of the memory reel. Add up to 5 photos or videos.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        <div>
          <Label>Text</Label>
          <Textarea
            value={data.page5.text}
            onChange={(e) =>
              onChange({ page5: { ...data.page5, text: e.target.value } })
            }
            rows={4}
            maxLength={400}
          />
        </div>
        <div>
          <Label>Photos / videos</Label>
          <MediaUploader
            media={data.page5.media}
            max={5}
            onChange={(media) => onChange({ page5: { ...data.page5, media } })}
          />
        </div>
      </div>
    </div>
  );
}
