export default function ContactHero() {
  return (
    <section className="bg-slate-50 px-6 mb-6 mt-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl text-center">
        <span
          className={`inline-flex rounded-full border border-[#0066CC]/20 bg-[#0066CC]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#0066CC]`}
        >
          Support & Inquiries
        </span>

        <h1 className="mt-8 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Frequently Asked Questions
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600">
          Find quick answers to common inquiries regarding the Barangay San
          Isidro Unified Management System.
        </p>
      </div>
    </section>
  );
}
