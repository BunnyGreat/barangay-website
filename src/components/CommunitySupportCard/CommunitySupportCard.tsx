import { DARK_COLORS } from "../../utils/constants";
import useDarkMode from "../../hooks/useDarkMode";
import shieldIcon from "../../assets/icons/shieldheart.svg";
import warningIcon from "../../assets/icons/warning.svg";
import peopleIcon from "../../assets/icons/community.svg";
import heartIcon from "../../assets/icons/shield-2.svg";
import shieldIconDark from "../../assets/icons/shieldheart-dark.svg";
import warningIconDark from "../../assets/icons/warning-dark.svg";
import peopleIconDark from "../../assets/icons/community-dark.svg";

type SupportFeature = {
  icon: string;
  label: string;
};

const supportFeatures: SupportFeature[] = [
  {
    icon: warningIcon,
    label: "Disaster Readiness",
  },
  {
    icon: peopleIcon,
    label: "Community Mediation",
  },
  {
    icon: heartIcon,
    label: "Health & Rescue Ops",
  },
];

export default function CommunitySupportCard() {
  const isDark = useDarkMode();

  const getIcon = (lightIcon: string, darkIcon: string) => {
    return isDark ? darkIcon : lightIcon;
  };

  return (
    <div
      className="rounded-2xl border p-8 shadow-sm transition-colors duration-200"
      style={{
        backgroundColor: isDark ? "#151C29" : "#ffffff",
        borderColor: isDark ? "rgba(65,71,83,0.3)" : "#e2e8f0",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200"
          style={{ color: isDark ? "#4D94FF" : "#4D94FF" }}
        >
          <img
            src={isDark ? shieldIconDark : shieldIcon}
            alt="Shield icon"
            className="h-6 w-6"
          />
        </div>
        <h3
          className="text-2xl font-semibold transition-colors duration-200"
          style={{ color: isDark ? "#ffffff" : "#4D94FF" }}
        >
          Public Safety & Community Support
        </h3>
      </div>

      <p
        className="mt-4 text-sm leading-7 transition-colors duration-200"
        style={{ color: isDark ? DARK_COLORS.paragraph : "#4b5563" }}
      >
        Barangay San Isidro is committed to a safe, resilient, and supportive
        environment. Our dedicated teams work in coordination with local
        authorities to provide essential safety services and community welfare
        programs.
      </p>

      <ul className="mt-8 space-y-4">
        {supportFeatures.map((feature) => {
          let iconSrc = feature.icon;
          if (feature.label === "Disaster Readiness") {
            iconSrc = getIcon(warningIcon, warningIconDark);
          } else if (feature.label === "Community Mediation") {
            iconSrc = getIcon(peopleIcon, peopleIconDark);
          }
          return (
            <li key={feature.label} className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-2xl transition-colors duration-200"
                style={{ color: isDark ? "#4D94FF" : "#4D94FF" }}
              >
                <img src={iconSrc} alt={feature.label} className="h-4 w-4" />
              </div>
              <span
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: isDark ? "#ffffff" : "#111827" }}
              >
                {feature.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
