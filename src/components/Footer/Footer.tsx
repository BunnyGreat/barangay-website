import { useState } from "react";
import type { MouseEvent } from "react";
import logo from "../../assets/images/logo.png";
import facebookIcon from "../../assets/icons/facebook.svg";
import shareIcon from "../../assets/icons/share.svg";
import locationIcon from "../../assets/icons/location.svg";
import phoneIcon from "../../assets/icons/phone.svg";
import emailIcon from "../../assets/icons/email.svg";

export default function Footer() {
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
    <footer className="bg-[#0752B0] text-white">
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
                <p className="text-sm text-slate-200">
                  Unified Digital Management System
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-md text-slate-200">
              Empowering our community through transparent governance and
              digital innovation for a better tomorrow.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.facebook.com/BarangaySanIsidroMontalbanRizal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
              >
                <img src={facebookIcon} alt="Facebook" className="h-4 w-4" />
              </a>
              <div className="relative inline-flex">
                <button
                  type="button"
                  onClick={handleShare}
                  title={copied ? "Copied!" : "Copy URL"}
                  aria-label={copied ? "Copied!" : "Copy URL"}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
                >
                  <img src={shareIcon} alt="Share" className="h-4 w-4" />
                </button>
                {copied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 px-2 py-1 text-[11px] text-white shadow-lg">
                    Copied!
                  </span>
                )}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm tracking-wider text-slate-200 uppercase">
              Quick Links
            </h4>
            <ul className="mt-6 space-y-3 text-slate-100">
              <li>
                <a className="hover:underline" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Services
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  FAQ
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-wider text-slate-200 uppercase">
              Contact Information
            </h4>
            <ul className="mt-6 space-y-4 text-slate-100">
              <li className="flex items-start gap-3">
                <img
                  src={locationIcon}
                  alt="Location"
                  className="h-5 w-5 mt-1"
                />
                <span>Sitio Tanag, San Isidro, Rodriguez, Rizal, 1860</span>
              </li>
              <li className="flex items-center gap-3">
                <img src={phoneIcon} alt="Phone" className="h-5 w-5" />
                <span>+63 (02) 8123–4567</span>
              </li>
              <li className="flex items-center gap-3">
                <img src={emailIcon} alt="Email" className="h-5 w-5" />
                <span>info@sanisidro.gov.ph</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-slate-300/20" />

        <div className="flex flex-col md:flex-row items-center justify-between text-slate-200 text-sm">
          <p>
            © 2026 Barangay San Isidro, Rodriguez, Rizal UDMS. All Rights
            Reserved.
          </p>
          <div className="mt-4 md:mt-0 flex gap-6">
            <a className="hover:underline" href="#">
              Privacy Policy
            </a>
            <a className="hover:underline" href="#">
              Terms of Service
            </a>
            <a className="hover:underline" href="#">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
