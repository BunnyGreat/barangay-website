import { useState } from "react";
import chevronDownIcon from "../../assets/icons/chevron-down.svg";

type FAQItemProps = {
  question: string;
  answer: string;
};

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`rounded-lg border transition-all duration-200 ${
        isOpen
          ? "border-[#004E9F] bg-white"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <h3
          className={`text-base font-semibold transition-colors ${
            isOpen ? "text-[#004E9F]" : "text-slate-900"
          }`}
        >
          {question}
        </h3>
        <img
          src={chevronDownIcon}
          alt="Expand"
          className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[#004E9F]" : "text-slate-600"
          }`}
        />
      </button>

      {isOpen && (
        <div className="overflow-hidden animate-[slideDown_200ms_ease-out] border-t border-slate-200">
          <p className="px-6 py-5 text-sm leading-7 text-slate-600">{answer}</p>
        </div>
      )}
    </div>
  );
}
