import IdIcon from "../../assets/icons/id.svg";
import documentsSmallIcon from "../../assets/icons/document.svg";
import ServiceFeatureCard from "../ServiceFeatureCard/ServiceFeatureCard";
import featuredImage from "../../assets/images/officials/1.jpg";
// removed unused useDarkMode import

type FeaturedService = {
  icon: string;
  title: string;
  description: string;
  image?: string;
  badges?: string[];
  variant?: "light" | "primary";
};

const featuredServices: FeaturedService[] = [
  {
    icon: IdIcon,
    title: "Resident Information Management",
    description:
      "Securely update and manage your household profile. Our encrypted database ensures your personal data is handled with the highest standards of privacy and administrative accuracy.",
    image: featuredImage,
    badges: ["Data Secured", "Fully Encrypted"],
    variant: "light",
  },
  {
    icon: documentsSmallIcon,
    title: "Certificate Processing",
    description:
      "Apply for Barangay Clearance, Indigency, and Residency online. Skip lines and view digital copies directly.",
    variant: "primary",
  },
];

export default function ServiceFeatureSection() {
  return (
    <section
      className="px-6 py-6 sm:px-8 lg:px-12 transition-colors duration-200"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-[1.45fr_1fr] gap-6 items-stretch">
          {featuredServices.map((service) => (
            <ServiceFeatureCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              image={service.image}
              badges={service.badges}
              variant={service.variant}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
