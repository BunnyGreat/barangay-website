import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { buttonClassNames, DARK_COLORS } from "../../utils/constants";
import useDarkMode from "../../hooks/useDarkMode";
import sendIcon from "../../assets/icons/send.svg";

type FormData = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;
type SubmissionStatus = {
  type: "success" | "error" | "rate-limit";
  message: string;
} | null;

const initialFormData: FormData = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

const gmailPattern =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail\.com$/i;

function isApiResponse(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isFormField(name: string): name is keyof FormData {
  return (
    name === "fullName" ||
    name === "email" ||
    name === "subject" ||
    name === "message"
  );
}

export default function ContactForm() {
  const isDark = useDarkMode();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmissionStatus>(null);
  const submissionInProgress = useRef(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const normalizedEmail = formData.email.trim().toLowerCase();

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!normalizedEmail) {
      newErrors.email = "Email Address is required";
    } else if (
      !gmailPattern.test(normalizedEmail) ||
      normalizedEmail.split("@")[0].startsWith(".") ||
      normalizedEmail.split("@")[0].endsWith(".") ||
      normalizedEmail.split("@")[0].includes("..")
    ) {
      newErrors.email = "Enter a valid Gmail address ending in @gmail.com.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    if (!isFormField(name)) {
      return;
    }
    const field = name;

    setFormData((previous) => ({ ...previous, [field]: value }));
    setStatus(null);

    if (errors[field]) {
      setErrors((previous) => ({ ...previous, [field]: undefined }));
    }
  };

  const sendContactMessage = async () => {
    const identityResponse = await fetch("/api/contact", {
      method: "GET",
      credentials: "same-origin",
    });
    if (!identityResponse.ok) {
      throw new Error(
        "The contact service is not available. Please try again later.",
      );
    }

    const payload = JSON.stringify({
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    });

    let response = await fetch("/api/contact", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: payload,
    });

    if (response.status === 428) {
      response = await fetch("/api/contact", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });
    }

    let result: unknown;
    try {
      result = await response.json();
    } catch {
      throw new Error(
        "The server returned an invalid response. Please try again later.",
      );
    }
    return { response, result };
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submissionInProgress.current || !validateForm()) {
      return;
    }

    submissionInProgress.current = true;
    setIsSubmitting(true);
    setStatus(null);

    try {
      const { response, result } = await sendContactMessage();
      const responseMessage =
        isApiResponse(result) && typeof result.error === "string"
          ? result.error
          : "Your message could not be sent. Please try again later.";

      if (response.status === 429) {
        const resetAt =
          isApiResponse(result) && typeof result.resetAt === "string"
            ? result.resetAt
            : null;
        const resetLabel = resetAt
          ? new Intl.DateTimeFormat("en-PH", {
              timeZone: "Asia/Manila",
              dateStyle: "long",
              timeStyle: "short",
            }).format(new Date(resetAt))
          : null;

        setStatus({
          type: "rate-limit",
          message: resetLabel
            ? `You have already sent a message today. You can submit again after ${resetLabel} (Philippine time).`
            : responseMessage,
        });
        return;
      }

      if (!response.ok) {
        throw new Error(responseMessage);
      }

      setFormData(initialFormData);
      setErrors({});
      setStatus({
        type: "success",
        message:
          "Your message was accepted for delivery. Thank you for contacting us.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Your message could not be sent. Please try again later.",
      });
    } finally {
      submissionInProgress.current = false;
      setIsSubmitting(false);
    }
  };

  const fieldClassName = `contact-form-field mt-2 w-full rounded-lg border px-4 py-3 text-sm transition focus:outline-none focus:ring-2 ${
    isDark
      ? "border-[rgba(65,71,83,0.6)] bg-[#070E1B] text-[#E1E3E4] placeholder:text-[#9AA3B2] focus:border-[#AAC7FF] focus:ring-[rgba(170,199,255,0.5)]"
      : "border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-500 focus:border-[#004E9F] focus:ring-[#004E9F]/50"
  }`;
  const fieldStyle = {
    colorScheme: isDark ? "dark" : "light",
    color: isDark ? DARK_COLORS.heading : "#0f172a",
    backgroundColor: isDark ? "#070E1B" : "#f8fafc",
  } as const;
  const labelStyle = { color: isDark ? DARK_COLORS.heading : "#334155" };
  const fieldErrorClass = isDark ? "text-red-300" : "text-red-600";

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
          Use this form for general questions or suggestions. Email delivery
          depends on the deployed contact service configuration; do not use the
          form for emergencies or include sensitive information.
        </p>

        {status && (
          <div
            role={status.type === "error" ? "alert" : "status"}
            aria-live="polite"
            className={`mt-6 rounded-lg border p-4 text-sm ${
              status.type === "success"
                ? isDark
                  ? "border-green-900 bg-green-950 text-green-200"
                  : "border-green-200 bg-green-50 text-green-700"
                : status.type === "rate-limit"
                  ? isDark
                    ? "border-amber-900 bg-amber-950 text-amber-200"
                    : "border-amber-200 bg-amber-50 text-amber-800"
                  : isDark
                    ? "border-red-900 bg-red-950 text-red-200"
                    : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
          <fieldset disabled={isSubmitting} className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold"
                style={labelStyle}
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                maxLength={120}
                autoComplete="name"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Juan Dela Cruz"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                data-theme={isDark ? "dark" : "light"}
                style={fieldStyle}
                className={`${fieldClassName} ${errors.fullName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
              />
              {errors.fullName && (
                <p id="fullName-error" className={`mt-1 text-xs ${fieldErrorClass}`}>
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold"
                style={labelStyle}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                maxLength={254}
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="juan@gmail.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                data-theme={isDark ? "dark" : "light"}
                style={fieldStyle}
                className={`${fieldClassName} ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
              />
              {errors.email && (
                <p id="email-error" className={`mt-1 text-xs ${fieldErrorClass}`}>
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-semibold"
                style={labelStyle}
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                maxLength={200}
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                data-theme={isDark ? "dark" : "light"}
                style={fieldStyle}
                className={`${fieldClassName} ${errors.subject ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
              />
              {errors.subject && (
                <p id="subject-error" className={`mt-1 text-xs ${fieldErrorClass}`}>
                  {errors.subject}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold"
                style={labelStyle}
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help you..."
                rows={6}
                maxLength={5000}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                data-theme={isDark ? "dark" : "light"}
                style={fieldStyle}
                className={`${fieldClassName} ${errors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
              />
              {errors.message && (
                <p id="message-error" className={`mt-1 text-xs ${fieldErrorClass}`}>
                  {errors.message}
                </p>
              )}
            </div>
          </fieldset>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${buttonClassNames.basePill} ${buttonClassNames.heroPrimary} inline-flex items-center gap-2 disabled:cursor-wait disabled:opacity-70`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <img
                src={sendIcon}
                alt=""
                aria-hidden="true"
                className="h-4 w-4"
              />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
