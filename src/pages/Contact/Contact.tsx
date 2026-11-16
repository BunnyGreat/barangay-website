import Footer from "../../components/Footer/Footer";
import ContactHero from "../../components/ContactHero/ContactHero";
import FAQSection from "../../components/FAQSection/FAQSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import EmergencyHotlines from "../../components/EmergencyHotlines/EmergencyHotlines";
import useDarkMode from "../../hooks/useDarkMode";

export default function Contact() {
  const isDark = useDarkMode();
  return (
    <section style={{ backgroundColor: isDark ? "#0C1320" : undefined }}>
      <ContactHero />
      <FAQSection />
      <EmergencyHotlines />
      <ContactSection />
      <Footer />
    </section>
  );
}
