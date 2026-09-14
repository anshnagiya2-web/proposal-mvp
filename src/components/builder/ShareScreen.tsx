"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function ShareScreen({
  id,
  recipientName,
  basePath = "/s",
  title = "Your surprise is ready",
  openLabel = "Open surprise",
}: {
  id: string;
  recipientName: string;
  basePath?: string;
  title?: string;
  openLabel?: string;
}) {
  const [copied, setCopied] = useState(false);
  const path = `${basePath}/${id}`;
  const [url, setUrl] = useState(path);

  if (typeof window !== "undefined" && url === path) {
    setUrl(`${window.location.origin}${path}`);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Someone made something for you",
          text: `Hey ${recipientName || ""}, someone made something for you.`,
          url,
        });
      } catch {
        // user cancelled — no-op
      }
    } else {
      copyLink();
    }
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-24 text-center sm:px-10">
      <div className="mb-6 text-4xl">❤️</div>
      <h1 className="font-display text-3xl text-ink text-balance sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-ink-dim">
        Send this to {recipientName || "them"} whenever you&rsquo;re ready.
      </p>

      <div className="mt-8 flex w-full items-center justify-between gap-3 rounded-xl border border-line-strong bg-surface px-4 py-3">
        <span className="truncate text-sm text-ink-dim">{url}</span>
        <button
          type="button"
          onClick={copyLink}
          className="shrink-0 text-sm text-accent-soft hover:text-accent"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>

      <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <Button onClick={share}>Share</Button>
        <Link
          href={path}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong bg-surface px-6 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-surface-2"
        >
          {openLabel}
        </Link>
      </div>

      <Link
        href="/create"
        className="mt-10 text-sm text-ink-faint underline decoration-line-strong underline-offset-4 hover:text-ink-dim"
      >
        Create another one
      </Link>
    </div>
  );
}
