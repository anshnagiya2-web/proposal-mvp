"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { fileToMediaItem } from "@/lib/media";
import { MediaItem } from "@/lib/types";

export function MediaUploader({
  media,
  max,
  onChange,
}: {
  media: MediaItem[];
  max: number;
  onChange: (media: MediaItem[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const dragIndex = useRef<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const remaining = max - media.length;

  async function handleFiles(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).slice(0, remaining);
    e.target.value = "";
    if (files.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      const added: MediaItem[] = [];
      for (const file of files) {
        added.push(await fileToMediaItem(file));
      }
      onChange([...media, ...added]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "One of those files couldn't be added."
      );
    } finally {
      setBusy(false);
    }
  }

  function remove(id: string) {
    onChange(media.filter((m) => m.id !== id));
  }

  function onDragStart(i: number) {
    dragIndex.current = i;
  }

  function onDragOver(e: DragEvent, i: number) {
    e.preventDefault();
    setOverIndex(i);
  }

  function onDrop(i: number) {
    const from = dragIndex.current;
    dragIndex.current = null;
    setOverIndex(null);
    if (from === null || from === i) return;
    const next = [...media];
    const [moved] = next.splice(from, 1);
    next.splice(i, 0, moved);
    onChange(next);
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {media.map((item, i) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => onDragStart(i)}
            onDragOver={(e) => onDragOver(e, i)}
            onDrop={() => onDrop(i)}
            className={`group relative cursor-grab overflow-hidden rounded-xl border bg-surface active:cursor-grabbing ${
              overIndex === i ? "border-accent" : "border-line-strong"
            }`}
          >
            {item.type === "video" ? (
              <video src={item.src} className="h-32 w-full object-cover" muted />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.src} alt="" className="h-32 w-full object-cover" />
            )}
            <span className="pointer-events-none absolute left-1.5 top-1.5 rounded-full bg-bg/80 px-2 py-0.5 text-[10px] text-ink-dim">
              {i + 1}
            </span>
            <button
              type="button"
              onClick={() => remove(item.id)}
              aria-label="Remove media"
              className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-bg/80 text-ink text-xs opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
            >
              ✕
            </button>
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
            <span className="text-xs">{busy ? "Adding…" : "Add photo/video"}</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={handleFiles}
      />

      <p className="mt-3 text-xs text-ink-faint">
        {media.length}/{max} added
        {media.length > 1 ? " · drag to reorder" : ""}
      </p>
      {error && <p className="mt-2 text-xs text-accent-2">{error}</p>}
    </div>
  );
}
