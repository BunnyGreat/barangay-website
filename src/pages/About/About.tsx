import AboutHero from "../../components/AboutHero/AboutHero";
import VisionMission from "../../components/VisionMission/VisionMission";
import OfficialsSection from "../../components/OfficialsSection/OfficialsSection";
import DevelopmentTeam from "../../components/DevelopmentTeam/DevelopmentTeam";
import CTA from "../../components/CTA/CTA";
import Footer from "../../components/Footer/Footer";

export default function About() {
  return (
    <>
      <AboutHero />
      <VisionMission />
      <OfficialsSection />
      <DevelopmentTeam />

      <section className="mt-10 mb-10 px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <CTA
            title="Dedicated to Serving San Isidro"
            description="Our administration works tirelessly to ensure that every resident has access to the resources they need to thrive.."
          />
        </div>
      </section>

      <Footer />
    </>
  );
}
