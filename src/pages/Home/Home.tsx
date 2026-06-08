import Hero from "../../components/Hero/Hero";
import ServicesSection from "../../components/ServicesSection/ServicesSection";
import CTA from "../../components/CTA/CTA";
import Footer from "../../components/Footer/Footer";
import useDarkMode from "../../hooks/useDarkMode";
import { DARK_COLORS } from "../../utils/constants";

export default function Home() {
  const isDark = useDarkMode();
  return (
    <>
      <Hero />
      <ServicesSection />

      <section
        className="px-6 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16"
        style={{
          backgroundColor: isDark ? DARK_COLORS.ctaBackground : undefined,
        }}
      >
        <div className="mx-auto max-w-7xl">
          <CTA />
        </div>
      </section>

      <Footer />
    </>
  );
}
