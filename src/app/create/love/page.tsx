"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BuilderNav } from "@/components/builder/BuilderNav";
import { ShareScreen } from "@/components/builder/ShareScreen";
import { StepAboutThem } from "@/components/builder/StepAboutThem";
import { StepFinalReveal } from "@/components/builder/StepFinalReveal";
import { StepInteractions } from "@/components/builder/StepInteractions";
import { StepMemories } from "@/components/builder/StepMemories";
import { StepMessage } from "@/components/builder/StepMessage";
import { StepPreview } from "@/components/builder/StepPreview";
import { StepProgress } from "@/components/builder/StepProgress";
import {
  clearDraft,
  generateId,
  getDraft,
  saveDraft,
  saveSurprise,
} from "@/lib/storage";
import { createEmptySurprise, SurpriseData } from "@/lib/types";

const TOTAL_STEPS = 6;

function isStepValid(step: number, data: SurpriseData) {
  switch (step) {
    case 1:
      return data.recipientName.trim().length > 0 && data.senderName.trim().length > 0;
    case 2:
      return data.message.trim().length > 0;
    case 3:
      return data.memories.length >= 3;
    default:
      return true;
  }
}

export default function LoveBuilderPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<SurpriseData>(createEmptySurprise());
  const [hydrated, setHydrated] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [published, setPublished] = useState<SurpriseData | null>(null);

  useEffect(() => {
    const draft = getDraft();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage after mount
    if (draft) setData(draft);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveDraft(data);
  }, [data, hydrated]);

  function patch(p: Partial<SurpriseData>) {
    setData((d) => ({ ...d, ...p }));
  }

  async function publish() {
    setPublishing(true);
    setPublishError(null);
    try {
      const withId = { ...data, id: data.id || generateId() };
      const saved = await saveSurprise(withId);
      setPublished(saved);
      clearDraft();
    } catch (err) {
      setPublishError(
        err instanceof Error
          ? err.message
          : "Something went wrong publishing this surprise."
      );
    } finally {
      setPublishing(false);
    }
  }

  if (published) {
    return (
      <div className="min-h-full">
        <ShareScreen id={published.id} recipientName={published.recipientName} />
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-6 sm:px-10">
        <Link href="/" className="font-display text-lg text-ink">
          Unfold
        </Link>
        <Link href="/create" className="text-sm text-ink-dim hover:text-ink">
          Exit
        </Link>
      </header>

      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-4 sm:px-10">
        <StepProgress current={step} />

        <div className="mt-10">
          {step === 1 && <StepAboutThem data={data} onChange={patch} />}
          {step === 2 && <StepMessage data={data} onChange={patch} />}
          {step === 3 && <StepMemories data={data} onChange={patch} />}
          {step === 4 && <StepInteractions data={data} onChange={patch} />}
          {step === 5 && <StepFinalReveal data={data} onChange={patch} />}
          {step === 6 && (
            <StepPreview
              data={data}
              onPublish={publish}
              publishing={publishing}
              publishError={publishError}
            />
          )}
        </div>

        {step < 6 && (
          <BuilderNav
            hideBack={step === 1}
            onBack={() => setStep((s) => Math.max(1, s - 1))}
            onNext={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}
            nextDisabled={!isStepValid(step, data)}
            nextLabel={step === TOTAL_STEPS - 1 ? "Preview" : "Continue"}
          />
        )}
        {step === 6 && (
          <div className="mt-10 border-t border-line pt-6">
            <button
              type="button"
              onClick={() => setStep(5)}
              className="text-sm text-ink-dim hover:text-ink"
            >
              ← Back to edit
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
