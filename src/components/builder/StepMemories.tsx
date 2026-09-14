"use client";

import { ChangeEvent, useRef, useState } from "react";
import { fileToCompressedDataUrl } from "@/lib/image";
import { Memory, SurpriseData } from "@/lib/types";

const MAX_PHOTOS = 6;

export function StepMemories({
  data,
  onChange,
}: {
  data: SurpriseData;
  onChange: (patch: Partial<SurpriseData>) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const remaining = MAX_PHOTOS - data.memories.length;

  async function handleFiles(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).slice(0, remaining);
    e.target.value = "";
    if (files.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      const newMemories: Memory[] = [];
      for (const file of files) {
        if (!file.type.startsWith("image/")) continue;
        const image = await fileToCompressedDataUrl(file);
        newMemories.push({
          id: crypto.randomUUID(),
          image,
          caption: "",
        });
      }
      onChange({ memories: [...data.memories, ...newMemories] });
    } catch {
      setError("One of those images couldn't be added. Try another photo.");
    } finally {
      setBusy(false);
    }
  }

  function updateCaption(id: string, caption: string) {
    onChange({
      memories: data.memories.map((m) => (m.id === id ? { ...m, caption } : m)),
    });
  }

  function remove(id: string) {
    onChange({ memories: data.memories.filter((m) => m.id !== id) });
  }

  return (
    <div>
      <h2 className="font-display text-2xl text-ink sm:text-3xl">Memories</h2>
      <p className="mt-2 text-sm text-ink-dim">
        Add 3–6 photos. Each one gets revealed on its own, with a small
        caption if you&rsquo;d like.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {data.memories.map((m) => (
          <div
            key={m.id}
            className="group relative overflow-hidden rounded-xl border border-line-strong bg-surface"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={m.image}
              alt={m.caption || "Uploaded memory"}
              className="h-32 w-full object-cover"
            />
            <button
              type="button"
              onClick={() => remove(m.id)}
              aria-label="Remove photo"
              className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-bg/80 text-ink text-xs opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
            >
              ✕
            </button>
            <input
              value={m.caption}
              onChange={(e) => updateCaption(m.id, e.target.value)}
              placeholder="One of my favorite days with you."
              maxLength={90}
              className="w-full border-t border-line bg-transparent px-2.5 py-2 text-xs text-ink placeholder:text-ink-faint outline-none"
            />
          </div>
        ))}

        {remaining > 0 && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="flex h-32 flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-line-strong text-ink-faint transition-colors hover:border-accent/50 hover:text-ink-dim disabled:opacity-50"
          >
            <span className="text-xl">+</span>
            <span className="text-xs">{busy ? "Adding…" : "Add photo"}</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFiles}
      />

      <p className="mt-4 text-xs text-ink-faint">
        {data.memories.length}/{MAX_PHOTOS} added
        {data.memories.length < 3 ? " · add at least 3 to continue" : ""}
      </p>
      {error && <p className="mt-2 text-xs text-accent-2">{error}</p>}
    </div>
  );
}
