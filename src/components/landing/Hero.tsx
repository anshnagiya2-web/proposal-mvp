import { LinkButton } from "@/components/ui/Button";
import { PhoneDemo } from "./PhoneDemo";

export function Hero() {
  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-16 px-6 pb-20 pt-10 sm:px-10 sm:pt-16 lg:flex-row lg:items-center lg:gap-12 lg:pb-32 lg:pt-20">
      <div className="flex max-w-xl flex-col items-center text-center lg:items-start lg:text-left">
        <p className="text-sm text-ink-faint">A small interactive story, made by you</p>
        <h1 className="mt-5 font-display text-5xl leading-[1.05] text-ink text-balance sm:text-6xl lg:text-[4rem]">
          Make something they&rsquo;ll never forget.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-dim text-balance">
          Create an interactive surprise and send them a link they&rsquo;ll
          want to open.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <LinkButton href="/create">Create a surprise</LinkButton>
          <LinkButton href="#how-it-works" variant="secondary">
            See how it works
          </LinkButton>
        </div>
      </div>
      <div className="w-full lg:w-auto">
        <PhoneDemo />
      </div>
    </section>
  );
}
