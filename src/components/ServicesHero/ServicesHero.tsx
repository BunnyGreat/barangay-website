import { textClassNames } from "../../utils/constants";

export default function ServicesHero() {
  return (
    <section className="bg-slate-50 px-6 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <h1
            className={`text-sm font-semibold uppercase tracking-[0.24em] ${textClassNames.primaryBlue}`}
          >
            Empowering Our Community Through Digital Efficiency
          </h1>

          <p className="mt-6 text-base leading-7 text-slate-600">
            Access essential barangay services, track applications, and stay
            informed—all in one unified platform designed for the modern San
            Isidro resident.
          </p>
        </div>
      </div>
    </section>
  );
}
