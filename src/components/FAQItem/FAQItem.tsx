import { useId, useState } from "react";
import useDarkMode from "../../hooks/useDarkMode";

type FAQItemProps = {
  question: string;
  answer: string;
};

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isDark = useDarkMode();
  const answerId = useId();

  return (
    <div
      className={`rounded-lg border transition-all duration-200`}
      style={{
        backgroundColor: isDark ? "#070E1B" : "#ffffff",
        borderColor: isOpen
          ? isDark
            ? "#4D94FF"
            : "#004E9F"
          : isDark
            ? "rgba(65, 71, 83, 0.3)"
            : "#e5e7eb",
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={answerId}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <h3
          className={`text-base font-semibold transition-colors`}
          style={{
            color: isOpen
              ? isDark
                ? "#4D94FF"
                : "#004E9F"
              : isDark
                ? "#ffffff"
                : "#0f172a",
          }}
        >
          {question}
        </h3>
        <svg
          className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 12 8"
          width="12"
          height="8"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            color: isOpen
              ? isDark
                ? "#4D94FF"
                : "#004E9F"
              : isDark
                ? "#C1C6D5"
                : undefined,
          }}
        >
          <path
            d="M6 7.4L0 1.4L1.4 0L6 4.6L10.6 0L12 1.4L6 7.4V7.4"
            fill="currentColor"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id={answerId}
          className="overflow-hidden animate-[slideDown_200ms_ease-out]"
          style={{
            borderTop: `1px solid ${isDark ? "#4D94FF" : "#e5e7eb"}`,
            backgroundColor: isDark ? "#070E1B" : "#ffffff",
          }}
        >
          <p
            className="px-6 py-5 text-sm leading-7"
            style={{ color: isDark ? "#C1C6D5" : undefined }}
          >
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}
