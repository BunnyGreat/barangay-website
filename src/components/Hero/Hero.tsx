import { buttonClassNames } from "../../utils/constants";
import heroImage from "../../assets/images/hero.png";
import arrowRightIcon from "../../assets/icons/arrow-right.svg";
import meterIcon from "../../assets/icons/meter.svg";
import checkIcon from "../../assets/icons/check.svg";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden px-6 py-16 sm:px-8 lg:px-12 bg-white"
      style={{
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
        <div className="grid gap-10 md:gap-14 lg:grid-cols-2 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 max-w-full md:max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#705D00] px-5 py-2.5 text-sm font-medium text-white">
              <img src={checkIcon} alt="Governance icon" className="h-4 w-4" />
              Empowering Citizens Through Digital Governance
            </span>

            <h1 className="font-extrabold text-4xl sm:text-5xl md:text-5xl lg:text-[2.65rem] leading-tight text-slate-900">
              <span className="block">Transforming Services</span>
              <span className="block">
                Through{" "}
                <span className="text-[#004E9F]">Digital Innovation</span>
              </span>
            </h1>

            <p className="text-sm md:text-base leading-7 md:leading-8 text-slate-600 max-w-md">
              Experience a more efficient, transparent, and accessible
              government. Access permits, health services, and community updates
              right at your fingertips.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                className={`${buttonClassNames.basePill} w-full sm:w-auto ${buttonClassNames.heroPrimary}`}
              >
                Get Started
                <img
                  src={arrowRightIcon}
                  alt="Arrow icon"
                  className="h-6 w-4 ml-2"
                />
              </button>

              <button
                className={`${buttonClassNames.basePill} w-full sm:w-auto ${buttonClassNames.heroSecondary}`}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-[32px]">
              <img
                src={heroImage}
                alt="Barangay Digital Services"
                className="w-full object-cover"
              />
            </div>

            {/* Floating Card: absolute on md+, static below image on small */}
            <div className="md:absolute md:bottom-6 md:left-1 md:w-[15rem] w-full mt-6 md:mt-0 rounded-[20px] bg-white/70 md:bg-white/90 px-4 py-3 shadow-lg shadow-slate-900/10 md:ring-1 md:ring-[#AAC7FF]/20 md:animate-[bounce_2.6s_ease-in-out_infinite] md:motion-safe:animate-[bounce_2.6s_ease-in-out_infinite]">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7A6A0A]">
                  <img
                    src={meterIcon}
                    alt="Fast Processing"
                    className="h-5 w-5"
                  />
                </div>

                <div>
                  <p className="text-base font-semibold text-slate-950">
                    Fast Processing
                  </p>
                  <p className="text-xs text-slate-500">98% Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
