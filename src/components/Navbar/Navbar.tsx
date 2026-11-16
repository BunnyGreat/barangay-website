import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { DARK_COLORS } from "../../utils/constants";
import { NAV_LINKS } from "../../utils/navigation";
import useDarkMode from "../../hooks/useDarkMode";
import logo from "../../assets/images/logo.png";
import phoneIcon from "../../assets/icons/phone.svg";
import barsIcon from "../../assets/icons/bars.svg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const isDark = useDarkMode();

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-[12px] shadow-sm border-b transition-colors duration-200`}
      style={{
        backgroundColor: isDark
          ? `${DARK_COLORS.backgroundAlt}80`
          : "rgba(248,249,250,0.8)",
        borderColor: isDark ? DARK_COLORS.cardBorder : "#e2e8f0",
      }}
    >
      <nav className="relative w-full">
        <div className="mx-auto max-w-9xl px-6 py-3 sm:px-8 lg:px-30 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#004E9F]"
          >
            <img
              src={logo}
              alt="Barangay San Isidro logo"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p
                className="text-sm font-semibold transition-colors duration-200"
                style={{ color: isDark ? DARK_COLORS.heading : "#004E9F" }}
              >
                Barangay San Isidro
              </p>
            </div>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className="text-sm font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#004E9F]"
                style={({ isActive }) => ({
                  color: isActive
                    ? isDark
                      ? DARK_COLORS.primary
                      : "#004E9F"
                    : isDark
                      ? DARK_COLORS.paragraph
                      : "#414753",
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/BunnyGreat/barangay-website/releases/download/v1.0.0/san-isidro-ebarangay.apk"
              download="san-isidro-ebarangay.apk"
              aria-label="Download the Barangay San Isidro Android app"
              className="hidden items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition duration-150 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004E9F] md:inline-flex"
              style={{
                backgroundColor: isDark ? DARK_COLORS.primary : "#004E9F",
                color: isDark ? "#000814" : "#ffffff",
              }}
            >
              <img src={phoneIcon} alt="Phone icon" className="h-4 w-4" />
              Download Android App
            </a>

            <button
              className="inline-flex items-center justify-center rounded-lg p-2 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004E9F] md:hidden"
              style={{
                color: isDark ? DARK_COLORS.heading : "#1f2937",
                backgroundColor: isDark ? DARK_COLORS.card : "#ffffff",
              }}
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((s) => !s)}
            >
              <img src={barsIcon} alt="Menu" className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {open && (
          <div
            className="absolute left-0 top-full z-40 w-full shadow-md md:hidden transition-colors duration-200"
            style={{ backgroundColor: isDark ? DARK_COLORS.card : "#ffffff" }}
          >
            <div className="mx-auto max-w-7xl px-6 py-4 sm:px-8 lg:px-12">
              <div className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    className="block rounded-md px-3 py-2 text-base font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004E9F]"
                    style={({ isActive }) => ({
                      color: isActive
                        ? isDark
                          ? DARK_COLORS.primary
                          : "#004E9F"
                        : isDark
                          ? DARK_COLORS.paragraph
                          : "#414753",
                      backgroundColor: isActive
                        ? isDark
                          ? DARK_COLORS.surface
                          : "#f1f5f9"
                        : "transparent",
                    })}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}

                <a
                  href="https://github.com/BunnyGreat/barangay-website/releases/download/v1.0.0/san-isidro-ebarangay.apk"
                  download="san-isidro-ebarangay.apk"
                  aria-label="Download the Barangay San Isidro Android app"
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004E9F]"
                  style={{
                    backgroundColor: isDark ? DARK_COLORS.primary : "#004E9F",
                    color: isDark ? "#000814" : "#ffffff",
                  }}
                >
                  <img src={phoneIcon} alt="Phone" className="h-4 w-4" />
                  Download Android App
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
