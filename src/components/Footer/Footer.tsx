import { useState } from "react";
import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { bgClassNames, DARK_COLORS } from "../../utils/constants";
import useDarkMode from "../../hooks/useDarkMode";
import { NAV_LINKS } from "../../utils/navigation";
import logo from "../../assets/images/logo.png";

export default function Footer() {
  const isDark = useDarkMode();
  const [copied, setCopied] = useState(false);

  const handleShare = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const shareData = {
      title: "Barangay San Isidro",
      text: "Check out the Barangay San Isidro website.",
      url: window.location.href,
    };

    const copyUrl = () => {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
          window.prompt("Copy this link:", window.location.href);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        });
    };

    const isMobile =
      /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );

    if (navigator.share && isMobile) {
      navigator.share(shareData).catch(() => {
        copyUrl();
      });
    } else {
      copyUrl();
    }
  };

  return (
    <footer
      className={`${!isDark ? `${bgClassNames.ctaSection} text-white` : ""}`}
      style={{
        backgroundColor: isDark ? DARK_COLORS.backgroundAlt : undefined,
        color: isDark ? DARK_COLORS.paragraph : undefined,
      }}
    >
      <div className="mx-auto max-w-9xl px-6 py-16 sm:px-8 lg:px-35">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-4">
              <img
                src={logo}
                alt="Barangay San Isidro logo"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="text-base font-semibold">Barangay San Isidro</p>
                <p
                  className="text-sm"
                  style={{ color: isDark ? DARK_COLORS.paragraph : undefined }}
                >
                  Barangay information and contact details
                </p>
              </div>
            </div>

            <p
              className="mt-6 max-w-md"
              style={{ color: isDark ? DARK_COLORS.paragraph : undefined }}
            >
              Find information about barangay leadership, contact options, and
              emergency hotlines.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.facebook.com/BarangaySanIsidroMontalbanRizal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                style={{
                  backgroundColor: isDark
                    ? DARK_COLORS.surface
                    : "rgba(255,255,255,0.1)",
                }}
                aria-label="Facebook"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: isDark ? DARK_COLORS.heading : "#ffffff" }}
                >
                  <path
                    d="M18 2H15C12.2404 2 10 4.24042 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.44808 14.4481 6 15 6H18V2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <div className="relative inline-flex">
                <button
                  type="button"
                  onClick={handleShare}
                  title={copied ? "Copied!" : "Copy URL"}
                  aria-label={copied ? "Copied!" : "Copy URL"}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: isDark
                      ? DARK_COLORS.surface
                      : "rgba(255,255,255,0.1)",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: isDark ? DARK_COLORS.heading : "#ffffff" }}
                  >
                    <path
                      d="M15 5C15 6.65575 16.3443 8 18 8C19.6557 8 21 6.65575 21 5C21 3.34425 19.6557 2 18 2C16.3443 2 15 3.34425 15 5V5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 12C3 13.6557 4.34425 15 6 15C7.65575 15 9 13.6557 9 12C9 10.3443 7.65575 9 6 9C4.34425 9 3 10.3443 3 12H3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 19C15 20.6557 16.3443 22 18 22C19.6557 22 21 20.6557 21 19C21 17.3443 19.6557 16 18 16C16.3443 16 15 17.3443 15 19V19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.58997 13.51L15.42 17.49"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.41 6.51001L8.58997 10.49"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {copied && (
                  <span
                    className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-full px-2 py-1 text-[11px] shadow-lg"
                    style={{
                      backgroundColor: isDark ? DARK_COLORS.surface : "#0f172a",
                      color: isDark ? DARK_COLORS.heading : "#ffffff",
                    }}
                  >
                    Copied!
                  </span>
                )}
              </div>
            </div>
          </div>

          <div>
            <h4
              className="text-sm tracking-wider uppercase"
              style={{ color: isDark ? DARK_COLORS.heading : undefined }}
            >
              Quick Links
            </h4>
            <ul
              className="mt-6 space-y-3"
              style={{ color: isDark ? DARK_COLORS.paragraph : undefined }}
            >
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="text-sm tracking-wider uppercase"
              style={{ color: isDark ? DARK_COLORS.heading : undefined }}
            >
              Contact Information
            </h4>
            <ul
              className="mt-6 space-y-4"
              style={{ color: isDark ? DARK_COLORS.paragraph : undefined }}
            >
              <li className="flex items-start gap-3">
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: isDark ? DARK_COLORS.footerIcon : "#ffffff" }}
                >
                  <path
                    d="M8 10C8.55 10 9.02083 9.80417 9.4125 9.4125C9.80417 9.02083 10 8.55 10 8C10 7.45 9.80417 6.97917 9.4125 6.5875C9.02083 6.19583 8.55 6 8 6C7.45 6 6.97917 6.19583 6.5875 6.5875C6.19583 6.97917 6 7.45 6 8C6 8.55 6.19583 9.02083 6.5875 9.4125C6.97917 9.80417 7.45 10 8 10V10M8 17.35C10.0333 15.4833 11.5417 13.7875 12.525 12.2625C13.5083 10.7375 14 9.38333 14 8.2C14 6.38333 13.4208 4.89583 12.2625 3.7375C11.1042 2.57917 9.68333 2 8 2C6.31667 2 4.89583 2.57917 3.7375 3.7375C2.57917 4.89583 2 6.38333 2 8.2C2 9.38333 2.49167 10.7375 3.475 12.2625C4.45833 13.7875 5.96667 15.4833 8 17.35V17.35M8 20C5.31667 17.7167 3.3125 15.5958 1.9875 13.6375C0.6625 11.6792 0 9.86667 0 8.2C0 5.7 0.804167 3.70833 2.4125 2.225C4.02083 0.741667 5.88333 0 8 0C10.1167 0 11.9792 0.741667 13.5875 2.225C15.1958 3.70833 16 5.7 16 8.2C16 9.86667 15.3375 11.6792 14.0125 13.6375C12.6875 15.5958 10.6833 17.7167 8 20V20M8 8V8V8V8V8V8V8V8V8V8"
                    fill="currentColor"
                  />
                </svg>
                <span>Sitio Tanag, San Isidro, Rodriguez, Rizal, 1860</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  width="13"
                  height="19"
                  viewBox="0 0 13 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: isDark ? DARK_COLORS.footerIcon : "#ffffff" }}
                >
                  <path
                    d="M1.66667 18.3333C1.20833 18.3333 0.815972 18.1701 0.489583 17.8438C0.163194 17.5174 0 17.125 0 16.6667V1.66667C0 1.20833 0.163194 0.815972 0.489583 0.489583C0.815972 0.163194 1.20833 0 1.66667 0H10C10.4583 0 10.8507 0.163194 11.1771 0.489583C11.5035 0.815972 11.6667 1.20833 11.6667 1.66667V4.25C11.9167 4.34722 12.1181 4.5 12.2708 4.70833C12.4236 4.91667 12.5 5.15278 12.5 5.41667V7.08333C12.5 7.34722 12.4236 7.58333 12.2708 7.79167C12.1181 8 11.9167 8.15278 11.6667 8.25V16.6667C11.6667 17.125 11.5035 17.5174 11.1771 17.8438C10.8507 18.1701 10.4583 18.3333 10 18.3333H1.66667ZM1.66667 16.6667H10V1.66667H1.66667V16.6667ZM1.66667 16.6667V1.66667V16.6667ZM5.83333 4.16667C6.06944 4.16667 6.26736 4.08681 6.42708 3.92708C6.58681 3.76736 6.66667 3.56944 6.66667 3.33333C6.66667 3.09722 6.58681 2.89931 6.42708 2.73958C6.26736 2.57986 6.06944 2.5 5.83333 2.5C5.59722 2.5 5.39931 2.57986 5.23958 2.73958C5.07986 2.89931 5 3.09722 5 3.33333C5 3.56944 5.07986 3.76736 5.23958 3.92708C5.39931 4.08681 5.59722 4.16667 5.83333 4.16667Z"
                    fill="currentColor"
                  />
                </svg>
                <a href="tel:+63281234567" className="hover:underline">
                  +63 (02) 8123–4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  width="20"
                  height="16"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: isDark ? DARK_COLORS.footerIcon : "#ffffff" }}
                >
                  <path
                    d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2V16M10 9L2 4V14V14V14H18V14V14V4L10 9V9M10 7L18 2H2L10 7V7M2 4V2V2V4V14V14V14V14V14V14V4V4"
                    fill="currentColor"
                  />
                </svg>
                <a
                  href="mailto:info@sanisidro.gov.ph"
                  className="break-all hover:underline"
                >
                  info@sanisidro.gov.ph
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr
          className="my-8"
          style={{ borderColor: isDark ? DARK_COLORS.footerBorder : undefined }}
        />

        <div
          className="flex flex-col md:flex-row items-center justify-between text-sm"
          style={{ color: isDark ? DARK_COLORS.paragraph : undefined }}
        >
          <p>
            © 2026 Barangay San Isidro, Rodriguez, Rizal. All Rights Reserved.
          </p>
          <Link
            to="/contact"
            className="mt-4 hover:underline md:mt-0"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
