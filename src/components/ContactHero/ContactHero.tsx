import { DARK_COLORS } from "../../utils/constants";
import useDarkMode from "../../hooks/useDarkMode";

export default function ContactHero() {
  const isDark = useDarkMode();

  return (
    <section
      className="px-6 mb-6 py-12 sm:px-8 lg:px-12 transition-colors duration-200"
      style={{
        backgroundColor: isDark ? "transparent" : "#f9fafb",
      }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <span
          className={`inline-flex rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] transition-colors duration-200`}
          style={{
            borderColor: isDark ? `${DARK_COLORS.primary}20` : "#0066CC20",
            backgroundColor: isDark ? `${DARK_COLORS.primary}10` : "#0066CC10",
            color: isDark ? DARK_COLORS.primary : "#0066CC",
          }}
        >
          Support & Inquiries
        </span>

        <h1
          className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl transition-colors duration-200"
          style={{ color: isDark ? DARK_COLORS.heading : "#0a0f1d" }}
        >
          Contact and Common Questions
        </h1>

        <p
          className="mx-auto mt-6 max-w-2xl text-base leading-8 transition-colors duration-200"
          style={{ color: isDark ? DARK_COLORS.paragraph : "#4b5563" }}
        >
          Find the barangay&apos;s contact information and emergency hotlines,
          and review answers to common questions about this website.
        </p>
      </div>
    </section>
  );
}
