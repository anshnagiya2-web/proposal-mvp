"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Field";
import { migrateLocalProposal } from "@/lib/storage";

type Status =
  | { kind: "idle" }
  | { kind: "working" }
  | { kind: "done"; id: string }
  | { kind: "error"; message: string };

export default function MigratePage() {
  const [id, setId] = useState("glow-2gfn");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function run() {
    setStatus({ kind: "working" });
    try {
      const saved = await migrateLocalProposal(id.trim());
      setStatus({ kind: "done", id: saved.id });
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  }

  return (
    <div className="mx-auto flex min-h-full max-w-lg flex-col px-6 py-16 sm:px-10">
      <Link href="/" className="font-display text-lg text-ink">
        Unfold
      </Link>

      <h1 className="mt-8 font-display text-2xl text-ink sm:text-3xl">
        Migrate a local proposal
      </h1>
      <p className="mt-3 text-sm text-ink-dim">
        One-time tool: moves a proposal that was published before Supabase
        was connected — and so only exists in this browser&rsquo;s storage —
        online, under the same id. Only run this on the device/browser that
        originally created the proposal. The local copy is kept until the
        online save succeeds.
      </p>

      <div className="mt-8">
        <Label>Proposal id</Label>
        <Input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="glow-2gfn"
        />
      </div>

      <Button
        onClick={run}
        disabled={status.kind === "working" || !id.trim()}
        className="mt-6 self-start"
      >
        {status.kind === "working" ? "Migrating…" : "Migrate to Supabase"}
      </Button>

      {status.kind === "done" && (
        <div className="mt-6 rounded-xl border border-line-strong bg-surface p-4 text-sm text-ink-dim">
          Done — this proposal is now online.{" "}
          <Link href={`/p/${status.id}`} className="text-accent-soft hover:text-accent">
            Open /p/{status.id} →
          </Link>
        </div>
      )}

      {status.kind === "error" && (
        <p className="mt-6 text-sm text-accent-2">{status.message}</p>
      )}
    </div>
  );
}
