"use client";

import { Input, Label, Textarea } from "@/components/ui/Field";
import { SurpriseData } from "@/lib/types";

function BlockShell({
  emoji,
  title,
  enabled,
  onToggle,
  children,
}: {
  emoji: string;
  title: string;
  enabled: boolean;
  onToggle: (v: boolean) => void;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 transition-colors ${
        enabled ? "border-line-strong bg-surface" : "border-line bg-surface/40"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-lg">{emoji}</span>
          <span className="text-[15px] text-ink">{title}</span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={() => onToggle(!enabled)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
            enabled ? "bg-accent" : "bg-surface-2"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-bg transition-transform ${
              enabled ? "translate-x-[22px]" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>
      {enabled && children && <div className="mt-4">{children}</div>}
    </div>
  );
}

export function StepInteractions({
  data,
  onChange,
}: {
  data: SurpriseData;
  onChange: (patch: Partial<SurpriseData>) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl text-ink sm:text-3xl">
        Interactions
      </h2>
      <p className="mt-2 text-sm text-ink-dim">
        Small moments that make them play along instead of just reading.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        <BlockShell
          emoji="🤔"
          title="Guessing game"
          enabled={data.guess.enabled}
          onToggle={(v) => onChange({ guess: { ...data.guess, enabled: v } })}
        >
          <div className="flex flex-col gap-3">
            <Input
              value={data.guess.prompt}
              onChange={(e) =>
                onChange({ guess: { ...data.guess, prompt: e.target.value } })
              }
              placeholder="What's your guess?"
            />
            <div className="flex flex-col gap-2">
              {data.guess.options.map((opt, i) => (
                <Input
                  key={i}
                  value={opt}
                  onChange={(e) => {
                    const options = [...data.guess.options];
                    options[i] = e.target.value;
                    onChange({ guess: { ...data.guess, options } });
                  }}
                  placeholder={`Option ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </BlockShell>

        <BlockShell
          emoji="💗"
          title="Tap interaction"
          enabled={data.tap.enabled}
          onToggle={(v) => onChange({ tap: { ...data.tap, enabled: v } })}
        >
          <div className="flex flex-col gap-3">
            <Input
              value={data.tap.prompt}
              onChange={(e) =>
                onChange({ tap: { ...data.tap, prompt: e.target.value } })
              }
              placeholder="Tap the heart 5 times."
            />
            <div>
              <Label>Taps required</Label>
              <input
                type="range"
                min={3}
                max={10}
                value={data.tap.taps}
                onChange={(e) =>
                  onChange({
                    tap: { ...data.tap, taps: Number(e.target.value) },
                  })
                }
                className="w-full accent-[var(--accent)]"
              />
              <span className="text-xs text-ink-faint">{data.tap.taps} taps</span>
            </div>
          </div>
        </BlockShell>

        <BlockShell
          emoji="🔒"
          title="Hidden message"
          enabled={data.hidden.enabled}
          onToggle={(v) => onChange({ hidden: { ...data.hidden, enabled: v } })}
        >
          <div className="flex flex-col gap-3">
            <Input
              value={data.hidden.prompt}
              onChange={(e) =>
                onChange({ hidden: { ...data.hidden, prompt: e.target.value } })
              }
              placeholder="There's one thing I haven't said yet."
            />
            <Textarea
              value={data.hidden.message}
              onChange={(e) =>
                onChange({
                  hidden: { ...data.hidden, message: e.target.value },
                })
              }
              placeholder="There's something I haven't told you..."
              rows={3}
              maxLength={300}
            />
          </div>
        </BlockShell>

        <div className="flex items-center justify-between rounded-2xl border border-line bg-surface/30 p-5 text-ink-faint">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">🖼️</span>
            <span className="text-sm">
              Memory reveal — using your photos from step 3
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-line bg-surface/30 p-5 text-ink-faint">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">✨</span>
            <span className="text-sm">
              Final reveal — set up next, in step 5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
