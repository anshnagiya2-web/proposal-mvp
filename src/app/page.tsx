import { ClosingCta } from "@/components/landing/ClosingCta";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { NavBar } from "@/components/landing/NavBar";

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-col overflow-x-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(231,166,103,0.08),transparent_60%)]" />
      <NavBar />
      <Hero />
      <HowItWorks />
      <ClosingCta />
      <footer className="border-t border-line px-6 py-8 text-center text-xs text-ink-faint sm:px-10">
        Unfold — made for the moments worth pausing for.
      </footer>
    </div>
  );
}
