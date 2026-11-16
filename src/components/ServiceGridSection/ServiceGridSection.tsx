import { Link } from "react-router-dom";
import megaphoneIcon from "../../assets/icons/megaphone.svg";
import phoneIcon from "../../assets/icons/phone.svg";
import documentsIcon from "../../assets/icons/documents.svg";
import useDarkMode from "../../hooks/useDarkMode";
import { DARK_COLORS } from "../../utils/constants";

type Service = {
  title: string;
  description: string;
  icon: string;
  action: string;
  to?: string;
  href?: string;
  download?: boolean;
};

const services: Service[] = [
  {
    title: "Barangay Information",
    description:
      "Learn about the barangay and view the officials and assignments listed on this website.",
    icon: documentsIcon,
    action: "About the Barangay",
    to: "/about",
  },
  {
    title: "Contact and Emergency Hotlines",
    description:
      "Find the published contact information, inquiry form, and emergency hotline numbers.",
    icon: megaphoneIcon,
    action: "View Contact Information",
    to: "/contact",
  },
  {
    title: "Android Application",
    description:
      "Download the Android application package. A compatible Android device is required to install APK files.",
    icon: phoneIcon,
    action: "Download APK",
    href: "/downloads/san-isidro-ebarangay.apk",
    download: true,
  },
];

export default function ServiceGridSection() {
  const isDark = useDarkMode();

  return (
    <section className="px-6 pb-12 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const isDownload = service.download === true;
          const card = (
            <article
              className="flex h-full flex-col justify-between rounded-3xl border p-6 shadow-sm transition duration-200 group-hover:-translate-y-1 group-hover:shadow-md"
              style={{
                backgroundColor: isDownload
                  ? isDark
                    ? "#00458E"
                    : "#004E9F"
                  : isDark
                    ? DARK_COLORS.card
                    : "#ffffff",
                borderColor: isDownload
                  ? "transparent"
                  : isDark
                    ? DARK_COLORS.cardBorder
                    : "#e2e8f0",
                color: isDownload
                  ? "#ffffff"
                  : isDark
                    ? DARK_COLORS.heading
                    : "#0f172a",
              }}
            >
              <div>
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: isDownload
                      ? "rgba(255,255,255,0.12)"
                      : isDark
                        ? DARK_COLORS.surface
                        : "#f1f5f9",
                  }}
                >
                  <img
                    src={service.icon}
                    alt=""
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </span>
                <h2 className="mt-5 text-lg font-semibold">{service.title}</h2>
                <p
                  className="mt-3 text-sm leading-7"
                  style={{
                    color: isDownload
                      ? "rgba(255,255,255,0.82)"
                      : isDark
                        ? DARK_COLORS.paragraph
                        : "#4b5563",
                  }}
                >
                  {service.description}
                </p>
              </div>
              <span
                className="mt-6 inline-flex self-start rounded-lg px-4 py-2 text-sm font-semibold"
                style={{
                  backgroundColor: isDownload
                    ? "#ffffff"
                    : isDark
                      ? `${DARK_COLORS.primary}18`
                      : "#eaf3ff",
                  color: isDownload
                    ? "#004E9F"
                    : isDark
                      ? DARK_COLORS.primary
                      : "#004E9F",
                }}
              >
                {service.action}
              </span>
            </article>
          );
          const linkClassName =
            "group block rounded-3xl focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#004E9F]";

          return service.to ? (
            <Link
              key={service.title}
              to={service.to}
              className={linkClassName}
            >
              {card}
            </Link>
          ) : (
            <a
              key={service.title}
              href={service.href}
              download={service.download ? "san-isidro-ebarangay.apk" : undefined}
              className={linkClassName}
              aria-label="Download the Barangay San Isidro Android application"
            >
              {card}
            </a>
          );
        })}
      </div>
    </section>
  );
}
