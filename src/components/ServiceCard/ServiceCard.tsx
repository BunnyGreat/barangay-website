type ServiceCardProps = {
  title: string;
  description: string;
  icon: string;
};

export default function ServiceCard({
  title,
  description,
  icon,
}: ServiceCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
        <img src={icon} alt={`${title} icon`} className="h-6 w-6" />
      </div>

      <h3 className="mb-3 text-xl font-semibold text-slate-900">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}
