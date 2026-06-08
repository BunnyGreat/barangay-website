import { useState } from "react";
import { buttonClassNames, DARK_COLORS } from "../../utils/constants";
import useDarkMode from "../../hooks/useDarkMode";
import arrowRightIcon from "../../assets/icons/arrow-right.svg";

type FormData = {
  fullName: string;
  email: string;
  message: string;
};

type FormErrors = Partial<FormData>;

export default function ContactForm() {
  const isDark = useDarkMode();
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
    <section
      className="rounded-2xl border p-8 shadow-sm transition-colors duration-200"
      style={{
        backgroundColor: isDark ? "#0C1320" : "#ffffff",
        borderColor: isDark ? "rgba(65,71,83,0.3)" : "#e2e8f0",
      }}
    >
      <div className="max-w-2xl">
        <h2
          className="text-3xl font-semibold"
          style={{ color: isDark ? DARK_COLORS.heading : undefined }}
        >
          Send us a Message
        </h2>
        <p
          className="mt-4 text-base leading-7"
          style={{ color: isDark ? DARK_COLORS.paragraph : undefined }}
        >
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
              className="block text-sm font-semibold"
              style={{ color: isDark ? DARK_COLORS.heading : undefined }}
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
              className={`mt-2 w-full rounded-lg border ${isDark ? "" : "bg-slate-50"} px-4 py-3 text-sm placeholder-slate-400 transition focus:bg-white focus:outline-none focus:ring-2 ${isDark ? "focus:ring-[rgba(170,199,255,0.5)]" : "focus:ring-[#004E9F]/50"} ${isDark ? "border-[rgba(65,71,83,0.3)]" : "border-slate-200"}`}
              style={{
                backgroundColor: isDark ? "#070E1B" : undefined,
                borderColor: isDark ? "rgba(65,71,83,0.3)" : undefined,
                color: isDark ? "#ffffff" : undefined,
              }}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold"
              style={{ color: isDark ? DARK_COLORS.heading : undefined }}
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
              className={`mt-2 w-full rounded-lg border ${isDark ? "" : "bg-slate-50"} px-4 py-3 text-sm placeholder-slate-400 transition focus:bg-white focus:outline-none focus:ring-2 ${isDark ? "focus:ring-[rgba(170,199,255,0.5)]" : "focus:ring-[#004E9F]/50"} ${isDark ? "border-[rgba(65,71,83,0.3)]" : "border-slate-200"}`}
              style={{
                backgroundColor: isDark ? "#070E1B" : undefined,
                borderColor: isDark ? "rgba(65,71,83,0.3)" : undefined,
                color: isDark ? "#ffffff" : undefined,
              }}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold"
              style={{ color: isDark ? DARK_COLORS.heading : undefined }}
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
              className={`mt-2 w-full rounded-lg border ${isDark ? "" : "bg-slate-50"} px-4 py-3 text-sm placeholder-slate-400 transition focus:bg-white focus:outline-none focus:ring-2 ${isDark ? "focus:ring-[rgba(170,199,255,0.5)]" : "focus:ring-[#004E9F]/50"} ${isDark ? "border-[rgba(65,71,83,0.3)]" : "border-slate-200"}`}
              style={{
                backgroundColor: isDark ? "#070E1B" : undefined,
                borderColor: isDark ? "rgba(65,71,83,0.3)" : undefined,
                color: isDark ? "#ffffff" : undefined,
              }}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-600">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className={`${buttonClassNames.basePill} inline-flex items-center gap-2`}
              style={{
                backgroundColor: isDark ? "#4D94FF" : undefined,
                color: isDark ? "#000000" : undefined,
              }}
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
