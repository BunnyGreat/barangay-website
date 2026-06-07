import shieldIcon from "../../assets/icons/shieldheart.svg";
import warningIcon from "../../assets/icons/warning.svg";
import peopleIcon from "../../assets/icons/community.svg";
import heartIcon from "../../assets/icons/shield-2.svg";

type SupportFeature = {
  icon: string;
  label: string;
};

const supportFeatures: SupportFeature[] = [
  {
    icon: warningIcon,
    label: "Disaster Readiness",
  },
  {
    icon: peopleIcon,
    label: "Community Mediation",
  },
  {
    icon: heartIcon,
    label: "Health & Rescue Ops",
  },
];

export default function CommunitySupportCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full text-[#004E9F]">
          <img src={shieldIcon} alt="Shield icon" className="h-6 w-6" />
        </div>
        <h3 className="text-2xl font-semibold text-[#004E9F]">
          Public Safety & Community Support
        </h3>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-600">
        Barangay San Isidro is committed to a safe, resilient, and supportive
        environment. Our dedicated teams work in coordination with local
        authorities to provide essential safety services and community welfare
        programs.
      </p>

      <ul className="mt-8 space-y-4">
        {supportFeatures.map((feature) => (
          <li key={feature.label} className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl text-[#004E9F]">
              <img src={feature.icon} alt={feature.label} className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium text-slate-900">
              {feature.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
