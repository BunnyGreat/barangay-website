import { useState } from "react";
import { buttonClassNames } from "../../utils/constants";
import arrowRightIcon from "../../assets/icons/arrow-right.svg";

type FormData = {
  fullName: string;
  email: string;
  message: string;
};

type FormErrors = Partial<FormData>;

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitted(true);
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        message: "",
      });

      // Hide success message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold text-slate-900">
          Send us a Message
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Have a specific question or suggestion? Fill out the form below and
          our administrative team will get back to you within 24–48 hours.
        </p>

        {submitted && (
          <div className="mt-6 rounded-lg bg-green-50 p-4 text-sm text-green-700 border border-green-200">
            Thank you for your message! We'll get back to you soon.
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-semibold text-slate-900"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Juan Dela Cruz"
              className={`mt-2 w-full rounded-lg border bg-slate-50 px-4 py-3 text-sm placeholder-slate-400 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004E9F]/50 ${
                errors.fullName
                  ? "border-red-300 focus:ring-red-500/50"
                  : "border-slate-200"
              }`}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-slate-900"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="juan.dc@example.com"
              className={`mt-2 w-full rounded-lg border bg-slate-50 px-4 py-3 text-sm placeholder-slate-400 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004E9F]/50 ${
                errors.email
                  ? "border-red-300 focus:ring-red-500/50"
                  : "border-slate-200"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-slate-900"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us how we can help you..."
              rows={6}
              className={`mt-2 w-full rounded-lg border bg-slate-50 px-4 py-3 text-sm placeholder-slate-400 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004E9F]/50 ${
                errors.message
                  ? "border-red-300 focus:ring-red-500/50"
                  : "border-slate-200"
              }`}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-600">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className={`${buttonClassNames.basePill} ${buttonClassNames.heroPrimary} inline-flex items-center gap-2`}
            >
              Send Message
              <img src={arrowRightIcon} alt="Send" className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
