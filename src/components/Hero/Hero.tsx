import { Link } from "react-router-dom";
import { buttonClassNames, DARK_COLORS } from "../../utils/constants";
import useDarkMode from "../../hooks/useDarkMode";
import arrowRightIcon from "../../assets/icons/arrow-right.svg";

export default function Hero() {
  const isDark = useDarkMode();

  return (
    <section
      className="relative overflow-hidden px-6 py-16 transition-colors duration-200 sm:px-8 lg:px-12"
      style={{
        backgroundColor: isDark ? DARK_COLORS.background : "#ffffff",
        backgroundImage: `
          radial-gradient(circle at 0% 0%,
            rgba(0, 78, 159, 0.1) 0%,
            rgba(0,78,159,0) 50%
          ),
          radial-gradient(circle at 100% 50%,
            rgba(252,212,0,0.1) 0%,
            rgba(252,212,0,0) 20%
          )
        `,
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 md:gap-14 lg:grid-cols-2">
          <div className="max-w-full space-y-6 md:max-w-xl md:space-y-8">
            <span
              className="inline-flex rounded-full px-5 py-2.5 text-sm font-medium text-white"
              style={{
                backgroundColor: isDark ? "#8B7A1F" : "#705D00",
              }}
            >
              Barangay San Isidro · Rodriguez, Rizal
            </span>

            <h1
              className="text-4xl font-extrabold leading-tight transition-colors duration-200 sm:text-5xl"
              style={{ color: isDark ? DARK_COLORS.heading : "#111827" }}
            >
              Welcome to
              <span
                className="block"
                style={{ color: isDark ? DARK_COLORS.primary : "#004E9F" }}
              >
                Barangay San Isidro
              </span>
            </h1>

            <p
              className="max-w-md text-sm leading-7 transition-colors duration-200 md:text-base md:leading-8"
              style={{ color: isDark ? DARK_COLORS.paragraph : "#4b5563" }}
            >
              Explore information about barangay leadership and services, find
              contact details and emergency hotlines, and access the available
              contact options.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                to="/services"
                className={`${buttonClassNames.basePill} w-full items-center justify-center text-white transition-colors duration-200 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#004E9F] sm:w-auto`}
                style={{
                  backgroundColor: isDark ? DARK_COLORS.primary : "#004E9F",
                  color: isDark ? "#000814" : "#ffffff",
                }}
              >
                Get Started
                <img
                  src={arrowRightIcon}
                  alt=""
                  aria-hidden="true"
                  className="ml-2 h-6 w-4"
                />
              </Link>

              <Link
                to="/about"
                className={`${buttonClassNames.basePill} w-full items-center justify-center transition-colors duration-200 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#004E9F] sm:w-auto`}
                style={{
                  border: `1px solid ${isDark ? DARK_COLORS.primary : "#004E9F"}`,
                  color: isDark ? DARK_COLORS.primary : "#004E9F",
                  backgroundColor: isDark
                    ? `${DARK_COLORS.primary}10`
                    : "transparent",
                }}
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[32px] shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
            <img
              src="/images/hero.png"
              alt="Barangay San Isidro emblem with a technology-themed illustration"
              className="w-full object-cover"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
