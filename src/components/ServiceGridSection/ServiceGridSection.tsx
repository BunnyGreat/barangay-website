import megaphoneIcon from "../../assets/icons/megaphone.svg";
import checkshieldIcon from "../../assets/icons/check-guard.svg";
import phoneIcon2 from "../../assets/icons/phone2.svg";
import phoneIcon from "../../assets/icons/phone.svg";
import { buttonClassNames } from "../../utils/constants";
import useDarkMode from "../../hooks/useDarkMode";

type Service = {
  title: string;
  description: string;
  icon?: string;
  buttonText?: string;
  buttonIcon?: string;
};

const services: Service[] = [
  {
    title: "Announcements",
    description:
      "Get live notifications for the latest events and health advisories sent directly to your mobile device.",
    icon: megaphoneIcon,
  },
  {
    title: "Digital Residency",
    description:
      "Experience seamless access to local government with our Digital Residency program. A verified status for all San Isidro residents.",
    icon: checkshieldIcon,
  },
  {
    title: "Public Access",
    description:
      "Carry services in your pocket. Download the mobile app to access citizen services anytime.",
    icon: phoneIcon2,
    buttonText: "Download Now",
    buttonIcon: phoneIcon,
  },
];

export default function ServiceGridSection() {
  const isDark = useDarkMode();
  return (
    <section
      className="px-6 mb-12 sm:px-8 lg:px-13 transition-colors duration-200"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_320px] gap-4">
          {services.map((s) => {
            const isPublicAccess = s.title === "Public Access";
            const iconPath = s.icon?.toString() || "";
            const isSpecialBlue =
              iconPath.endsWith("megaphone.svg") ||
              iconPath.endsWith("check-guard.svg");
            return (
              <article
                key={s.title}
                className={`flex ${isPublicAccess ? "w-full" : "h-full"} flex-col justify-between rounded-3xl p-5 shadow-sm`}
                style={{
                  backgroundColor: isPublicAccess
                    ? isDark
                      ? "#2A3F52"
                      : "#0f1724"
                    : isDark
                      ? "#151C29"
                      : "#ffffff",
                  borderColor: isPublicAccess
                    ? undefined
                    : isDark
                      ? "rgba(65,71,83,0.3)"
                      : undefined,
                  color: isPublicAccess
                    ? isDark
                      ? "#ffffff"
                      : "#ffffff"
                    : isDark
                      ? "#ffffff"
                      : "#0f172a",
                }}
              >
                <div
                  className={
                    isPublicAccess
                      ? "flex flex-col items-center gap-4 text-center"
                      : "flex flex-col items-start gap-4"
                  }
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl`}
                    style={{
                      backgroundColor: isPublicAccess
                        ? isDark
                          ? "#070E1B"
                          : "rgba(255,255,255,0.06)"
                        : isSpecialBlue && isDark
                          ? "rgba(77,148,255,0.1)"
                          : isDark
                            ? "#070E1B"
                            : "#f1f5f9",
                    }}
                  >
                    {s.icon && (
                      <img
                        src={s.icon}
                        alt={`${s.title} icon`}
                        className={`h-5 w-5 ${isPublicAccess && isDark ? "filter brightness-125 contrast-125" : ""}`}
                      />
                    )}
                  </div>

                  <div className={isPublicAccess ? "max-w-[220px]" : ""}>
                    <h3
                      className={`text-lg font-semibold`}
                      style={{
                        color: isPublicAccess
                          ? "#ffffff"
                          : isDark
                            ? "#ffffff"
                            : undefined,
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      className="mt-3 text-sm leading-7"
                      style={{
                        color: isPublicAccess
                          ? isDark
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(255,255,255,0.7)"
                          : isDark
                            ? "rgba(255,255,255,0.7)"
                            : undefined,
                      }}
                    >
                      {s.description}
                    </p>
                  </div>
                </div>

                {s.buttonText && (
                  <div className="mt-5 flex justify-center">
                    <button
                      className={`${buttonClassNames.heroPrimary} inline-flex items-center gap-2 px-5 py-3 rounded-[8%]`}
                      style={{
                        backgroundColor: isDark ? "#4D94FF" : undefined,
                        color: isDark ? "#ffffff" : undefined,
                      }}
                    >
                      {s.buttonIcon && (
                        <img
                          src={s.buttonIcon}
                          alt="button icon"
                          className="h-4 w-4"
                        />
                      )}
                      {s.buttonText}
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
