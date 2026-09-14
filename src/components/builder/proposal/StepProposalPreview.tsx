"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ProposalExperience } from "@/components/experience/proposal/ProposalExperience";
import { ProposalData } from "@/lib/types";

export function StepProposalPreview({
  data,
  onPublish,
  publishing,
  publishError,
}: {
  data: ProposalData;
  onPublish: () => void;
  publishing: boolean;
  publishError: string | null;
}) {
  const [key, setKey] = useState(0);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl text-ink sm:text-3xl">
            Preview
          </h2>
          <p className="mt-2 text-sm text-ink-dim">
            This is exactly what {data.recipientName || "they"} will see.
            Play through all 8 pages below.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setKey((k) => k + 1)}
          className="text-sm text-ink-faint underline decoration-line-strong underline-offset-4 hover:text-ink-dim"
        >
          Restart preview
        </button>
      </div>

      <div className="mt-8 overflow-hidden rounded-[2rem] border border-line-strong bg-bg shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
        <div className="mx-auto h-[640px] max-h-[75vh] w-full max-w-sm overflow-y-auto">
          <ProposalExperience key={key} data={data} />
        </div>
      </div>

      {publishError && (
        <p className="mt-4 text-sm text-accent-2">{publishError}</p>
      )}

      <Button
        onClick={onPublish}
        disabled={publishing}
        className="mt-8 w-full sm:w-auto"
      >
        {publishing ? "Publishing…" : "Publish proposal"}
      </Button>
    </div>
  );
}
