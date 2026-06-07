import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import phoneIcon from "../../assets/icons/phone.svg";
import barsIcon from "../../assets/icons/bars.svg";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[rgba(248,249,250,0.8)] backdrop-blur-[12px] shadow-sm border-b border-slate-200/40">
      <nav className="relative w-full">
        <div className="mx-auto max-w-9xl px-6 py-3 sm:px-8 lg:px-30 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Barangay San Isidro logo"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-[#004E9F]">
                Barangay San Isidro
              </p>
            </div>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm font-medium text-[#414753] transition-colors duration-150 hover:text-[#004E9F]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled
              className="hidden md:inline-flex items-center gap-2 rounded-lg bg-[#004E9F] px-4 py-2 text-sm font-semibold text-white transition duration-150 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <img src={phoneIcon} alt="Phone icon" className="h-4 w-4" />
              Download Mobile App
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100 z-50 bg-white"
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
          <div className="absolute left-0 top-full z-40 w-full bg-white shadow-md md:hidden">
            <div className="mx-auto max-w-7xl px-6 py-4 sm:px-8 lg:px-12">
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="block rounded-md px-3 py-2 text-base font-medium text-[#414753] hover:bg-slate-50 hover:text-[#004E9F]"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                <button
                  disabled
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#004E9F] px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
                >
                  <img src={phoneIcon} alt="Phone" className="h-4 w-4" />
                  Download Mobile App
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
