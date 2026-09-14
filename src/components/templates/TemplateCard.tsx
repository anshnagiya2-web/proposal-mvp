import Link from "next/link";

export type Template = {
  slug: string;
  emoji: string;
  name: string;
  description: string;
  available: boolean;
  href: string;
};

export function TemplateCard({ template }: { template: Template }) {
  const inner = (
    <div
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-colors ${
        template.available
          ? "border-line-strong bg-surface hover:border-accent/50"
          : "border-line bg-surface/50"
      }`}
    >
      <div>
        <span className="text-3xl">{template.emoji}</span>
        <h3 className="mt-4 font-display text-xl text-ink">
          {template.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-dim">
          {template.description}
        </p>
      </div>
      <div className="mt-6">
        {template.available ? (
          <span className="inline-flex items-center gap-1.5 text-sm text-accent-soft">
            Start building
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            >
              ›
            </span>
          </span>
        ) : (
          <span className="inline-flex rounded-full border border-line px-3 py-1 text-xs text-ink-faint">
            Coming soon
          </span>
        )}
      </div>
    </div>
  );

  if (!template.available) {
    return (
      <div aria-disabled className="cursor-default opacity-70">
        {inner}
      </div>
    );
  }

  return (
    <Link href={template.href} className="block h-full">
      {inner}
    </Link>
  );
}
