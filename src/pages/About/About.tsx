import AboutHero from "../../components/AboutHero/AboutHero";
import VisionMission from "../../components/VisionMission/VisionMission";
import OfficialsSection from "../../components/OfficialsSection/OfficialsSection";
import DevelopmentTeam from "../../components/DevelopmentTeam/DevelopmentTeam";
import CTA from "../../components/CTA/CTA";
import Footer from "../../components/Footer/Footer";
import useDarkMode from "../../hooks/useDarkMode";
import { DARK_COLORS } from "../../utils/constants";

export default function About() {
  const isDark = useDarkMode();
  return (
    <>
      <AboutHero />
      <VisionMission />
      <OfficialsSection />
      <DevelopmentTeam />

      <section
        className="px-6 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16"
        style={{
          backgroundColor: isDark ? DARK_COLORS.ctaBackground : undefined,
        }}
      >
        <div className="mx-auto max-w-7xl">
          <CTA
            title="Contact Barangay San Isidro"
            description="View contact information, emergency hotlines, and the available inquiry form."
          />
        </div>
      </section>

      <Footer />
    </>
  );
}
