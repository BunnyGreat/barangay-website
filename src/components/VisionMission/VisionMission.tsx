import { bgClassNames, textClassNames } from "../../utils/constants";
import MissionIcon from "../../assets/icons/mission.svg";
import VisionIcon from "../../assets/icons/vision.svg";

export default function VisionMission() {
  return (
    <section className="bg-slate-50 px-6 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[32px] bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-5">
                <div
                  className={`${bgClassNames.accentGold} flex h-16 w-16 items-center justify-center rounded-3xl shadow-sm`}
                >
                  <img src={VisionIcon} alt="Vision icon" className="h-6 w-6" />
                </div>
                <div>
                  <p
                    className={`text-sm font-semibold uppercase tracking-[0.35em] ${textClassNames.primaryBlue}`}
                  >
                    Our Vision
                  </p>
                  <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                    A progressive, peaceful, and united barangay with
                    responsible citizens, a clean environment, sustainable
                    development, and equal opportunities that improve the
                    quality of life for all members of the community.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border-l-4 border-[#004E9F] bg-slate-100 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#004E9F]">
                    TARGET 2030
                  </p>
                  <p className="mt-3 text-lg font-semibold text-slate-900">
                    100% Digital Literacy
                  </p>
                </div>

                <div className="rounded-[24px] border-l-4 border-[#FCD400] bg-slate-100 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-900">
                    ECO-STANDARD
                  </p>
                  <p className="mt-3 text-lg font-semibold text-slate-900">
                    Zero-Waste Barangay
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${bgClassNames.primaryBlue} rounded-[32px] p-8 text-white shadow-sm`}
          >
            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 shadow-sm">
                  <img
                    src={MissionIcon}
                    alt="Mission icon"
                    className="h-6 w-6"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/80">
                    Our Mission
                  </p>
                  <p className="mt-4 max-w-xl text-base leading-7 text-white/90">
                    To provide efficient and transparent public service, promote
                    peace and order, protect the environment, support education
                    and livelihood programs, and encourage active community
                    participation in achieving a safe, healthy, and prosperous
                    barangay for present and future generations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
