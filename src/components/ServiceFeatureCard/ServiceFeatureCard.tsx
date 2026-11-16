import { buttonClassNames, DARK_COLORS } from "../../utils/constants";
import useDarkMode from "../../hooks/useDarkMode";
import { Link } from "react-router-dom";

function getServiceFeatureCardTheme(
  isDark: boolean,
  isPrimary: boolean,
  icon: string,
) {
  if (isPrimary) {
    return {
      container: {
        backgroundColor: isDark ? "#00458E" : "#004E9F",
        borderColor: "transparent",
      },
      title: { color: "white" },
      description: { color: "rgba(255,255,255,0.9)" },
      badgeClassName:
        "inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white",
      iconBackgroundColor: "rgba(255,255,255,0.15)",
      button: undefined,
    };
  }

  const isIdIcon = icon.endsWith("id.svg");

  return {
    container: {
      backgroundColor: isDark ? "#151C29" : "#ffffff",
      borderColor: isDark ? "rgba(65,71,83,0.3)" : "#e2e8f0",
    },
    title: { color: isDark ? DARK_COLORS.heading : "#1f2937" },
    description: { color: isDark ? DARK_COLORS.paragraph : "#374151" },
    badgeClassName:
      "inline-flex items-center gap-2 rounded-full bg-[#FCD400] px-3 py-1 text-xs font-semibold text-[#221B00] transition-colors duration-200",
    iconBackgroundColor: isIdIcon && isDark
      ? "rgba(77,148,255,0.1)"
      : isDark
        ? "#070E1B"
        : "#f3f4f6",
    button: {
      backgroundColor: isDark ? DARK_COLORS.primary : "#004E9F",
      color: "white",
    },
  };
}

export type ServiceFeatureCardProps = {
  icon: string;
  title: string;
  description: string;
  image?: string;
  badges?: string[];
  buttonText?: string;
  buttonHref?: string;
  variant?: "light" | "primary";
};

export default function ServiceFeatureCard({
  icon,
  title,
  description,
  image,
  badges = [],
  buttonText,
  buttonHref,
  variant = "light",
}: ServiceFeatureCardProps) {
  const isDark = useDarkMode();
  const isPrimary = variant === "primary";
  const theme = getServiceFeatureCardTheme(isDark, isPrimary, icon);

  const containerClass = `rounded-[32px] p-6 md:p-8 text-white h-full border transition-colors duration-200 ${
    isPrimary ? "text-white" : ""
  }`;

  const titleClass = "text-2xl font-semibold tracking-tight";
  const descClass = "mt-4 text-sm leading-7";

  return (
    <article className={containerClass} style={theme.container}>
      <div
        className={`grid grid-cols-1 items-start gap-6 ${image ? "md:grid-cols-[1.4fr_0.95fr]" : ""}`}
      >
        <div className="flex flex-col justify-between gap-6 h-full">
          <div className="space-y-5">
            <div className="space-y-4">
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-200`}
                style={{
                  backgroundColor: theme.iconBackgroundColor,
                }}
              >
                <img
                  src={icon}
                  alt={`${title} icon`}
                  className="h-6 w-6 object-contain"
                />
              </div>
              <div>
                <h3 className={titleClass} style={theme.title}>
                  {title}
                </h3>
              </div>
            </div>

            <p className={descClass} style={theme.description}>
              {description}
            </p>

            {badges.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {badges.map((b) => (
                  <span key={b} className={theme.badgeClassName}>
                    {b}
                  </span>
                ))}
              </div>
            )}
          </div>

          {buttonText && buttonHref && (
            <div>
              <Link
                to={buttonHref}
                className={`${buttonClassNames.basePill} transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  isPrimary ? "bg-white text-blue-900" : ""
                }`}
                style={theme.button}
              >
                {buttonText}
              </Link>
            </div>
          )}
        </div>

        {image ? (
          <div className="hidden md:block">
            <div
              className="overflow-hidden rounded-[28px] shadow-sm transition-colors duration-200"
              style={{
                backgroundColor: isDark ? "#070E1B" : "#f3f4f6",
              }}
            >
              <img
                src={image}
                alt={title}
                className="h-[220px] w-full object-cover"
              />
            </div>
          </div>
        ) : (
          <div className="hidden md:block" />
        )}
      </div>
    </article>
  );
}
