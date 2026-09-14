const steps = [
  {
    n: "01",
    title: "Create",
    body: "Pick a moment worth celebrating and start building something around it.",
  },
  {
    n: "02",
    title: "Customize",
    body: "Add your words, your photos, and a few small interactions along the way.",
  },
  {
    n: "03",
    title: "Send",
    body: "Get a private link. No app, no account needed on their end — just tap and open.",
  },
  {
    n: "04",
    title: "Watch them discover it",
    body: "They open a curious little screen and unfold the rest, one moment at a time.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
        <h2 className="font-display text-3xl text-ink sm:text-4xl">
          How it comes together
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.n} className="flex flex-col gap-3">
              <span className="font-display text-2xl text-accent">
                {step.n}
              </span>
              <h3 className="text-lg text-ink">{step.title}</h3>
              <p className="text-[15px] leading-relaxed text-ink-dim">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
