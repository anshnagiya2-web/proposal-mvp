"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { ProposalExperience } from "@/components/experience/proposal/ProposalExperience";
import { getProposal } from "@/lib/storage";
import { ProposalData } from "@/lib/types";

export default function ProposalRecipientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [status, setStatus] = useState<"loading" | "found" | "missing">(
    "loading"
  );
  const [proposal, setProposal] = useState<ProposalData | null>(null);

  useEffect(() => {
    let active = true;
    getProposal(id).then((found) => {
      if (!active) return;
      if (found) {
        setProposal(found);
        setStatus("found");
      } else {
        setStatus("missing");
      }
    });
    return () => {
      active = false;
    };
  }, [id]);

  if (status === "loading") {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-bg">
        <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
      </div>
    );
  }

  if (status === "missing" || !proposal) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-bg px-6 text-center">
        <p className="font-display text-2xl text-ink">
          This proposal isn&rsquo;t here anymore.
        </p>
        <p className="max-w-xs text-sm text-ink-dim">
          It may have been created in a different browser — this demo version
          stores proposals on the device that made them.
        </p>
        <Link
          href="/create"
          className="mt-2 text-sm text-accent-soft hover:text-accent"
        >
          Make your own →
        </Link>
      </div>
    );
  }

  return <ProposalExperience data={proposal} />;
}
