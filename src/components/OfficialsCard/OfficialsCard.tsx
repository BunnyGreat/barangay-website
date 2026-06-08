import { DARK_COLORS } from "../../utils/constants";
import useDarkMode from "../../hooks/useDarkMode";

type OfficialCardProps = {
  image: string;
  position: string;
  name: string;
};

export default function OfficialCard({
  image,
  position,
  name,
}: OfficialCardProps) {
  const isDark = useDarkMode();

  return (
    <div
      className="overflow-hidden rounded-[30px] border shadow-sm transition-colors duration-200"
      style={{
        backgroundColor: isDark ? DARK_COLORS.card : "#ffffff",
        borderColor: isDark ? DARK_COLORS.cardBorder : "#e2e8f0",
      }}
    >
      <div
        className="overflow-hidden rounded-t-[30px] transition-colors duration-200"
        style={{
          backgroundColor: isDark ? DARK_COLORS.surface : "#f3f4f6",
        }}
      >
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-72 w-full object-cover"
        />
      </div>

      <div
        className="border-t px-6 py-5 text-center transition-colors duration-200"
        style={{
          borderColor: isDark ? DARK_COLORS.cardBorder : "#e2e8f0",
        }}
      >
        <p
          className={`text-xs font-semibold uppercase tracking-[0.35em] transition-colors duration-200`}
          style={{ color: isDark ? DARK_COLORS.primary : "#004E9F" }}
        >
          {position}
        </p>

        <h3
          className="mt-3 text-base font-semibold transition-colors duration-200"
          style={{ color: isDark ? DARK_COLORS.heading : "#1f2937" }}
        >
          {name}
        </h3>
      </div>
    </div>
  );
}
