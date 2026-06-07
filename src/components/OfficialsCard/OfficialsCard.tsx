import { textClassNames } from "../../utils/constants";

type OfficialCardProps = {
  image: string;
  position: string;
  name: string;
};

export default function OfficialCard({
  image,
  position,
  name,
}: OfficialCardProps) {
  return (
    <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
      <div className="overflow-hidden rounded-t-[30px] bg-slate-100">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-72 w-full object-cover"
        />
      </div>

      <div className="border-t border-slate-200 px-6 py-5 text-center">
        <p
          className={`text-xs font-semibold uppercase tracking-[0.35em] ${textClassNames.primaryBlue}`}
        >
          {position}
        </p>

        <h3 className="mt-3 text-base font-semibold text-slate-900">{name}</h3>
      </div>
    </div>
  );
}
