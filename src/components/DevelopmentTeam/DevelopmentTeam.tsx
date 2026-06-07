import developerImage from "../../assets/images/developer/1.jpg";
import OfficialCard from "../OfficialsCard/OfficialsCard";

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
    image: developerImage,
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
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#004E9F]">
            Project Development Team
          </p>
          <p className="mt-3 text-base font-normal text-[#414753]">
            Our team builds simple and secure tools to help our local community
            run smoothly. With our skills in tech and data, we make daily work
            easier and safer for everyone.
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
