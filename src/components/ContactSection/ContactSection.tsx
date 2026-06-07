import ContactInfoCard from "../ContactInfoCard/ContactInfoCard";
import CommunitySupportCard from "../CommunitySupportCard/CommunitySupportCard";
import ContactForm from "../ContactForm/ContactForm";

export default function ContactSection() {
  return (
    <section className="px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8">
          <div className="flex flex-col gap-8">
            <ContactInfoCard />
            <CommunitySupportCard />
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
