import { DARK_COLORS } from "../../utils/constants";
import useDarkMode from "../../hooks/useDarkMode";

type OfficialCardProps = {
  image: string;
  position: string;
  name: string;
  objectPosition?: string;
  onClick?: () => void;
};

export default function OfficialCard({
  image,
  position,
  name,
  objectPosition = "center",
  onClick,
}: OfficialCardProps) {
  const isDark = useDarkMode();

  const cardContent = (
    <>
      <div
        className="overflow-hidden rounded-t-[30px] transition-colors duration-200"
        style={{
          backgroundColor: isDark ? DARK_COLORS.surface : "#f3f4f6",
        }}
      >
        <img
          src={image}
          alt={`${name}, ${position}`}
          loading="lazy"
          className="h-72 w-full object-cover"
          style={{ objectPosition }}
        />
      </div>

      <div
        className="border-t px-6 py-5 text-center transition-colors duration-200"
        style={{
          borderColor: isDark ? DARK_COLORS.cardBorder : "#e2e8f0",
        }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-[0.35em] transition-colors duration-200"
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
    </>
  );

  return (
    <div
      className="overflow-hidden rounded-[30px] border shadow-sm transition-colors duration-200"
      style={{
        backgroundColor: isDark ? DARK_COLORS.card : "#ffffff",
        borderColor: isDark ? DARK_COLORS.cardBorder : "#e2e8f0",
      }}
    >
      {onClick ? (
        <button
          type="button"
          className="block w-full text-center focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#004E9F]"
          aria-haspopup="dialog"
          aria-label={`View details for ${name}, ${position}`}
          onClick={onClick}
        >
          {cardContent}
        </button>
      ) : (
        cardContent
      )}
    </div>
  );
}
