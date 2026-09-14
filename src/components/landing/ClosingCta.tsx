import { LinkButton } from "@/components/ui/Button";

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div className="grain absolute inset-0 -z-10 bg-gradient-to-b from-bg via-bg-soft to-bg" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-2/10 blur-[100px]" />
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-24 text-center sm:px-10 sm:py-32">
        <h2 className="font-display text-3xl text-ink text-balance sm:text-4xl">
          Someone in your life is waiting to feel this.
        </h2>
        <p className="mt-4 max-w-md text-ink-dim">
          It takes about ten minutes to build. It takes them a lifetime to
          forget.
        </p>
        <div className="mt-8">
          <LinkButton href="/create">Create a surprise</LinkButton>
        </div>
      </div>
    </section>
  );
}
