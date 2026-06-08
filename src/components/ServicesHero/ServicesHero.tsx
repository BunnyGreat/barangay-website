import { textClassNames, DARK_COLORS } from "../../utils/constants";
import useDarkMode from "../../hooks/useDarkMode";

export default function ServicesHero() {
  const isDark = useDarkMode();
  return (
    <section
      className="px-6 py-16 sm:px-8 lg:px-12"
      style={{ backgroundColor: isDark ? "transparent" : "#ffffff" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <h1
            className={`text-sm font-semibold uppercase tracking-[0.24em] ${textClassNames.primaryBlue}`}
            style={{ color: isDark ? DARK_COLORS.primary : undefined }}
          >
            Empowering Our Community Through Digital Efficiency
          </h1>

          <p
            className="mt-6 text-base leading-7"
            style={{ color: isDark ? DARK_COLORS.paragraph : "#4b5563" }}
          >
            Access essential barangay services, track applications, and stay
            informed—all in one unified platform designed for the modern San
            Isidro resident.
          </p>
        </div>
      </div>
    </section>
  );
}
