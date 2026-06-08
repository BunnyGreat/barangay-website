import { bgClassNames, DARK_COLORS } from "../../utils/constants";
import useDarkMode from "../../hooks/useDarkMode";
import heroImage from "../../assets/images/abouthero.png";
import heroImageDark from "../../assets/images/aboutherodark.png";

export default function AboutHero() {
  const isDark = useDarkMode();
  const currentHeroImage = isDark ? heroImageDark : heroImage;

  return (
    <section
      className={`relative overflow-hidden ${bgClassNames.primaryBlue}`}
      style={{ backgroundColor: isDark ? DARK_COLORS.primary : undefined }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${currentHeroImage})` }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: isDark
            ? `linear-gradient(180deg, rgba(12,19,36,0.6) 0%, rgba(12,19,32,0.4) 50%, rgba(12,19,32,0.8) 100%)`
            : `linear-gradient(180deg, rgba(0,78,159,0.8), rgba(0,78,159,0))`,
        }}
      />

      <div className="relative z-10 px-6 py-28 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-3xl font-semibold uppercase tracking-[0.35em] leading-tight text-white sm:text-2xl">
              FOUNDATION OF TRUST,
              <br />
              FUTURE OF SERVICE.
            </p>

            <p className="mt-8 text-base leading-8 text-white/90 sm:text-lg">
              Our barangay is dedicated to promoting community growth, peace,
              and development through responsible leadership and active citizen
              participation. We work together to provide quality services,
              maintain a safe environment, and improve the well-being of every
              resident.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
