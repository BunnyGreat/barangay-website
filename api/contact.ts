import {
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";

type ApiRequest = {
  method?: string;
  body: unknown;
  headers: Record<string, string | string[] | undefined>;
};

type ApiResponse = {
  setHeader(name: string, value: string | string[]): void;
  status(code: number): ApiResponse;
  json(body: Record<string, unknown>): ApiResponse;
  end(): ApiResponse;
};

type ContactMessage = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

const recipient = "johnlloydnadura4@gmail.com";
const visitorCookieName = "contact_visitor";
const visitorCookieMaxAgeSeconds = 60 * 60 * 24 * 400;
const reservationPrefix = "pending:";

const reserveScript = `
local current = redis.call("GET", KEYS[1])
if current == "sent" then
  return "limited"
end
if current and string.sub(current, 1, string.len(ARGV[1])) == ARGV[1] then
  return "pending"
end
redis.call("SET", KEYS[1], ARGV[1] .. ARGV[2], "EX", ARGV[3])
return "reserved"
`;

const finalizeScript = `
local current = redis.call("GET", KEYS[1])
if current ~= ARGV[1] then
  return 0
end
redis.call("SET", KEYS[1], "sent", "EX", ARGV[2])
return 1
`;

const releaseScript = `
local current = redis.call("GET", KEYS[1])
if current ~= ARGV[1] then
  return 0
end
redis.call("DEL", KEYS[1])
return 1
`;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getHeader(
  headers: ApiRequest["headers"],
  name: string,
): string | undefined {
  const value = headers[name] ?? headers[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
}

function isValidGmailAddress(email: string): boolean {
  const atIndex = email.lastIndexOf("@");
  if (atIndex < 1 || email.slice(atIndex).toLowerCase() !== "@gmail.com") {
    return false;
  }

  const localPart = email.slice(0, atIndex);
  return (
    localPart.length <= 64 &&
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(localPart) &&
    !localPart.startsWith(".") &&
    !localPart.endsWith(".") &&
    !localPart.includes("..")
  );
}

function readContactMessage(body: unknown): ContactMessage | null {
  if (!isRecord(body)) {
    return null;
  }

  const { fullName, email, subject, message } = body;
  if (
    typeof fullName !== "string" ||
    typeof email !== "string" ||
    typeof subject !== "string" ||
    typeof message !== "string"
  ) {
    return null;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const contactMessage = {
    fullName: fullName.trim(),
    email: normalizedEmail,
    subject: subject.trim().replace(/[\r\n]+/g, " "),
    message: message.trim(),
  };

  if (
    !contactMessage.fullName ||
    contactMessage.fullName.length > 120 ||
    !isValidGmailAddress(contactMessage.email) ||
    contactMessage.email.length > 254 ||
    !contactMessage.subject ||
    contactMessage.subject.length > 200 ||
    !contactMessage.message ||
    contactMessage.message.length > 5000
  ) {
    return null;
  }

  return contactMessage;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function getManilaDay(now: Date): {
  day: string;
  nextMidnight: Date;
} {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value]),
  );
  const year = Number(values.year);
  const month = Number(values.month);
  const dayOfMonth = Number(values.day);

  return {
    day: `${values.year}-${values.month}-${values.day}`,
    nextMidnight: new Date(
      Date.UTC(year, month - 1, dayOfMonth + 1) - 8 * 60 * 60 * 1000,
    ),
  };
}

function verifyVisitorCookie(
  cookieHeader: string | undefined,
  secret: string,
): string | null {
  const cookie = cookieHeader
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${visitorCookieName}=`))
    ?.slice(visitorCookieName.length + 1);
  if (!cookie) {
    return null;
  }

  const signatureIndex = cookie.lastIndexOf(".");
  const expiryIndex = cookie.lastIndexOf(".", signatureIndex - 1);
  if (expiryIndex < 1 || signatureIndex <= expiryIndex + 1) {
    return null;
  }

  const visitorId = cookie.slice(0, expiryIndex);
  const expiresAt = Number(cookie.slice(expiryIndex + 1, signatureIndex));
  const signedValue = cookie.slice(0, signatureIndex);
  const suppliedSignature = cookie.slice(signatureIndex + 1);
  if (
    !Number.isSafeInteger(expiresAt) ||
    expiresAt <= Math.floor(Date.now() / 1000)
  ) {
    return null;
  }

  const expectedSignature = createHmac("sha256", secret)
    .update(signedValue)
    .digest("base64url");

  const suppliedBuffer = Buffer.from(suppliedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (
    suppliedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(suppliedBuffer, expectedBuffer)
  ) {
    return null;
  }

  return visitorId;
}

function createVisitorCookie(secret: string, secure: boolean): {
  visitorId: string;
  cookie: string;
} {
  const visitorId = randomBytes(32).toString("base64url");
  const expiresAt =
    Math.floor(Date.now() / 1000) + visitorCookieMaxAgeSeconds;
  const signedValue = `${visitorId}.${expiresAt}`;
  const signature = createHmac("sha256", secret)
    .update(signedValue)
    .digest("base64url");
  const cookie = [
    `${visitorCookieName}=${signedValue}.${signature}`,
    `Max-Age=${visitorCookieMaxAgeSeconds}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    secure ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");

  return { visitorId, cookie };
}

function getSenderAddress(sender: string): string {
  const match = sender.match(/<([^<>]+)>$/);
  return (match?.[1] ?? sender).trim();
}

async function runRedisScript(
  redisUrl: string,
  redisToken: string,
  script: string,
  key: string,
  args: string[],
): Promise<unknown> {
  const response = await fetch(redisUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${redisToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(["EVAL", script, "1", key, ...args]),
    signal: AbortSignal.timeout(5000),
  });

  let result: unknown;
  try {
    result = await response.json();
  } catch {
    throw new Error("The rate-limit store returned an invalid response.");
  }

  if (!response.ok || !isRecord(result) || typeof result.error === "string") {
    throw new Error("The rate-limit store request failed.");
  }

  return result.result;
}

async function releaseReservation(
  redisUrl: string,
  redisToken: string,
  key: string,
  reservation: string,
): Promise<void> {
  await runRedisScript(redisUrl, redisToken, releaseScript, key, [reservation]);
}

export default async function handler(
  request: ApiRequest,
  response: ApiResponse,
) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    if (request.method === "GET") {
      const cookieSecret = process.env.CONTACT_COOKIE_SECRET;
      if (!cookieSecret || cookieSecret.length < 32) {
        return response.status(503).json({
          error: "The contact service is not configured yet.",
          code: "SERVICE_UNAVAILABLE",
        });
      }

      if (
        !verifyVisitorCookie(
          getHeader(request.headers, "cookie"),
          cookieSecret,
        )
      ) {
        const isProduction =
          process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
        const visitor = createVisitorCookie(cookieSecret, isProduction);
        response.setHeader("Set-Cookie", visitor.cookie);
      }

      return response.status(204).end();
    }

    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const contactMessage = readContactMessage(request.body);
  if (!contactMessage) {
    return response.status(400).json({
      error:
        "Please provide a valid name, a Gmail address, a subject, and a message.",
      code: "INVALID_INPUT",
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.RESEND_FROM_EMAIL;
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  const cookieSecret = process.env.CONTACT_COOKIE_SECRET;
  const senderAddress = sender ? getSenderAddress(sender) : "";

  if (
    !apiKey ||
    !sender ||
    !/^.+@barangay-san-isidro\.help$/i.test(senderAddress) ||
    !redisUrl ||
    !redisToken ||
    !cookieSecret ||
    cookieSecret.length < 32
  ) {
    return response.status(503).json({
      error: "The contact service is not configured yet. Please call the barangay hall.",
      code: "SERVICE_UNAVAILABLE",
    });
  }

  const cookieHeader = getHeader(request.headers, "cookie");
  const visitorId = verifyVisitorCookie(cookieHeader, cookieSecret);
  const isProduction =
    process.env.NODE_ENV === "production" || process.env.VERCEL === "1";

  if (!visitorId) {
    const visitor = createVisitorCookie(cookieSecret, isProduction);
    response.setHeader("Set-Cookie", visitor.cookie);
    return response.status(428).json({
      error: "A secure visitor identity is being initialized. Please retry.",
      code: "VISITOR_ID_REQUIRED",
    });
  }

  const now = new Date();
  const { day, nextMidnight } = getManilaDay(now);
  const secondsUntilMidnight = Math.ceil(
    (nextMidnight.getTime() - now.getTime()) / 1000,
  );
  const reservationTtl = String(secondsUntilMidnight + 60);
  const resetAt = nextMidnight.toISOString();
  const visitorHash = createHash("sha256").update(visitorId).digest("hex");
  const reservationKey = `contact-daily:${day}:${visitorHash}`;
  const reservationToken = `${reservationPrefix}${randomBytes(32).toString("base64url")}`;

  let reservationResult: unknown;
  try {
    reservationResult = await runRedisScript(
      redisUrl,
      redisToken,
      reserveScript,
      reservationKey,
      [
        reservationPrefix,
        reservationToken.slice(reservationPrefix.length),
        reservationTtl,
      ],
    );
  } catch {
    console.error("Contact submission reservation failed.");
    return response.status(503).json({
      error:
        "The contact service is temporarily unavailable. Please try again later.",
      code: "RATE_LIMIT_UNAVAILABLE",
    });
  }

  if (reservationResult === "limited") {
    return response.status(429).json({
      error: "You have already sent a message today.",
      code: "DAILY_LIMIT",
      resetAt,
    });
  }

  if (reservationResult === "pending") {
    return response.status(409).json({
      error: "A message is already being processed. Please wait before trying again.",
      code: "SUBMISSION_IN_PROGRESS",
    });
  }

  if (reservationResult !== "reserved") {
    console.error(
      "Contact submission reservation returned an unexpected result.",
    );
    return response.status(503).json({
      error:
        "The contact service is temporarily unavailable. Please try again later.",
      code: "RATE_LIMIT_UNAVAILABLE",
    });
  }

  try {
    const escapedName = escapeHtml(contactMessage.fullName);
    const escapedEmail = escapeHtml(contactMessage.email);
    const escapedSubject = escapeHtml(contactMessage.subject);
    const escapedMessage = escapeHtml(contactMessage.message).replace(
      /\r?\n/g,
      "<br>",
    );

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": reservationToken,
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: contactMessage.email,
        subject: `[Website Contact] ${contactMessage.subject}`,
        text: `Name: ${contactMessage.fullName}\nEmail: ${contactMessage.email}\nSubject: ${contactMessage.subject}\n\n${contactMessage.message}`,
        html: `<h2>Website contact message</h2><p><strong>Name:</strong> ${escapedName}</p><p><strong>Email:</strong> ${escapedEmail}</p><p><strong>Subject:</strong> ${escapedSubject}</p><p>${escapedMessage}</p>`,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!resendResponse.ok) {
      try {
        await releaseReservation(
          redisUrl,
          redisToken,
          reservationKey,
          reservationToken,
        );
      } catch {
        console.error("Contact submission reservation release failed.");
      }

      console.error("Resend rejected contact email:", resendResponse.status);
      return response.status(502).json({
        error: "Your message could not be sent. Please try again later.",
        code: "EMAIL_PROVIDER_ERROR",
      });
    }
  } catch {
    console.error("Contact email outcome could not be confirmed.");
    return response.status(503).json({
      error:
        "We could not confirm whether your email was accepted. Please do not submit again today.",
      code: "SUBMISSION_UNCONFIRMED",
    });
  }

  try {
    const finalized = await runRedisScript(
      redisUrl,
      redisToken,
      finalizeScript,
      reservationKey,
      [reservationToken, reservationTtl],
    );

    if (finalized !== 1) {
      throw new Error("The reservation could not be finalized.");
    }
  } catch {
    console.error(
      "Accepted contact email could not be recorded in the rate-limit store.",
    );
    return response.status(503).json({
      error:
        "Your email provider accepted the message, but we could not confirm the daily limit. Please do not submit again today.",
      code: "SUBMISSION_UNCONFIRMED",
    });
  }

  return response.status(200).json({
    message: "Your message was accepted for delivery.",
  });
}
