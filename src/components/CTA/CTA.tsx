import { bgClassNames, buttonClassNames } from "../../utils/constants";

type CTAProps = {
  title?: string;
  description?: string;
  bgClass?: string;
};

const defaultTitle = "Dedicated to Serving San Isidro";
const defaultDescription =
  "Our administration works tirelessly to ensure that every resident has access to the resources they need to thrive.";
const defaultBgClass = bgClassNames.ctaSection;

export default function CTA({
  title = defaultTitle,
  description = defaultDescription,
  bgClass = defaultBgClass,
}: CTAProps) {
  return (
    <section
      className={`relative overflow-hidden rounded-[32px] px-8 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16 ${bgClass}`}
    >
      <div className="pointer-events-none absolute left-0 top-0 h-28 w-28 rounded-br-[100px] bg-white/10" />
      <div className="mx-auto max-w-5xl text-center text-white">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
          {description}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <a
            href="#"
            className={`${buttonClassNames.base} ${buttonClassNames.ctaPrimary}`}
          >
            Contact Our Office
          </a>
          <a
            href="#"
            className={`${buttonClassNames.base} ${buttonClassNames.ctaSecondary}`}
          >
            View Citizen Charter
          </a>
        </div>
      </div>
    </section>
  );
}
