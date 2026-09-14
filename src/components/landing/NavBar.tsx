import Link from "next/link";

export function NavBar() {
  return (
    <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
      <Link
        href="/"
        className="font-display text-lg tracking-tight text-ink"
      >
        Unfold
      </Link>
      <Link
        href="/create"
        className="rounded-full border border-line-strong px-4 py-2 text-sm text-ink-dim transition-colors hover:text-ink hover:border-ink-faint"
      >
        Create a surprise
      </Link>
    </header>
  );
}
