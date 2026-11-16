import { useEffect, useRef } from "react";
import useDarkMode from "../../hooks/useDarkMode";
import { DARK_COLORS } from "../../utils/constants";

export type OfficialDetails = {
  image: string;
  name: string;
  position: string;
  objectPosition?: string;
  committees?: string[];
  committeeHeading?: string;
};

type OfficialDetailsModalProps = {
  official: OfficialDetails | null;
  onClose: () => void;
};

export default function OfficialDetailsModal({
  official,
  onClose,
}: OfficialDetailsModalProps) {
  const isDark = useDarkMode();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!official || !dialog) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    dialog.showModal();
    closeButtonRef.current?.focus();
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (dialog.open) {
        dialog.close();
      }
    };
  }, [official, onClose]);

  if (!official) {
    return null;
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="official-dialog-title"
      aria-describedby="official-dialog-position"
      className="fixed inset-0 m-0 h-dvh w-screen max-h-none max-w-none overflow-y-auto border-0 bg-transparent p-4 backdrop:bg-black/60 sm:p-6"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (!contentRef.current?.contains(event.target as Node)) {
          onClose();
        }
      }}
    >
      <div className="flex min-h-full items-center justify-center">
        <div
          ref={contentRef}
          className="relative my-auto grid max-h-[calc(100dvh-2rem)] w-full max-w-3xl overflow-hidden rounded-[24px] border shadow-2xl md:grid-cols-[minmax(240px,0.85fr)_1.15fr] sm:max-h-[calc(100dvh-3rem)]"
          style={{
            backgroundColor: isDark ? DARK_COLORS.card : "#ffffff",
            borderColor: isDark ? DARK_COLORS.cardBorder : "#e2e8f0",
          }}
        >
          <div
            className="flex max-h-[38dvh] items-center justify-center overflow-hidden md:max-h-none md:min-h-[480px]"
            style={{
              backgroundColor: isDark ? DARK_COLORS.surface : "#f3f4f6",
            }}
          >
            <img
              src={official.image}
              alt={`${official.name}, ${official.position}`}
              className="max-h-[38dvh] w-full object-contain md:max-h-[80dvh] md:h-full"
              style={{ objectPosition: official.objectPosition ?? "center" }}
            />
          </div>

          <div className="overflow-y-auto p-6 sm:p-8">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close official details"
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-2xl leading-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004E9F]"
              style={{
                backgroundColor: isDark ? DARK_COLORS.surface : "#f1f5f9",
                color: isDark ? DARK_COLORS.heading : "#1f2937",
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>

            <p
              id="official-dialog-position"
              className="pr-10 text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: isDark ? DARK_COLORS.primary : "#004E9F" }}
            >
              {official.position}
            </p>
            <h2
              id="official-dialog-title"
              className="mt-3 pr-8 text-2xl font-semibold leading-snug sm:text-3xl"
              style={{ color: isDark ? DARK_COLORS.heading : "#1f2937" }}
            >
              {official.name}
            </h2>

            <div
              className="mt-7 border-t pt-6"
              style={{ borderColor: isDark ? DARK_COLORS.cardBorder : "#e2e8f0" }}
            >
              <h3
                className="text-sm font-semibold uppercase tracking-wide"
                style={{ color: isDark ? DARK_COLORS.heading : "#334155" }}
              >
                {official.committeeHeading ?? "Committee assignments"}
              </h3>
              {official.committees && official.committees.length > 0 ? (
                <ul
                  className="mt-4 space-y-3"
                  style={{ color: isDark ? DARK_COLORS.paragraph : "#475569" }}
                >
                  {official.committees.map((committee) => (
                    <li key={committee} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-2 w-2 flex-none rounded-full bg-[#FCD400]"
                      />
                      <span className="text-sm leading-6 sm:text-base">
                        {committee}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p
                  className="mt-4 text-sm leading-6"
                  style={{ color: isDark ? DARK_COLORS.paragraph : "#475569" }}
                >
                  No committee assignments were provided.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
