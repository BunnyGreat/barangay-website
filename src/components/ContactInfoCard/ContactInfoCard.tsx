import locationIcon from "../../assets/icons/location2.svg";
import contactIcon from "../../assets/icons/contact2.svg";
import clockIcon from "../../assets/icons/time.svg";
import useDarkMode from "../../hooks/useDarkMode";

export default function ContactInfoCard() {
  const isDark = useDarkMode();
  return (
    <div
      className="rounded-2xl p-8 shadow-lg"
      style={{
        backgroundColor: isDark ? "#004E9F" : "#004E9F",
        color: isDark ? "#ffffff" : "#ffffff",
      }}
    >
      <h2
        className="text-2xl font-semibold tracking-tight"
        style={{ color: isDark ? "#ffffff" : "#ffffff" }}
      >
        Barangay Hall Information
      </h2>

      <div className="mt-8 space-y-8">
        {/* Office Address */}
        <div className="flex gap-4">
          <div
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg"
            style={{
              backgroundColor: isDark
                ? "rgba(50,57,72,0.3)"
                : "rgba(255,255,255,0.1)",
            }}
          >
            <img src={locationIcon} alt="Location icon" className="h-5 w-5" />
          </div>
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{
                color: isDark
                  ? "rgba(225,227,228,0.85)"
                  : "rgba(255,255,255,0.85)",
              }}
            >
              Office Address
            </p>
            <p
              className="mt-2 text-sm leading-6"
              style={{ color: isDark ? "#ffffff" : "#ffffff" }}
            >
              Sitio Tanag, San Isidro, Rodriguez, Rizal, 1860
            </p>
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex gap-4">
          <div
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg"
            style={{
              backgroundColor: isDark
                ? "rgba(50,57,72,0.3)"
                : "rgba(255,255,255,0.1)",
            }}
          >
            <img src={contactIcon} alt="Contact icon" className="h-5 w-5" />
          </div>
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{
                color: isDark
                  ? "rgba(225,227,228,0.85)"
                  : "rgba(255,255,255,0.85)",
              }}
            >
              Phone Number
            </p>
            <p
              className="mt-2 text-sm font-semibold"
              style={{ color: isDark ? "#ffffff" : "#ffffff" }}
            >
              +63 (02) 8123–4567
            </p>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="flex gap-4">
          <div
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg"
            style={{
              backgroundColor: isDark
                ? "rgba(50,57,72,0.3)"
                : "rgba(255,255,255,0.1)",
            }}
          >
            <img src={clockIcon} alt="Clock icon" className="h-5 w-5" />
          </div>
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{
                color: isDark
                  ? "rgba(225,227,228,0.85)"
                  : "rgba(255,255,255,0.85)",
              }}
            >
              Operating Hours
            </p>
            <p
              className="mt-2 text-sm leading-6"
              style={{ color: isDark ? "#ffffff" : "#ffffff" }}
            >
              Monday - Friday: 8:00 AM - 5:00 PM
            </p>
          </div>
        </div>
      </div>

      <div
        className="my-8 h-px"
        style={{
          backgroundColor: isDark
            ? "rgba(65,71,83,0.2)"
            : "rgba(255,255,255,0.2)",
        }}
      />

      {/* Emergency Note */}
      <p
        className="text-sm italic leading-6"
        style={{
          color: isDark ? "rgba(225,227,228,0.7)" : "rgba(255,255,255,0.7)",
        }}
      >
        For emergencies outside office hours, please dial our 24/7 hotline at
        911 or the local police station.
      </p>
    </div>
  );
}
