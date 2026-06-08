import type { CSSProperties } from "react";
import useDarkMode from "../../hooks/useDarkMode";
import { DARK_COLORS } from "../../utils/constants";

type ServiceCardProps = {
  title: string;
  description: string;
  icon: string;
  className?: string;
  iconWrapperClassName?: string;
  iconWrapperStyle?: CSSProperties;
  titleClassName?: string;
  descriptionClassName?: string;
  style?: CSSProperties;
};

export default function ServiceCard({
  title,
  description,
  icon,
  className = "",
  iconWrapperClassName = "h-12 w-12",
  iconWrapperStyle,
  titleClassName = "",
  descriptionClassName = "",
  style,
}: ServiceCardProps) {
  const isDark = useDarkMode();
  return (
    <div
      className={`rounded-2xl border p-6 shadow-sm transition-colors duration-200 ${className}`}
      style={{
        backgroundColor: isDark ? DARK_COLORS.card : "#F3F4F5",
        borderColor: isDark ? "rgba(65,71,83,0.3)" : "#C1C6D5",
        ...style,
      }}
    >
      <div
        className={`mb-5 inline-flex items-center justify-center rounded-2xl ${iconWrapperClassName} transition-colors duration-200`}
        style={{
          backgroundColor: isDark ? DARK_COLORS.surface : "#f3f4f6",
          ...iconWrapperStyle,
        }}
      >
        <img src={icon} alt={`${title} icon`} className="h-6 w-6" />
      </div>

      <h3
        className={`mb-3 text-xl font-semibold transition-colors duration-200 ${titleClassName}`}
        style={{
          color: isDark ? DARK_COLORS.heading : "#1f2937",
        }}
      >
        {title}
      </h3>
      <p
        className={`transition-colors duration-200 ${descriptionClassName}`}
        style={{
          color: isDark ? DARK_COLORS.paragraph : "#4b5563",
        }}
      >
        {description}
      </p>
    </div>
  );
}
