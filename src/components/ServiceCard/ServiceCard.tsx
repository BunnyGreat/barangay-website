type ServiceCardProps = {
  title: string;
  description: string;
  icon: string;
  className?: string;
  iconWrapperClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export default function ServiceCard({
  title,
  description,
  icon,
  className = "",
  iconWrapperClassName = "h-12 w-12",
  titleClassName = "",
  descriptionClassName = "",
}: ServiceCardProps) {
  return (
    <div
      className={`rounded-2xl border border-[#C1C6D5] bg-[#F3F4F5] p-6 shadow-sm  ${className}`}
    >
      <div
        className={`mb-5 inline-flex items-center justify-center rounded-2xl bg-slate-100 ${iconWrapperClassName}`}
      >
        <img src={icon} alt={`${title} icon`} className="h-6 w-6" />
      </div>

      <h3
        className={`mb-3 text-xl font-semibold text-slate-900 ${titleClassName}`}
      >
        {title}
      </h3>
      <p className={`text-slate-600 ${descriptionClassName}`}>{description}</p>
    </div>
  );
}
