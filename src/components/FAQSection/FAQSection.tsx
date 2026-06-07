import FAQItem from "../FAQItem/FAQItem";

type FAQ = {
  question: string;
  answer: string;
};

const faqData: FAQ[] = [
  {
    question: "What is the Unified Management System?",
    answer:
      "The Unified Management System is a comprehensive digital platform designed to streamline barangay services and improve citizen engagement. It provides residents with easy access to permits, certificates, announcements, and community information all in one place.",
  },
  {
    question: "How do I use the mobile application?",
    answer:
      "The mobile application allows you to access barangay services anytime, anywhere. Simply download the app, create an account with your barangay ID or personal information, and you can submit requests, track applications, and receive real-time notifications.",
  },
  {
    question: "Can I request official documents online?",
    answer:
      "Yes, you can request official documents such as Barangay Clearance, Indigency Certificate, and Residency Certificate online through the system. Submit your request, pay the applicable fee, and receive your digital copies instantly.",
  },
  {
    question: "How secure is my personal data?",
    answer:
      "We prioritize data security with enterprise-grade encryption and blockchain technology. All personal information is stored securely and handled according to the highest standards of privacy and data protection regulations.",
  },
];

export default function FAQSection() {
  return (
    <section className="px-6 mb-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <div className="space-y-4">
          {faqData.map((faq) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
