export function Screen({
  children,
  align = "center",
}: {
  children: React.ReactNode;
  align?: "center" | "end";
}) {
  return (
    <div
      className={`flex flex-1 flex-col items-center px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[max(3.5rem,env(safe-area-inset-top))] text-center sm:px-10 ${
        align === "center" ? "justify-center" : "justify-end"
      }`}
    >
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
