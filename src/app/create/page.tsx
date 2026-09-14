import Link from "next/link";
import { Template, TemplateCard } from "@/components/templates/TemplateCard";

const templates: Template[] = [
  {
    slug: "love",
    emoji: "❤️",
    name: "Just For You",
    description: "A little journey made for someone special.",
    available: true,
    href: "/create/love",
  },
  {
    slug: "birthday",
    emoji: "🎂",
    name: "Birthday",
    description: "A countdown of memories for their day.",
    available: false,
    href: "#",
  },
  {
    slug: "anniversary",
    emoji: "💕",
    name: "Anniversary",
    description: "Look back on the road you've traveled together.",
    available: false,
    href: "#",
  },
  {
    slug: "proposal",
    emoji: "💍",
    name: "Proposal",
    description: "Build up to the question, one screen at a time.",
    available: true,
    href: "/create/proposal",
  },
  {
    slug: "sorry",
    emoji: "🥺",
    name: "I'm Sorry",
    description: "Say it in a way that's hard to scroll past.",
    available: false,
    href: "#",
  },
  {
    slug: "friendship",
    emoji: "👫",
    name: "Friendship",
    description: "For the people who've stuck around.",
    available: false,
    href: "#",
  },
  {
    slug: "congrats",
    emoji: "🎉",
    name: "Congratulations",
    description: "Celebrate a big win with a small ceremony.",
    available: false,
    href: "#",
  },
];

export default function CreatePage() {
  return (
    <div className="min-h-full">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
        <Link href="/" className="font-display text-lg text-ink">
          Unfold
        </Link>
        <Link href="/" className="text-sm text-ink-dim hover:text-ink">
          Back home
        </Link>
      </header>
      <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-6 sm:px-10">
        <p className="text-sm text-ink-faint">Step one</p>
        <h1 className="mt-3 font-display text-4xl text-ink text-balance sm:text-5xl">
          What are you making?
        </h1>
        <p className="mt-4 max-w-lg text-ink-dim">
          Choose the shape of the surprise. Just For You and Proposal are
          ready to build right now — the rest are on their way.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <TemplateCard key={t.slug} template={t} />
          ))}
        </div>
      </main>
    </div>
  );
}
