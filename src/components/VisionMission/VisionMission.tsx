import { DARK_COLORS } from "../../utils/constants";
import useDarkMode from "../../hooks/useDarkMode";
import MissionIcon from "../../assets/icons/mission.svg";
import VisionIcon from "../../assets/icons/vision.svg";

export default function VisionMission() {
  const isDark = useDarkMode();
  return (
    <section
      className="px-6 py-16 sm:px-8 lg:px-12 transition-colors duration-200"
      style={{
        backgroundColor: isDark ? "#0C1320" : "#f9fafb",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div
            className="rounded-[32px] p-8 shadow-sm transition-colors duration-200"
            style={{
              backgroundColor: isDark ? "#151C29" : "#ffffff",
              boxShadow: isDark
                ? `0 0 0 1px rgba(65,71,83,0.3)`
                : "0 0 0 1px #e2e8f0",
            }}
          >
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-5">
                  <div
                    className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-3xl shadow-sm transition-colors duration-200`}
                    style={{
                      backgroundColor: isDark ? "#FCD400" : "#FCD400",
                    }}
                  >
                    <img
                      src={VisionIcon}
                      alt="Vision icon"
                      className="h-6 w-6"
                    />
                  </div>
                  <p
                    className={`text-sm font-semibold uppercase tracking-[0.35em] transition-colors duration-200`}
                    style={{ color: isDark ? "#4D94FF" : "#004E9F" }}
                  >
                    Our Vision
                  </p>
                </div>
                <p
                  className="max-w-xl text-base leading-7 transition-colors duration-200"
                  style={{
                    color: isDark ? DARK_COLORS.paragraph : "#4b5563",
                  }}
                >
                  A progressive, peaceful, and united barangay with responsible
                  citizens, a clean environment, sustainable development, and
                  equal opportunities that improve the quality of life for all
                  members of the community.
                </p>
              </div>

            </div>
          </div>

          <div
            className={`rounded-[32px] p-8 text-white shadow-sm transition-colors duration-200`}
            style={{
              backgroundColor: isDark ? "#00458E" : "#004E9F",
              boxShadow: isDark
                ? `0 0 0 1px rgba(65,71,83,0.3)`
                : "0 0 0 1px rgba(255,255,255,0.1)",
            }}
          >
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-5">
                  <div
                    className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-3xl shadow-sm transition-colors duration-200"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(255,255,255,0.1)",
                    }}
                  >
                    <img
                      src={MissionIcon}
                      alt="Mission icon"
                      className="h-6 w-6"
                    />
                  </div>
                  <p
                    className="text-sm font-semibold uppercase tracking-[0.35em] transition-colors duration-200"
                    style={{
                      color: isDark
                        ? "rgba(255,255,255,0.7)"
                        : "rgba(255,255,255,0.8)",
                    }}
                  >
                    Our Mission
                  </p>
                </div>
                <p
                  className="max-w-xl text-base leading-7 transition-colors duration-200"
                  style={{
                    color: isDark
                      ? "rgba(255,255,255,0.8)"
                      : "rgba(255,255,255,0.9)",
                  }}
                >
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
    </section>
  );
}
