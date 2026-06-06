import Hero from "../../components/Hero/Hero";
import ServicesSection from "../../components/ServicesSection/ServicesSection";
import CTA from "../../components/CTA/CTA";
import Footer from "../../components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />

      <section className="mt-10 mb-10 px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <CTA />
        </div>
      </section>

      <Footer />
    </>
  );
}
