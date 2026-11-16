import { buttonClassNames } from "../../utils/constants";
import useDarkMode from "../../hooks/useDarkMode";
import { Link } from "react-router-dom";

type CTAProps = {
  title?: string;
  description?: string;
};

const defaultTitle = "Dedicated to Serving San Isidro";
const defaultDescription =
  "Find barangay information, emergency hotlines, and contact options for Barangay San Isidro.";

export default function CTA({
  title = defaultTitle,
  description = defaultDescription,
}: CTAProps) {
  const isDark = useDarkMode();

  return (
    <section
      className={`relative overflow-hidden rounded-[32px] px-8 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16 transition-colors duration-200`}
      style={{
        backgroundColor: "#30629b",
      }}
    >
      <div
        className="pointer-events-none absolute left-0 top-0 h-28 w-28 rounded-br-[100px] transition-colors duration-200"
        style={{
          backgroundColor: isDark
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0.1)",
        }}
      />
      <div className="mx-auto max-w-5xl text-center text-white">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p
          className="mx-auto mt-4 max-w-2xl text-sm leading-7 sm:text-base transition-colors duration-200"
          style={{
            color: isDark ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.9)",
          }}
        >
          {description}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <Link
            to="/contact"
            className={`${buttonClassNames.base} rounded-lg px-6 py-3 font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
            style={{
              backgroundColor: "#FCD400",
              color: "#191C1D",
            }}
          >
            Contact Our Office
          </Link>
        </div>
      </div>
    </section>
  );
}
