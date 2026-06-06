export default function CTA() {
  return (
    <section className="relative overflow-hidden rounded-[32px] bg-[#0752B0] px-8 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
      <div className="pointer-events-none absolute left-0 top-0 h-28 w-28 rounded-br-[100px] bg-white/10" />
      <div className="mx-auto max-w-5xl text-center text-white">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Dedicated to Serving San Isidro
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
          Our administration works tirelessly to ensure that every resident has access to the resources they need to thrive.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <a
            href="#"
            className="inline-flex rounded-full bg-[#9A7C00] px-8 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_-30px_rgba(154,124,0,0.75)] transition hover:bg-[#8F7200]"
          >
            Contact Our Office
          </a>
          <a
            href="#"
            className="inline-flex rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#004E9F] transition hover:bg-slate-100"
          >
            View Citizen Charter
          </a>
        </div>
      </div>
    </section>
  );
}
