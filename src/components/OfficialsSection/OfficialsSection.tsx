import officialImage from "../../assets/images/officials/1.jpg";
import OfficialCard from "../OfficialsCard/OfficialsCard";

const officials = [
  {
    position: "Kagawad",
    name: "Hon. Maria Elena Cruz",
  },
  {
    position: "Kagawad",
    name: "Hon. Antonio G. Reyes",
  },
  {
    position: "Kagawad",
    name: "Hon. Sofia M. Luna",
  },
  {
    position: "Kagawad",
    name: "Hon. Roberto D. Silva",
  },
  {
    position: "Kagawad",
    name: "Hon. Lucia P. Gomez",
  },
  {
    position: "Kagawad",
    name: "Hon. Manuel J. Ramos",
  },
  {
    position: "Kagawad",
    name: "Hon. Teresa L. Diaz",
  },
  {
    position: "SK Chairperson",
    name: "Hon. Kevin B. Tan",
  },
  {
    position: "Secretary",
    name: "Ms. Clara V. Lopez",
  },
  {
    position: "Treasurer",
    name: "Mr. Danilo R. Castro",
  },
];

export default function OfficialsSection() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-[#004E9F]">
            Barangay Leadership
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#414753]">
            The dedicated officials of Barangay San Isidro serving the community
            with integrity and transparency.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(360px,460px)_1fr] items-center">
          <div className="relative">
            <div className="absolute left-[-30px] top-[-20px] bottom-[-12px] w-[110%] rounded-[34px] bg-[rgba(252,212,0,0.1)] shadow-[0_30px_90px_rgba(252,212,0,0.12)] transform -rotate-5" />
            <div className="relative z-10 overflow-hidden rounded-[32px] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
              <img
                src={officialImage}
                alt="Punong Barangay"
                className="h-[560px] w-full object-cover"
              />
              <div className="bg-[#004E9F] px-6 py-6 text-white">
                <p className="text-xs font-normal uppercase tracking-[0.45em]">
                  Punong Barangay
                </p>
                <h3 className="mt-3 text-lg font-semibold leading-6">
                  Hon. Jose Eric D. Ching
                </h3>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#004E9F]">
                Message from the Head
              </p>
              <p className="mt-5 text-lg leading-8 text-[#414753]">
                “Our commitment is to build a safer, more progressive San Isidro
                through digital innovation and inclusive governance. Together,
                we are shaping a future where every resident thrives.”
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="h-1 w-16 rounded-full bg-[#FCD400]" />
              <span className="h-1 w-8 rounded-full bg-[#004E9F]" />
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {officials.map((official) => (
            <OfficialCard
              key={official.name}
              image={officialImage}
              position={official.position}
              name={official.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
