"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BuilderNav } from "@/components/builder/BuilderNav";
import { ShareScreen } from "@/components/builder/ShareScreen";
import { StepProgress } from "@/components/builder/StepProgress";
import { StepProposalPage1 } from "@/components/builder/proposal/StepProposalPage1";
import { StepProposalPage2 } from "@/components/builder/proposal/StepProposalPage2";
import { StepProposalPage3 } from "@/components/builder/proposal/StepProposalPage3";
import { StepProposalPage4 } from "@/components/builder/proposal/StepProposalPage4";
import { StepProposalPage5 } from "@/components/builder/proposal/StepProposalPage5";
import { StepProposalPage6 } from "@/components/builder/proposal/StepProposalPage6";
import { StepProposalPage7 } from "@/components/builder/proposal/StepProposalPage7";
import { StepProposalPage8 } from "@/components/builder/proposal/StepProposalPage8";
import { StepProposalPreview } from "@/components/builder/proposal/StepProposalPreview";
import {
  clearProposalDraft,
  generateId,
  getProposalDraft,
  saveProposal,
  saveProposalDraft,
} from "@/lib/storage";
import { createEmptyProposal, ProposalData } from "@/lib/types";

const STEP_LABELS = [
  "Page 1",
  "Page 2",
  "Page 3",
  "Page 4",
  "Page 5",
  "Page 6",
  "Page 7",
  "Page 8",
  "Preview",
];
const TOTAL_STEPS = STEP_LABELS.length;

function isStepValid(step: number, data: ProposalData) {
  if (step === 1) return data.recipientName.trim().length > 0;
  return true;
}

export default function ProposalBuilderPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ProposalData>(createEmptyProposal());
  const [hydrated, setHydrated] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [published, setPublished] = useState<ProposalData | null>(null);

  useEffect(() => {
    const draft = getProposalDraft();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage after mount
    if (draft) setData(draft);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveProposalDraft(data);
  }, [data, hydrated]);

  function patch(p: Partial<ProposalData>) {
    setData((d) => ({ ...d, ...p }));
  }

  async function publish() {
    setPublishing(true);
    setPublishError(null);
    try {
      const withId = { ...data, id: data.id || generateId() };
      const saved = await saveProposal(withId);
      setPublished(saved);
      clearProposalDraft();
    } catch (err) {
      setPublishError(
        err instanceof Error
          ? err.message
          : "Something went wrong publishing this proposal."
      );
    } finally {
      setPublishing(false);
    }
  }

  if (published) {
    return (
      <div className="min-h-full">
        <ShareScreen
          id={published.id}
          recipientName={published.recipientName}
          basePath="/p"
          title="Your proposal is ready"
          openLabel="Open proposal"
        />
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
        <StepProgress current={step} steps={STEP_LABELS} />

        <div className="mt-10">
          {step === 1 && <StepProposalPage1 data={data} onChange={patch} />}
          {step === 2 && <StepProposalPage2 data={data} onChange={patch} />}
          {step === 3 && <StepProposalPage3 data={data} onChange={patch} />}
          {step === 4 && <StepProposalPage4 data={data} onChange={patch} />}
          {step === 5 && <StepProposalPage5 data={data} onChange={patch} />}
          {step === 6 && <StepProposalPage6 data={data} onChange={patch} />}
          {step === 7 && <StepProposalPage7 data={data} onChange={patch} />}
          {step === 8 && <StepProposalPage8 data={data} onChange={patch} />}
          {step === 9 && (
            <StepProposalPreview
              data={data}
              onPublish={publish}
              publishing={publishing}
              publishError={publishError}
            />
          )}
        </div>

        {step < TOTAL_STEPS && (
          <BuilderNav
            hideBack={step === 1}
            onBack={() => setStep((s) => Math.max(1, s - 1))}
            onNext={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}
            nextDisabled={!isStepValid(step, data)}
            nextLabel={step === TOTAL_STEPS - 1 ? "Preview" : "Continue"}
          />
        )}
        {step === TOTAL_STEPS && (
          <div className="mt-10 border-t border-line pt-6">
            <button
              type="button"
              onClick={() => setStep(TOTAL_STEPS - 1)}
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
