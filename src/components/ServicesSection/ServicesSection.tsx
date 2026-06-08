import { DARK_COLORS } from "../../utils/constants";
import useDarkMode from "../../hooks/useDarkMode";
import ServiceCard from "../ServiceCard/ServiceCard";
import documentsIcon from "../../assets/icons/documents.svg";
import megaphoneIcon from "../../assets/icons/megaphone.svg";
import questionIcon from "../../assets/icons/question.svg";
import shieldIcon from "../../assets/icons/shield.svg";
import notificationIcon from "../../assets/icons/notification.svg";
import Star from "../../assets/icons/star.svg";
import shieldTwo from "../../assets/icons/shield-2.svg";
import arrowRightIcon from "../../assets/icons/arrow-right-2.svg";

export default function ServicesSection() {
  const isDark = useDarkMode();
  return (
    <section
      className="px-6 py-16 sm:px-8 lg:px-12 transition-colors duration-200"
      style={{
        backgroundColor: isDark ? "#0C1320" : "#f9fafb",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p
            className={`text-sm font-semibold uppercase tracking-[0.24em] transition-colors duration-200`}
            style={{ color: isDark ? DARK_COLORS.primary : "#004E9F" }}
          >
            Barangay Services
          </p>
          <h2
            className="mt-4 text-3xl font-bold sm:text-4xl transition-colors duration-200"
            style={{ color: isDark ? DARK_COLORS.heading : "#1f2937" }}
          >
            The Future of Barangay Services
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-base leading-7 transition-colors duration-200"
            style={{ color: isDark ? DARK_COLORS.paragraph : "#4b5563" }}
          >
            Our unified digital management system is designed to bridge the gap
            between traditional authority and modern efficiency.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div
            className="rounded-[32px] border p-8 shadow-sm transition-colors duration-200"
            style={{
              backgroundColor: isDark ? DARK_COLORS.card : "#ffffff",
              borderColor: isDark ? "rgba(65,71,83,0.3)" : "#C1C6D5",
            }}
          >
            <div className="grid gap-6">
              <div className="flex items-start gap-4">
                <div
                  className="inline-flex h-14 w-14 items-center justify-center rounded-[24px] transition-colors duration-200"
                  style={{
                    backgroundColor: isDark ? DARK_COLORS.surface : "#f3f4f6",
                    color: isDark ? DARK_COLORS.primary : "#1f2937",
                  }}
                >
                  <img src={Star} alt="Verified icon" className="h-6 w-6" />
                </div>
                <div>
                  <h3
                    className="text-2xl font-semibold transition-colors duration-200"
                    style={{ color: isDark ? DARK_COLORS.heading : "#1f2937" }}
                  >
                    Citizen Service Excellence
                  </h3>
                  <p
                    className={`mt-2 text-sm font-medium transition-colors duration-200`}
                    style={{ color: isDark ? DARK_COLORS.primary : "#004E9F" }}
                  >
                    Streamlined Digital Governance
                  </p>
                </div>
              </div>
              <div
                className="max-w-2xl text-sm leading-7 transition-colors duration-200"
                style={{ color: isDark ? DARK_COLORS.paragraph : "#4b5563" }}
              >
                <p className="mt-3">
                  Our digital ecosystem is built to serve you better. We've
                  optimized our core processes to ensure every resident has
                  instant access to essential barangay services without the
                  wait.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <ServiceCard
                title="Document Requests"
                description="Fast-track permits and certificates online."
                icon={documentsIcon}
                className={`rounded-[28px] border p-6 shadow-none transition-colors duration-200`}
                style={{
                  backgroundColor: isDark ? "#151C29" : "#F3F4F5",
                  borderColor: isDark ? "rgba(65,71,83,0.3)" : "#C1C6D5",
                }}
                iconWrapperClassName="h-10 w-10 rounded-2xl"
                iconWrapperStyle={{ backgroundColor: "transparent" }}
                titleClassName="mb-2 text-base font-semibold"
                descriptionClassName="text-sm"
              />
              <ServiceCard
                title="Community News"
                description="Stay updated with verified local announcements."
                icon={megaphoneIcon}
                className={`rounded-[28px] border p-6 shadow-none transition-colors duration-200`}
                style={{
                  backgroundColor: isDark ? "#151C29" : "#F3F4F5",
                  borderColor: isDark ? "rgba(65,71,83,0.3)" : "#C1C6D5",
                }}
                iconWrapperClassName="h-10 w-10 rounded-2xl"
                iconWrapperStyle={{
                  backgroundColor: isDark
                    ? "rgba(77,148,255,0.1)"
                    : "transparent",
                }}
                titleClassName="mb-2 text-base font-semibold"
                descriptionClassName="text-sm"
              />
            </div>

            <div
              className="mt-8 text-sm inline-flex items-center gap-3 transition-colors duration-200"
              style={{ color: isDark ? DARK_COLORS.primary : "#004E9F" }}
            >
              <div
                className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200"
                style={{
                  backgroundColor: "transparent",
                  color: isDark ? DARK_COLORS.primary : "#004E9F",
                }}
              >
                <img src={questionIcon} alt="Info icon" className="h-4 w-4" />
              </div>
              <span>
                All services are secured with enterprise-grade encryption.
              </span>
            </div>
          </div>

          <div
            className="rounded-[28px] border p-8 text-white shadow-sm transition-colors duration-200"
            style={{
              backgroundColor: "#004E9F",
              borderColor: isDark
                ? "rgba(65,71,83,0.3)"
                : "rgba(255,255,255,0.1)",
              boxShadow: isDark
                ? `0 0 0 1px ${DARK_COLORS.primary}20`
                : "0 0 0 1px rgba(255,255,255,0.1)",
            }}
          >
            <div
              className="inline-flex h-12 w-12 items-center justify-center rounded-3xl transition-colors duration-200"
              style={{
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(255,255,255,0.1)",
                color: "white",
              }}
            >
              <img
                src={shieldIcon}
                alt="Data protection icon"
                className="h-6 w-6"
              />
            </div>
            <h3 className="mt-6 text-2xl font-semibold">Data Integrity</h3>
            <p className="mt-4 text-sm leading-7 text-slate-100">
              We take your privacy seriously. By using powerful data scramblers
              and blockchain security, we make sure citizen records are always
              protected. Your information is kept safe and untouched, exactly
              where it belongs.
            </p>
            <p className="mt-6 text-sm italic text-slate-200/90">
              "Trust through transparency."
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_2.1fr]">
          <ServiceCard
            title="Health Services"
            description="Direct link to local clinic schedules and vaccination records."
            icon={shieldTwo}
            className={`rounded-[28px] border p-8 shadow-none transition-colors duration-200 flex flex-col items-center justify-center text-center`}
            style={{
              backgroundColor: isDark ? "#2E3541" : "#F3F4F5",
              borderColor: isDark ? "rgba(65,71,83,0.3)" : "#C1C6D5",
            }}
            iconWrapperClassName="h-14 w-14 rounded-[20px]"
            iconWrapperStyle={{
              backgroundColor: isDark ? "#070E1B" : "#FFFFFF",
              boxShadow: isDark ? undefined : "0 0 2px rgba(0,0,0,0.05)",
            }}
            titleClassName="mt-6 text-xl font-semibold"
            descriptionClassName="mt-3 text-sm leading-7"
          />

          <div
            className="rounded-[28px] border p-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-center transition-colors duration-200"
            style={{
              backgroundColor: isDark ? "#070E1B" : "#ffffff",
              borderColor: isDark ? "rgba(65,71,83,0.3)" : "#C1C6D5",
            }}
          >
            <div>
              <h3
                className="text-xl font-semibold transition-colors duration-200"
                style={{ color: isDark ? DARK_COLORS.heading : "#1f2937" }}
              >
                Real-time Alerts
              </h3>
              <p
                className="mt-3 max-w-xl text-sm leading-7 transition-colors duration-200"
                style={{ color: isDark ? DARK_COLORS.paragraph : "#4b5563" }}
              >
                Instant notifications for emergency announcements and community
                events.
              </p>
              <a
                className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200`}
                href="#"
                style={{ color: isDark ? DARK_COLORS.primary : "#004E9F" }}
              >
                View Alerts{" "}
                <img src={arrowRightIcon} alt="Arrow" className="h-4 w-4" />
              </a>
            </div>
            <div
              className="mx-auto flex h-28 w-28 items-center justify-center rounded-full transition-colors duration-200"
              style={{
                backgroundColor: isDark ? "rgba(77,148,255,0.05)" : "#EAF3FF",
              }}
            >
              <img
                src={notificationIcon}
                alt="Alerts icon"
                className="h-10 w-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
