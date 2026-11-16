import documentsIcon from "../../assets/icons/document.svg";
import ServiceFeatureCard from "../ServiceFeatureCard/ServiceFeatureCard";

export default function ServiceFeatureSection() {
  return (
    <section className="px-6 py-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <ServiceFeatureCard
          icon={documentsIcon}
          title="Online service requests are not available here"
          description="This website does not support online document applications, payments, or request tracking. Contact the barangay office to confirm current requirements and procedures."
          buttonText="Contact the Barangay"
          buttonHref="/contact"
          variant="primary"
        />
      </div>
    </section>
  );
}
