import { bgClassNames, buttonClassNames } from "../../utils/constants";

export type ServiceFeatureCardProps = {
  icon: string;
  title: string;
  description: string;
  image?: string;
  badges?: string[];
  buttonText?: string;
  variant?: "light" | "primary";
};

export default function ServiceFeatureCard({
  icon,
  title,
  description,
  image,
  badges = [],
  buttonText,
  variant = "light",
}: ServiceFeatureCardProps) {
  const isPrimary = variant === "primary";

  const containerClass = isPrimary
    ? `rounded-[32px] p-6 md:p-8 ${bgClassNames.primaryBlue} text-white h-full`
    : `rounded-[32px] p-6 md:p-8 bg-white border border-slate-200 text-slate-800 h-full`;

  const titleClass = isPrimary
    ? "text-2xl font-semibold tracking-tight"
    : "text-2xl font-semibold tracking-tight";

  const descClass = isPrimary
    ? "mt-4 text-sm leading-7 text-white/90"
    : "mt-4 text-sm leading-7 text-slate-700";

  const badgeClass = () =>
    isPrimary
      ? `inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white`
      : `inline-flex items-center gap-2 rounded-full bg-[#FCD400] px-3 py-1 text-xs font-semibold text-slate-950`;

  const btnClass = isPrimary
    ? `${buttonClassNames.ctaSecondary} ${buttonClassNames.basePill}`
    : `${buttonClassNames.ctaPrimary} ${buttonClassNames.basePill}`;

  return (
    <article className={containerClass}>
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_0.95fr] gap-6 items-start">
        <div className="flex flex-col justify-between gap-6 h-full">
          <div className="space-y-5">
            <div className="space-y-4">
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${
                  isPrimary ? "bg-white/15" : "bg-slate-100"
                }`}
              >
                <img
                  src={icon}
                  alt={`${title} icon`}
                  className="h-6 w-6 object-contain"
                />
              </div>
              <div>
                <h3 className={titleClass}>{title}</h3>
              </div>
            </div>

            <p className={descClass}>{description}</p>

            {badges.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {badges.map((b) => (
                  <span key={b} className={badgeClass()}>
                    {b}
                  </span>
                ))}
              </div>
            )}
          </div>

          {buttonText && (
            <div>
              <button className={btnClass} type="button">
                {buttonText}
              </button>
            </div>
          )}
        </div>

        {image ? (
          <div className="hidden md:block">
            <div className="overflow-hidden rounded-[28px] bg-slate-100 shadow-sm">
              <img
                src={image}
                alt={title}
                className="h-[220px] w-full object-cover"
              />
            </div>
          </div>
        ) : (
          <div className="hidden md:block" />
        )}
      </div>
    </article>
  );
}
