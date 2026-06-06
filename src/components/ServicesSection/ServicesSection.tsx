import ServiceCard from "../ServiceCard/ServiceCard";
import documentsIcon from "../../assets/icons/documents.svg";
import megaphoneIcon from "../../assets/icons/megaphone.svg";
import questionIcon from "../../assets/icons/question.svg";
import shieldIcon from "../../assets/icons/shield.svg";
import notificationIcon from "../../assets/icons/notification.svg";
import Star from "../../assets/icons/star.svg";
import shieldTwo from "../../assets/icons/shield-2.svg";
import arrowRightIcon from "../../assets/icons/arrow-right-2.svg";
export default function ServicesSection() {
  return (
    <section className="bg-slate-50 px-6 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#004E9F]">
            Barangay Services
          </p>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            The Future of Barangay Services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Our unified digital management system is designed to bridge the gap
            between traditional authority and modern efficiency.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-6">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-[24px] bg-slate-100 text-slate-900">
                  <img src={Star} alt="Verified icon" className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900">
                    Citizen Service Excellence
                  </h3>
                  <p className="mt-2 text-sm font-medium text-[#004E9F]">
                    Streamlined Digital Governance
                  </p>
                </div>
              </div>
              <div className="max-w-2xl text-sm leading-7 text-slate-600">
                <p className="mt-3">
                  Our digital ecosystem is built to serve you better. We've
                  optimized our core processes to ensure every resident has
                  instant access to essential barangay services without the
                  wait.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <ServiceCard
                title="Document Requests"
                description="Fast-track permits and certificates online."
                icon={documentsIcon}
                className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-none"
                iconWrapperClassName="h-10 w-10 rounded-2xl bg-white text-[#004E9F]"
                titleClassName="mb-2 text-base font-semibold text-slate-900"
                descriptionClassName="text-sm text-slate-600"
              />
              <ServiceCard
                title="Community News"
                description="Stay updated with verified local announcements."
                icon={megaphoneIcon}
                className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-none"
                iconWrapperClassName="h-10 w-10 rounded-2xl bg-white text-[#004E9F]"
                titleClassName="mb-2 text-base font-semibold text-slate-900"
                descriptionClassName="text-sm text-slate-600"
              />
            </div>

            <div className="mt-8 text-sm text-[#004E9F]">
              <div className="inline-flex items-center gap-3">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#E5F2FF] text-[#004E9F]">
                  <img src={questionIcon} alt="Info icon" className="h-4 w-4" />
                </div>
                <span>
                  All services are secured with enterprise-grade encryption.
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] bg-[#004E9F] p-8 text-white shadow-sm ring-1 ring-white/10">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/10 text-white">
              <img
                src={shieldIcon}
                alt="Data protection icon"
                className="h-6 w-6"
              />
            </div>
            <h3 className="mt-6 text-2xl font-semibold">Data Integrity</h3>
            <p className="mt-4 text-sm leading-7 text-slate-100">
              We take your privacy seriously. By using powerful data scramblers
              and blockchain security, we make sure citizen records are always
              protected. Your information is kept safe and untouched, exactly
              where it belongs.
            </p>
            <p className="mt-6 text-sm italic text-slate-200/90">
              "Trust through transparency."
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.5fr]">
          <ServiceCard
            title="Health Services"
            description="Direct link to local clinic schedules and vaccination records."
            icon={shieldTwo}
            className="rounded-[28px] bg-slate-100 p-8 shadow-none"
            iconWrapperClassName="h-14 w-14 rounded-[20px] bg-white text-[#004E9F]"
            titleClassName="mt-6 text-xl font-semibold text-slate-900"
            descriptionClassName="mt-3 text-sm leading-7 text-slate-600"
          />

          <div className="rounded-[28px] border border-slate-200 bg-white p-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                Real-time Alerts
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
                Instant notifications for emergency announcements and community
                events.
              </p>
              <a
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#004E9F]"
                href="#"
              >
                View Alerts{" "}
                <img src={arrowRightIcon} alt="Arrow" className="h-4 w-4" />
              </a>
            </div>
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#EAF3FF]">
              <img
                src={notificationIcon}
                alt="Alerts icon"
                className="h-10 w-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
