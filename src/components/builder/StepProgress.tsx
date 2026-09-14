export const BUILDER_STEPS = [
  "About them",
  "Your message",
  "Memories",
  "Interactions",
  "Final reveal",
  "Preview",
];

export function StepProgress({
  current,
  steps = BUILDER_STEPS,
}: {
  current: number;
  steps?: string[];
}) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-1.5 sm:gap-2">
        {steps.map((label, i) => {
          const step = i + 1;
          const state =
            step === current ? "current" : step < current ? "done" : "todo";
          return (
            <div key={label} className="flex flex-1 flex-col gap-2">
              <div
                className={`h-1 rounded-full transition-colors ${
                  state === "todo" ? "bg-line-strong" : "bg-accent"
                }`}
              />
              <span
                className={`hidden truncate text-xs sm:block ${
                  state === "current"
                    ? "text-ink"
                    : state === "done"
                      ? "text-ink-dim"
                      : "text-ink-faint"
                }`}
              >
                {String(step).padStart(2, "0")} · {label}
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-ink-faint sm:hidden">
        Step {current} of {steps.length} · {steps[current - 1]}
      </p>
    </div>
  );
}

