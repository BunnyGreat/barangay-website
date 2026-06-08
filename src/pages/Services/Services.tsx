import ServicesHero from "../../components/ServicesHero/ServicesHero";
import ServiceFeatureSection from "../../components/ServiceFeatureSection/ServiceFeatureSection";
import ServiceGridSection from "../../components/ServiceGridSection/ServiceGridSection";
import Footer from "../../components/Footer/Footer";
import useDarkMode from "../../hooks/useDarkMode";

export default function Services() {
  const isDark = useDarkMode();
  return (
    <section style={{ backgroundColor: isDark ? "#0C1320" : undefined }}>
      <ServicesHero />
      <ServiceFeatureSection />
      <ServiceGridSection />
      <Footer />
    </section>
  );
}
