import { textClassNames, DARK_COLORS } from "../../utils/constants";
import useDarkMode from "../../hooks/useDarkMode";
import developerImage from "../../assets/images/developer/1.jpg";
import OfficialCard from "../OfficialsCard/OfficialsCard";
import developerImage2 from "../../assets/images/developer/2.jpg";

const developers = [
  {
    image: developerImage,
    position: "Developer",
    name: "Julius C. Perante",
  },
  {
    image: developerImage,
    position: "Developer",
    name: "John Lloyd L. Nadura",
  },
  {
    image: developerImage2,
    position: "Developer",
    name: "Cash S. Mabuti",
  },
  {
    image: developerImage,
    position: "Developer",
    name: "Enoc P. Bocarile",
  },
];

export default function DevelopmentTeam() {
  const isDark = useDarkMode();
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p
            className={`text-sm font-semibold uppercase tracking-[0.35em] ${textClassNames.primaryBlue}`}
            style={{ color: isDark ? DARK_COLORS.primary : undefined }}
          >
            Project Development Team
          </p>
          <p
            className="mt-3 text-base font-normal"
            style={{ color: isDark ? DARK_COLORS.paragraph : "#414753" }}
          >
            The team involved in developing this Barangay San Isidro website.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {developers.map((developer) => (
            <OfficialCard
              key={developer.name}
              image={developer.image}
              position={developer.position}
              name={developer.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
