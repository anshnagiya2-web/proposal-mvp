"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { RecipientExperience } from "@/components/experience/RecipientExperience";
import { getSurprise } from "@/lib/storage";
import { SurpriseData } from "@/lib/types";

export default function RecipientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [status, setStatus] = useState<"loading" | "found" | "missing">(
    "loading"
  );
  const [surprise, setSurprise] = useState<SurpriseData | null>(null);

  useEffect(() => {
    let active = true;
    getSurprise(id).then((found) => {
      if (!active) return;
      if (found) {
        setSurprise(found);
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

  if (status === "missing" || !surprise) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-bg px-6 text-center">
        <p className="font-display text-2xl text-ink">
          This surprise isn&rsquo;t here anymore.
        </p>
        <p className="max-w-xs text-sm text-ink-dim">
          It may have been created in a different browser — this demo version
          stores surprises on the device that made them.
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

  return <RecipientExperience data={surprise} />;
}
