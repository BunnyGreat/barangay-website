import { useRef, useState } from "react";
import type {
  ChangeEvent,
  ChangeEventHandler,
  CSSProperties,
  Dispatch,
  FormEvent,
  SetStateAction,
} from "react";
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
const manilaDateTimeFormatter = new Intl.DateTimeFormat("en-PH", {
  timeZone: "Asia/Manila",
  dateStyle: "long",
  timeStyle: "short",
});
const statusClassNames = {
  success: {
    dark: "border-green-900 bg-green-950 text-green-200",
    light: "border-green-200 bg-green-50 text-green-700",
  },
  "rate-limit": {
    dark: "border-amber-900 bg-amber-950 text-amber-200",
    light: "border-amber-200 bg-amber-50 text-amber-800",
  },
  error: {
    dark: "border-red-900 bg-red-950 text-red-200",
    light: "border-red-200 bg-red-50 text-red-700",
  },
} as const;

type ContactFormFieldProps = {
  id: keyof FormData;
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  error?: string;
  isDark: boolean;
  fieldClassName: string;
  fieldStyle: CSSProperties;
  labelStyle: CSSProperties;
  fieldErrorClass: string;
  placeholder: string;
  maxLength: number;
  type?: "text" | "email";
  autoComplete?: string;
  rows?: number;
};

function ContactFormField({
  id,
  label,
  value,
  onChange,
  error,
  isDark,
  fieldClassName,
  fieldStyle,
  labelStyle,
  fieldErrorClass,
  placeholder,
  maxLength,
  type = "text",
  autoComplete,
  rows,
}: ContactFormFieldProps) {
  const controlProps = {
    id,
    name: id,
    required: true,
    maxLength,
    value,
    onChange,
    placeholder,
    autoComplete,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${id}-error` : undefined,
    "data-theme": isDark ? "dark" : "light",
    style: fieldStyle,
    className: `${fieldClassName} ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`,
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold"
        style={labelStyle}
      >
        {label}
      </label>
      {rows ? (
        <textarea {...controlProps} rows={rows} />
      ) : (
        <input {...controlProps} type={type} />
      )}
      {error ? (
        <p id={`${id}-error`} className={`mt-1 text-xs ${fieldErrorClass}`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

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

function validateForm(formData: FormData): FormErrors {
  const errors: FormErrors = {};
  const normalizedEmail = formData.email.trim().toLowerCase();
  const localPart = normalizedEmail.split("@")[0] ?? "";

  if (!formData.fullName.trim()) {
    errors.fullName = "Full Name is required";
  }

  if (!normalizedEmail) {
    errors.email = "Email Address is required";
  } else if (
    !gmailPattern.test(normalizedEmail) ||
    localPart.startsWith(".") ||
    localPart.endsWith(".") ||
    localPart.includes("..")
  ) {
    errors.email = "Enter a valid Gmail address ending in @gmail.com.";
  }

  if (!formData.subject.trim()) {
    errors.subject = "Subject is required";
  }

  if (!formData.message.trim()) {
    errors.message = "Message is required";
  }

  return errors;
}

function getApiErrorMessage(result: unknown) {
  return isApiResponse(result) && typeof result.error === "string"
    ? result.error
    : "Your message could not be sent. Please try again later.";
}

async function readApiResponse(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    throw new Error(
      "The server returned an invalid response. Please try again later.",
    );
  }
}

async function sendContactMessage(formData: FormData) {
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
  const requestOptions: RequestInit = {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: payload,
  };

  let response = await fetch("/api/contact", requestOptions);
  if (response.status === 428) {
    response = await fetch("/api/contact", requestOptions);
  }

  if (!response.ok && response.status !== 429) {
    const result = await readApiResponse(response);
    throw new Error(getApiErrorMessage(result));
  }

  const result = await readApiResponse(response);
  return { response, result };
}

function createRateLimitStatus(result: unknown): NonNullable<SubmissionStatus> {
  const resetAt =
    isApiResponse(result) && typeof result.resetAt === "string"
      ? result.resetAt
      : null;
  const resetLabel = resetAt
    ? manilaDateTimeFormatter.format(new Date(resetAt))
    : null;

  return {
    type: "rate-limit",
    message: resetLabel
      ? `You have already sent a message today. You can submit again after ${resetLabel} (Philippine time).`
      : getApiErrorMessage(result),
  };
}

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "Your message could not be sent. Please try again later.";
}

function getContactFormTheme(isDark: boolean) {
  return {
    fieldClassName: `contact-form-field mt-2 w-full rounded-lg border px-4 py-3 text-sm transition focus:outline-none focus:ring-2 ${
      isDark
        ? "border-[rgba(65,71,83,0.6)] bg-[#070E1B] text-[#E1E3E4] placeholder:text-[#9AA3B2] focus:border-[#AAC7FF] focus:ring-[rgba(170,199,255,0.5)]"
        : "border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-500 focus:border-[#004E9F] focus:ring-[#004E9F]/50"
    }`,
    fieldStyle: {
      colorScheme: isDark ? "dark" : "light",
      color: isDark ? DARK_COLORS.heading : "#0f172a",
      backgroundColor: isDark ? "#070E1B" : "#f8fafc",
    } satisfies CSSProperties,
    labelStyle: {
      color: isDark ? DARK_COLORS.heading : "#334155",
    } satisfies CSSProperties,
    fieldErrorClass: isDark ? "text-red-300" : "text-red-600",
    sectionStyle: {
      backgroundColor: isDark ? "#0C1320" : "#ffffff",
      borderColor: isDark ? "rgba(65,71,83,0.3)" : "#e2e8f0",
    },
    headingStyle: { color: isDark ? DARK_COLORS.heading : undefined },
    descriptionStyle: { color: isDark ? DARK_COLORS.paragraph : undefined },
  };
}

type ContactFormSetters = {
  setFormData: Dispatch<SetStateAction<FormData>>;
  setErrors: Dispatch<SetStateAction<FormErrors>>;
  setStatus: Dispatch<SetStateAction<SubmissionStatus>>;
};

function handleContactFieldChange(
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  errors: FormErrors,
  { setFormData, setErrors, setStatus }: ContactFormSetters,
) {
  const { name, value } = event.target;
  if (!isFormField(name)) {
    return;
  }

  setFormData((previous) => ({ ...previous, [name]: value }));
  setStatus(null);

  if (errors[name]) {
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  }
}

async function submitContactForm({
  event,
  formData,
  submissionInProgress,
  setFormData,
  setErrors,
  setIsSubmitting,
  setStatus,
}: {
  event: FormEvent<HTMLFormElement>;
  formData: FormData;
  submissionInProgress: { current: boolean };
  setFormData: ContactFormSetters["setFormData"];
  setErrors: ContactFormSetters["setErrors"];
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  setStatus: ContactFormSetters["setStatus"];
}) {
  event.preventDefault();

  if (submissionInProgress.current) {
    return;
  }

  const nextErrors = validateForm(formData);
  setErrors(nextErrors);
  if (Object.keys(nextErrors).length > 0) {
    return;
  }

  submissionInProgress.current = true;
  setIsSubmitting(true);
  setStatus(null);

  try {
    const { response, result } = await sendContactMessage(formData);
    if (response.status === 429) {
      setStatus(createRateLimitStatus(result));
      return;
    }

    setFormData(initialFormData);
    setErrors({});
    setStatus({
      type: "success",
      message:
        "Your message was accepted for delivery. Thank you for contacting us.",
    });
  } catch (error) {
    setStatus({ type: "error", message: getErrorMessage(error) });
  } finally {
    submissionInProgress.current = false;
    setIsSubmitting(false);
  }
}

function SubmissionStatusNotice({
  status,
  isDark,
}: {
  status: NonNullable<SubmissionStatus>;
  isDark: boolean;
}) {
  return (
    <div
      role={status.type === "error" ? "alert" : "status"}
      aria-live="polite"
      className={`mt-6 rounded-lg border p-4 text-sm ${statusClassNames[status.type][isDark ? "dark" : "light"]}`}
    >
      {status.message}
    </div>
  );
}

export default function ContactForm() {
  const isDark = useDarkMode();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmissionStatus>(null);
  const submissionInProgress = useRef(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) =>
    handleContactFieldChange(event, errors, {
      setFormData,
      setErrors,
      setStatus,
    });
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    void submitContactForm({
      event,
      formData,
      submissionInProgress,
      setFormData,
      setErrors,
      setIsSubmitting,
      setStatus,
    });
  };
  const theme = getContactFormTheme(isDark);

  return (
    <section
      className="rounded-2xl border p-8 shadow-sm transition-colors duration-200"
      style={theme.sectionStyle}
    >
      <div className="max-w-2xl">
        <h2
          className="text-3xl font-semibold"
          style={theme.headingStyle}
        >
          Send us a Message
        </h2>
        <p
          className="mt-4 text-base leading-7"
          style={theme.descriptionStyle}
        >
          Use this form for general questions or suggestions. Email delivery
          depends on the deployed contact service configuration; do not use the
          form for emergencies or include sensitive information.
        </p>

        {status ? <SubmissionStatusNotice status={status} isDark={isDark} /> : null}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
          <fieldset disabled={isSubmitting} className="space-y-6">
            <ContactFormField
              id="fullName"
              label="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              isDark={isDark}
              fieldClassName={theme.fieldClassName}
              fieldStyle={theme.fieldStyle}
              labelStyle={theme.labelStyle}
              fieldErrorClass={theme.fieldErrorClass}
              placeholder="Juan Dela Cruz"
              maxLength={120}
              autoComplete="name"
            />
            <ContactFormField
              id="email"
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              isDark={isDark}
              fieldClassName={theme.fieldClassName}
              fieldStyle={theme.fieldStyle}
              labelStyle={theme.labelStyle}
              fieldErrorClass={theme.fieldErrorClass}
              placeholder="juan@gmail.com"
              maxLength={254}
              type="email"
              autoComplete="email"
            />
            <ContactFormField
              id="subject"
              label="Subject"
              value={formData.subject}
              onChange={handleChange}
              error={errors.subject}
              isDark={isDark}
              fieldClassName={theme.fieldClassName}
              fieldStyle={theme.fieldStyle}
              labelStyle={theme.labelStyle}
              fieldErrorClass={theme.fieldErrorClass}
              placeholder="How can we help?"
              maxLength={200}
            />
            <ContactFormField
              id="message"
              label="Your Message"
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
              isDark={isDark}
              fieldClassName={theme.fieldClassName}
              fieldStyle={theme.fieldStyle}
              labelStyle={theme.labelStyle}
              fieldErrorClass={theme.fieldErrorClass}
              placeholder="Tell us how we can help you..."
              maxLength={5000}
              rows={6}
            />
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
