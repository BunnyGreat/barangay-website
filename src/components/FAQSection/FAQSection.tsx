import FAQItem from "../FAQItem/FAQItem";

type FAQ = {
  question: string;
  answer: string;
};

const faqData: FAQ[] = [
  {
    question: "What information is available on this website?",
    answer:
      "You can read about Barangay San Isidro, view the listed barangay officials and committee assignments, and find contact information and emergency hotlines.",
  },
  {
    question: "Can I apply for barangay documents online?",
    answer:
      "This website does not currently offer online document applications, payments, or request tracking. Contact the barangay office to confirm current requirements and procedures.",
  },
  {
    question: "How can I send an inquiry?",
    answer:
      "Use the contact form on this page. Email delivery depends on the deployed contact service configuration. For urgent matters, use the listed emergency hotlines instead.",
  },
  {
    question: "Is there an Android application?",
    answer:
      "A downloadable Android application package is available from the navigation menu and Services page. APK installation requires a compatible Android device.",
  },
];

export default function FAQSection() {
  return (
    <section
      className="px-6 mb-6 sm:px-8 lg:px-12"
      style={{ backgroundColor: "transparent" }}
    >
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
