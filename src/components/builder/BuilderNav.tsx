import { Button } from "@/components/ui/Button";

export function BuilderNav({
  onBack,
  onNext,
  nextLabel = "Continue",
  nextDisabled,
  backLabel = "Back",
  hideBack,
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  backLabel?: string;
  hideBack?: boolean;
}) {
  return (
    <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
      {!hideBack ? (
        <Button type="button" variant="ghost" onClick={onBack}>
          ← {backLabel}
        </Button>
      ) : (
        <span />
      )}
      <Button type="button" onClick={onNext} disabled={nextDisabled}>
        {nextLabel}
      </Button>
    </div>
  );
}
