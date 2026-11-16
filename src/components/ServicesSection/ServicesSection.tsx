import { Link } from "react-router-dom";
import { DARK_COLORS } from "../../utils/constants";
import useDarkMode from "../../hooks/useDarkMode";
import ServiceCard from "../ServiceCard/ServiceCard";
import documentsIcon from "../../assets/icons/documents.svg";
import questionIcon from "../../assets/icons/question.svg";

export default function ServicesSection() {
  const isDark = useDarkMode();

  return (
    <section
      className="px-6 py-16 transition-colors duration-200 sm:px-8 lg:px-12"
      style={{ backgroundColor: isDark ? "#0C1320" : "#f9fafb" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p
            className="text-sm font-semibold uppercase tracking-[0.24em]"
            style={{ color: isDark ? DARK_COLORS.primary : "#004E9F" }}
          >
            Explore Barangay Information
          </p>
          <h2
            className="mt-4 text-3xl font-bold transition-colors duration-200 sm:text-4xl"
            style={{ color: isDark ? DARK_COLORS.heading : "#1f2937" }}
          >
            Information and Contact Options
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-base leading-7"
            style={{ color: isDark ? DARK_COLORS.paragraph : "#4b5563" }}
          >
            Explore the barangay leadership and published information, or find
            contact details and emergency hotlines.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Link
            to="/about"
            className="group rounded-[28px] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#004E9F]"
          >
            <ServiceCard
              title="About Barangay San Isidro"
              description="Read the barangay's vision and mission, meet its officials, and view their listed committee assignments."
              icon={documentsIcon}
              className="h-full rounded-[28px] p-8 shadow-sm transition duration-200 group-hover:-translate-y-1 group-hover:shadow-md"
              style={{
                backgroundColor: isDark ? DARK_COLORS.card : "#ffffff",
                borderColor: isDark ? DARK_COLORS.cardBorder : "#e2e8f0",
              }}
              titleClassName="text-xl"
              descriptionClassName="leading-7"
            />
          </Link>

          <Link
            to="/contact"
            className="group rounded-[28px] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#004E9F]"
          >
            <ServiceCard
              title="Contact and Emergency Information"
              description="Find the published office contact information, inquiry form, and emergency hotline numbers."
              icon={questionIcon}
              className="h-full rounded-[28px] p-8 shadow-sm transition duration-200 group-hover:-translate-y-1 group-hover:shadow-md"
              style={{
                backgroundColor: isDark ? DARK_COLORS.card : "#ffffff",
                borderColor: isDark ? DARK_COLORS.cardBorder : "#e2e8f0",
              }}
              titleClassName="text-xl"
              descriptionClassName="leading-7"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
