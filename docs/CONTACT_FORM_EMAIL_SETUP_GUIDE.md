# Contact Form Email Setup Guide

Audit date: 2026-11-16

This guide describes the code currently in this repository. It does not claim
that a real email has been sent or received.

## 1. Current audit results

The Contact form and server-side email flow are implemented:

- The Contact page renders the form from `src/pages/Contact/Contact.tsx`
  through `src/components/ContactSection/ContactSection.tsx` and
  `src/components/ContactForm/ContactForm.tsx`.
- The server handler is `api/contact.ts`, intended to run as a Vercel Function.
- The recipient is fixed in the API code as
  `johnlloydnadura4@gmail.com`.
- The API reads all five required environment variables on the server. They
  are not read by the React app.
- The visitor may enter a Gmail address only. The API also checks the address
  on the server and uses it as the email's `reply_to`. These checks validate
  the address format; they do not prove the Gmail inbox exists or belongs to
  the visitor.
- Upstash tracks one provider-accepted message per signed visitor cookie per
  `Asia/Manila` calendar day.

The following items could not be verified from this repository:

- There is no `.env`, `.env.local`, or `.env.example` in the project root.
- The `.gitignore` pattern `*.local` ignores `.env.local`, but a plain `.env`
  file is not ignored. Use `.env.local` and verify the ignore rule before
  entering credentials.
- The Resend domain status, API key, sender, and sending history require access
  to the Resend account.
- Upstash account/database credentials and availability require access to
  Upstash.
- There is no Vercel project link, `vercel.json`, or deployed endpoint in the
  repository. No Vercel deployment was tested.
- No real email was sent. A successful code path or HTTP response alone does
  not prove delivery to an inbox.
- No contact-form automated test files were found.

The repository is `BunnyGreat/barangay-website`, its current branch is `main`,
and its current Git working tree was clean during this audit.

### Important Vercel routing note

`api/contact.ts` is in the root `api/` folder, which matches Vercel's Node.js
Function convention. However, the project is a Vite single-page app using
React Router, and this repository has no `vercel.json`. Vercel's Vite guide
warns that direct page links such as `/contact` may need a rewrite to
`/index.html`. The Vercel deployment must also be checked to make sure
`/api/contact` is a Function, not the React app's HTML page.

The Vercel Vite guide's basic SPA rewrite is:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This file has **not** been added. Before production, add/approve the needed
Vercel routing configuration and verify both `/contact` and `/api/contact`.
If `/api/contact` returns HTML or 404 instead of the API response described
below, stop and fix the deployment routing before sending a real test.

## 2. What information to prepare

Have these items ready before configuring the project:

1. Access to the Resend account that owns `barangay-san-isidro.help`.
2. Access to the DNS provider for that domain, in case Resend asks for DNS
   corrections.
3. Access to an Upstash account.
4. Access to the Vercel account and the GitHub repository
   `BunnyGreat/barangay-website`.
5. A permitted sender address ending in `@barangay-san-isidro.help`.
   `Barangay San Isidro <contact@barangay-san-isidro.help>` is an example,
   not a claim that this exact sender is already configured.
6. A Gmail inbox you can access for the visitor-side test. The API always
   sends the message to `johnlloydnadura4@gmail.com`.
7. A password manager or another private place to store API keys and tokens.

Never put credentials in a screenshot, chat, source file, browser request, or
Git commit.

## 3. Complete message path in the current code

| Step | What happens | File/function |
| --- | --- | --- |
| 1 | The visitor opens `/contact`. The page assembles the Contact hero, FAQ, hotline information, and contact section. | `src/pages/Contact/Contact.tsx`, `src/components/ContactSection/ContactSection.tsx` |
| 2 | The visitor enters name, Gmail address, subject, and message. | `src/components/ContactForm/ContactForm.tsx` |
| 3 | Before sending, `validateForm` trims required fields and checks a Gmail-only address. The browser's normal validation is disabled, so this custom validation is what shows field errors. The server repeats validation. | `ContactForm.tsx`; `readContactMessage` and `isValidGmailAddress` in `api/contact.ts` |
| 4 | `sendContactMessage` makes a same-origin `GET /api/contact` to obtain the visitor cookie, then sends a JSON `POST /api/contact`. If the first POST returns 428, it retries once after the server sets the cookie. | `sendContactMessage` in `ContactForm.tsx` |
| 5 | The API checks types, trims values, checks Gmail syntax, and enforces limits: name 120 characters, email 254, subject 200, and message 5,000. It removes line breaks from the subject and escapes submitted content for HTML. | `readContactMessage`, `isValidGmailAddress`, and `escapeHtml` in `api/contact.ts` |
| 6 | The GET creates a signed visitor cookie if needed. The POST requires a valid signature. The API hashes the visitor ID and atomically reserves that day's key in Upstash. | `createVisitorCookie`, `verifyVisitorCookie`, `getManilaDay`, `reserveScript`, and `runRedisScript` in `api/contact.ts` |
| 7 | The API sends a server-to-server HTTPS request to Resend using the configured sender, fixed recipient, and visitor's email as `reply_to`. It sends plain text and escaped HTML and includes an idempotency key. | `handler` in `api/contact.ts` |
| 8 | A non-2xx Resend response is treated as a provider rejection. A 2xx response means Resend accepted the API request; it does not prove inbox delivery. | Resend `fetch` and `resendResponse.ok` in `api/contact.ts` |
| 9 | After provider acceptance, the API changes the Redis reservation from pending to sent. On a clear provider rejection, it tries to release the reservation. | `finalizeScript`, `releaseScript`, and `releaseReservation` in `api/contact.ts` |
| 10 | The form clears and displays “accepted for delivery” only after the API returns success. It shows field errors, a daily-limit message, or a generic service error for failures. | `handleSubmit` in `ContactForm.tsx` |

### What the daily limit means

- The API creates an HttpOnly, SameSite=Lax cookie with a random visitor ID,
  signed with HMAC-SHA256. In production the cookie also has `Secure`.
- The cookie lasts up to 400 days. It identifies a browser, not a verified
  person. Clearing the cookie or using another browser creates a new identity.
- The Redis key includes the Manila date and a SHA-256 hash of the visitor ID;
  it does not store the visitor's name or email.
- A short-lived `pending` reservation prevents simultaneous submissions from
  sending duplicates. A confirmed provider acceptance changes it to `sent`
  until the next Manila midnight.
- A clear Resend rejection attempts to release the reservation, so a failed
  send should not normally consume the day's successful-send allowance.
- A network timeout can leave the result uncertain. In that case the API
  tells the visitor not to retry that day, to avoid sending a duplicate if
  Resend actually accepted the email.

This limit is a per-browser safeguard, not a login-based identity system.

## 4. Required environment variables

All five variables are required for a valid POST. The GET that initializes the
visitor cookie specifically needs `CONTACT_COOKIE_SECRET`.

| Exact name | Purpose | Where to obtain it | Private? | Needed where? |
| --- | --- | --- | --- | --- |
| `RESEND_API_KEY` | Authenticates the API request to Resend. | Resend Dashboard > API Keys. Create a key with sending-only permission and, if offered, restrict it to `barangay-san-isidro.help`. | **Yes.** Secret credential. | `.env.local` for local tests; Vercel Development, Preview, and Production for those environments. |
| `RESEND_FROM_EMAIL` | The `from` value used in the email. It must end in `@barangay-san-isidro.help` or the API returns 503 before calling Resend. | Choose a sender on the domain Resend shows as verified. | Not a password, but keep server-side and out of `VITE_` variables. | Local and every Vercel environment where the form should send. |
| `UPSTASH_REDIS_REST_URL` | HTTPS endpoint used by the API to run atomic Redis scripts. | Upstash Console > Redis database > Connect/REST API. Copy the HTTPS URL. | Treat as server-side configuration. | Local and every Vercel environment where the form should send. |
| `UPSTASH_REDIS_REST_TOKEN` | Bearer credential for Upstash REST requests. The API needs write access for reserve, finalize, and release operations. | Upstash Console > database > Connect/REST API. Copy the writable Token, not a read-only token. | **Yes.** Secret credential. | Local and every Vercel environment where the form should send. |
| `CONTACT_COOKIE_SECRET` | HMAC key used to sign visitor cookies. The code requires at least 32 characters. | Generate a random value using the PowerShell/Node command in the local setup section. Use a separate value per environment if desired. | **Yes.** Secret credential. | Local and every Vercel environment where the form should send. |

The recipient is **not** an environment variable. It is hard-coded in
`api/contact.ts` as `johnlloydnadura4@gmail.com`; do not change it during setup.

The code accesses these values with `process.env` inside `api/contact.ts`.
There are no `VITE_` references for them. Do not add a `VITE_` prefix: Vite
variables prefixed that way can be included in browser code.

## 5. Resend setup

### A. Sign in and confirm the domain

1. Open [Resend](https://resend.com/) and sign in to the account that owns the
   domain.
2. Open **Domains** at [resend.com/domains](https://resend.com/domains).
3. Find `barangay-san-isidro.help` and open its details.
4. Confirm the sending status is **Verified**. The domain was previously
   reported as verified, but this audit could not view your Resend account.
5. Check that the domain and API key belong to the same Resend team/account.

Resend documents that a verified domain can send from addresses at that
domain. This does not set the project's `RESEND_FROM_EMAIL`, create an API
key, configure Vercel, or prove delivery. The current API key may also be
restricted to a domain, so check that restriction too.

### B. Repair DNS only if needed

1. On the domain details page, open the **Records** tab.
2. Compare the records shown by Resend with the DNS records at the provider
   where `barangay-san-isidro.help` is managed.
3. Add or correct the exact record names, types, and values shown by Resend.
   Resend may show TXT, MX, or CNAME records; do not guess a record type.
4. Do not add a second conflicting SPF record. If there is already an SPF
   record, follow your DNS provider's instructions to combine the authorized
   senders rather than publishing duplicate SPF records.
5. If a CNAME is shown, use the exact host and target. If your DNS host offers
   a proxy toggle, leave proxying off for verification CNAME records.
6. Return to Resend and select **Verify DNS Records** or **Restart
   verification** as shown.
7. Wait for DNS propagation. Resend says verification often completes within
   about 15 minutes, but DNS can take up to 72 hours.
8. If useful, check the exact record hostnames using [dns.email](https://dns.email/)
   or PowerShell. Use the hostnames Resend provided; do not invent selector
   names:

   ```powershell
   Resolve-DnsName -Type TXT "HOSTNAME_SHOWN_BY_RESEND"
   Resolve-DnsName -Type CNAME "HOSTNAME_SHOWN_BY_RESEND"
   Resolve-DnsName -Type MX "HOSTNAME_SHOWN_BY_RESEND"
   ```

9. After sending is verified, consider adding DMARC using Resend's instructions
   and your domain administrator's policy. Do not copy a guessed DMARC policy.

### C. Create a least-privilege API key

1. Open [Resend API Keys](https://resend.com/api-keys).
2. Select **Create API Key**.
3. Give it a name such as `barangay-website-contact`.
4. Select **Sending access** (not full access).
5. If the dashboard offers a domain restriction, select
   `barangay-san-isidro.help`.
6. Create the key and copy it immediately to a password manager. Resend does
   not show the full value again. If it is lost, create a replacement and
   revoke the old key.
7. Never paste the key into `src/`, a `VITE_` variable, a browser console, or
   this guide.

### D. Choose the sender

1. Choose an address on the verified domain, for example
   `contact@barangay-san-isidro.help`. This is only an example; use the sender
   you want to represent the barangay.
2. In the environment variable, a display name is allowed:
   `Barangay San Isidro <contact@barangay-san-isidro.help>`.
3. The code checks the sender's domain suffix before it calls Resend. Resend
   still makes the final authorization decision when the request is sent.
4. The visitor's Gmail address is placed in **Reply-To**, so replying to the
   received contact email should address the visitor, while **From** remains
   the barangay sender.

### E. Inspect sending results

1. Open [Resend Emails](https://resend.com/emails) after a test submission.
2. Find the message by time, recipient, or subject. The API prefixes the
   subject with `[Website Contact]`.
3. Open it to inspect the sender, recipient, subject, plain-text content, and
   HTML content.
4. Check its event/status:
   - **Accepted by the API**: Resend returned a successful HTTP status to the
     server. The website can then show its success message.
   - **Sent**: Resend reports that it sent the message.
   - **Delivered**: the recipient's mail server accepted it. This still does
     not prove it is visible in the inbox.
   - **Bounced**, **failed**, **suppressed**, or **delivery delayed**: inspect
     the event details and fix the reported issue.
   - **Complained**: the message reached the mail server and was marked as
     spam.
5. You can also open [Resend Logs](https://resend.com/logs), filter recent
   requests, and inspect the API status and response details.
6. Finally, check the recipient inbox and Spam/Junk folder. Inbox receipt is
   the final end-to-end proof.

Resend's email details can contain the submitted message and email address.
Treat the Resend account and its logs as sensitive and give access only to
people who should read contact messages.

## 6. Upstash Redis setup

1. Sign in to the [Upstash Console](https://console.upstash.com/) or create an
   account.
2. Open **Redis** and select **Create Database**.
3. Give the database a clear name, such as `barangay-contact-rate-limit`.
4. Choose a region near the Vercel Function region, not just near the
   website's visitors. This API and Redis make several HTTP requests per
   submission, so placing them near each other reduces latency. This project
   has no explicit Vercel function-region setting, so confirm the deployed
   region in Vercel before choosing. Do not assume the function runs in the
   Philippines.
5. Choose an available plan that fits your expected usage and review current
   [Upstash pricing and limits](https://upstash.com/pricing/redis). Pricing
   and free-tier limits can change.
6. Wait until the database is ready/active.
7. Open the database **Connect** section and choose **REST API**. Copy the
   HTTPS REST URL and the writable **Token**. Do not use the read-only token:
   this implementation writes and deletes rate-limit keys.
8. Keep both values private and set them under the exact variable names in
   Section 4.
9. To check basic availability, use the database's **Connect > REST API**
   example or run a `PING` command against the REST endpoint with the token.
   A successful Upstash response contains a `result` value such as `PONG`.
   Do not post a command containing the token in a shared chat or public log.
10. The real contact POST also checks Redis. The initial `GET /api/contact`
    only initializes the visitor cookie; it does not prove Redis is working.

### How the rate limit works

The API uses Lua scripts with Upstash REST to reserve a pending key, mark it
sent after Resend accepts, or release it after a clear provider rejection.
The key is based on the `Asia/Manila` date and a hash of the signed visitor ID.
The key expires around the next Manila midnight. A successful first message
normally reserves and finalizes the key; a second successful submission from
the same browser that day receives HTTP 429 with a `resetAt` time.
Upstash requests time out after 5 seconds; the Resend send request times out
after 10 seconds.

The design intentionally does not limit users by IP address or account. A
visitor who clears cookies or uses another browser may get a new identity.

## 7. Vercel project and deployment setup

### A. Connect the correct repository

1. Sign in to [Vercel](https://vercel.com/).
2. Select **Add New > Project** (or open your existing project if one already
   exists).
3. Connect GitHub if asked.
4. Import **`BunnyGreat/barangay-website`**. Confirm that it is the correct
   repository, not a fork or a different project.
5. Set the project root directory to the repository root (`.`).
6. Choose `main` as the Production Branch if this is the intended live branch.

### B. Check the build settings

This repository is React + TypeScript + Vite. Its current scripts are:

- Build: `npm run build` (runs `tsc -b && vite build`)
- Output folder: `dist`
- Package manager: npm, with `package-lock.json`
- API source: `api/contact.ts`

When importing, verify Vercel detects **Vite** and uses the repository root,
`npm run build`, and `dist`. Do not replace these with a Vite-only local
development command. There is no `vercel.json` or Vercel CLI dependency in
this repository today.

Vercel's general Node.js Functions documentation says files in the root
`api/` folder are deployed as Functions. The Vercel Vite documentation also
warns that Vite's normal development/build process does not itself provide
serverless Functions. Therefore, verify the deployed API route rather than
assuming the static site build included it.

### C. Add environment variables

1. In Vercel, open the project **Settings > Environment Variables**.
2. Add each exact name from Section 4. Do not add a `VITE_` prefix.
3. Add them to every environment in which you expect the form to work:
   - **Development/Local** for Vercel local development. Vercel documentation
     currently calls this the **Local** environment; some UI flows call its
     environment variables **Development**.
   - **Preview** for preview deployments and safe testing.
   - **Production** for the public website.
4. Use **Secret**/sensitive storage for the API key, Upstash token, and cookie
   secret where the UI offers that setting. Keep the sender and REST URL
   server-side too.
5. A Preview environment may use a separate Upstash test database to avoid
   mixing its rate-limit keys with Production. The recipient remains
   hard-coded to the intended Gmail address in every environment.
6. Save the values. Vercel environment changes apply to new deployments, not
   existing deployments, so redeploy after adding or changing them.

### D. Deploy and verify the function

1. Ensure the source changes that should deploy are committed and pushed to
   the correct GitHub branch. This guide did not commit or push anything.
2. In Vercel, open **Deployments** and follow the build for the branch. Review
   Build Logs. A successful static build alone is not proof that the email
   function is present.
3. Open the deployment URL and load `/contact` directly, not only from the
   home page. If it returns 404, configure the SPA rewrite described in
   Section 1 and redeploy.
4. Request `https://YOUR-DEPLOYMENT-URL/api/contact` with GET. Expected:
   **204 No Content** and a `Set-Cookie` header beginning with
   `contact_visitor`. Do not share the full cookie header.
5. If it returns 404 or the Contact page's HTML, the function route is not
   being served correctly. Check Vercel Function deployment/routing before
   testing an email.
6. Open Vercel's deployment **Functions/Logs** or **Observability** view and
   inspect runtime logs after requests. The API intentionally logs generic
   errors and status codes, not names, message bodies, or credentials.
7. Add or change environment variables only in Vercel Project Settings. Then
   redeploy and repeat the GET check.

### E. Local Vercel project link

The repository does not contain a `.vercel/` project link. If you use the CLI,
link the current folder to the correct Vercel project:

```powershell
Set-Location 'D:\Capstone\Codes\barangay-website'
npx vercel@latest login
npx vercel@latest link
```

At the prompts, choose the correct team and the existing project connected to
`BunnyGreat/barangay-website`. Do not create a duplicate project by accident.
The CLI creates `.vercel/` metadata. This repository's current `.gitignore`
does not ignore `.vercel/`; do not stage that folder. Add `.vercel/` to
`.gitignore` before committing CLI metadata, or leave it untracked.

## 8. Local Windows PowerShell test

### A. Install and prepare local settings

1. Open PowerShell in the repository root:

   ```powershell
   Set-Location 'D:\Capstone\Codes\barangay-website'
   ```

2. Install the locked project dependencies:

   ```powershell
   npm ci
   ```

3. Generate a random cookie secret. Copy the output into a private password
   manager first:

   ```powershell
   node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"
   ```

4. Create `.env.local` with the exact variable names. This template contains
   placeholders, not real credentials. Replace every placeholder before
   starting the server:

   ```powershell
   @'
   RESEND_API_KEY=replace_with_your_private_Resend_key
   RESEND_FROM_EMAIL="Barangay San Isidro <contact@barangay-san-isidro.help>"
   UPSTASH_REDIS_REST_URL=https://replace_with_your_Upstash_REST_endpoint
   UPSTASH_REDIS_REST_TOKEN=replace_with_your_private_writable_Upstash_token
   CONTACT_COOKIE_SECRET=replace_with_the_generated_random_value
   '@ | Set-Content -Path .env.local -Encoding ascii
   notepad .env.local
   ```

5. The `.gitignore` pattern `*.local` currently ignores `.env.local`. Verify it:

   ```powershell
   git check-ignore -v .env.local
   git status --short
   ```

   The first command should show the ignore rule. `.env.local` must not appear
   as an untracked or staged file. If it does, stop and fix the ignore rule
   before continuing. Never use `git add -f` on it.

6. If the Vercel project already has Development variables, you can pull them
   after linking:

   ```powershell
   npx vercel@latest env pull .env.local
   ```

   Check the resulting file locally and make sure all five values are present.
   If a secret value is unavailable to pull, enter it locally from your
   password manager. Do not print the contents of `.env.local` into a shared
   terminal or chat.

### B. Start the correct local server

Run this in PowerShell:

```powershell
npx vercel@latest dev
```

Use the local URL printed by Vercel, normally `http://localhost:3000`.
`npm run dev` starts Vite only and **does not run `api/contact.ts`**; do not
use it to claim the email endpoint works.

Open the Contact page:

```powershell
Start-Process 'http://localhost:3000/contact'
```

To check that the local API route exists, use a second PowerShell window:

```powershell
curl.exe -i 'http://localhost:3000/api/contact'
```

Expected: `204 No Content` and a `Set-Cookie` header for `contact_visitor`.
This GET does not send an email or consume the daily successful-submission
limit. Do not paste the response's cookie header anywhere; treat it as a
private visitor token.

If the response is 503, check that `CONTACT_COOKIE_SECRET` is present and at
least 32 characters. If it is 404 or returns HTML, the local Vercel runtime or
project link is not serving the function correctly.

### C. Submit one real test

1. Use a real Gmail address you can access. The API only accepts addresses
   ending in `@gmail.com`.
2. Enter a test name, a short subject, and a non-sensitive test message.
   Do not put personal, medical, financial, or emergency details in a test.
3. Open browser Developer Tools with **F12** and select **Network**. Filter
   by **Fetch/XHR**.
4. Submit once. The browser should show a GET to `/api/contact`, followed by
   a POST to `/api/contact`. Normally expect GET 204 and POST 200. If the first
   POST returns 428 because the cookie was not initialized, the frontend
   retries it once.
5. Inspect the POST status and JSON response. A 200 response means the API
   accepted the request and completed the rate-limit update. It does not prove
   inbox delivery.
6. In the `vercel dev` terminal, check for runtime errors. Do not copy secrets,
   cookies, or submitted personal details into a report.
7. Open Resend **Emails/Logs** and check whether Resend accepted and delivered
   the request.
8. Check `johnlloydnadura4@gmail.com` inbox and Spam/Junk. Confirm the From
   address and that Reply works to the Gmail address you entered.

The browser request will contain the visitor's entered name, email, subject,
and message. That is expected. It must not contain the Resend API key or
Upstash token. The signed cookie is sent automatically and is HttpOnly.

## 9. Production test checklist

Use a Preview deployment first if available. Check each item:

- [ ] `/contact` loads directly and its form is visible.
- [ ] Empty name, email, subject, and message each show a required-field error.
- [ ] A non-Gmail or malformed address is rejected before the request.
- [ ] A valid Gmail address is accepted by the form.
- [ ] An empty/whitespace-only message is rejected.
- [ ] A valid submission sends JSON to `/api/contact`.
- [ ] The API route is a Vercel Function, not an HTML fallback.
- [ ] The API confirms `RESEND_FROM_EMAIL` is on the permitted domain.
- [ ] Upstash reservation and finalization succeed.
- [ ] Resend returns a successful HTTP status.
- [ ] The website says the message was accepted for delivery.
- [ ] Resend's Emails page shows the request and its current status.
- [ ] `johnlloydnadura4@gmail.com` receives the email, including Spam/Junk check.
- [ ] The From address is the chosen barangay sender.
- [ ] Reply-to is the visitor's submitted Gmail.
- [ ] A rejected API request shows a useful error rather than a false success.
- [ ] Rapid repeated clicks are blocked by the disabled button/client guard.
- [ ] The same browser's next submission that day gets the daily-limit response.
- [ ] The `resetAt` time is the next Manila midnight; test again after that
  Manila date begins if you need to verify the reset.
- [ ] The form still fits on a mobile screen.
- [ ] No Resend key, Upstash token, or cookie secret appears in browser source,
  page HTML, or request payloads.

### Test the limit without sending many messages

Use a dedicated Preview test and, if possible, a separate Upstash database for
Preview. Submit one valid message. That first message is the only one that
should reach Resend. From the same browser and cookie, submit again that day:
it should return 429 and should not produce a second Resend email. Do not
clear cookies between the two attempts. Do not repeatedly submit on the live
Production site or use a resident's browser for testing.

Testing the next-day reset requires waiting until the Manila date changes.
Do not change server clocks or manually edit Redis keys in Production.

## 10. Error handling and troubleshooting

| What you see | Meaning and next check |
| --- | --- |
| Field error; no API request | Frontend validation rejected the input. Check required values and Gmail-only format. |
| HTTP 400 `INVALID_INPUT` | The server rejected malformed fields, a non-Gmail address, or a length/empty-field violation. |
| HTTP 405 | Wrong method. The API supports GET for cookie initialization and POST for contact messages. |
| HTTP 428 `VISITOR_ID_REQUIRED` | The server issued a visitor cookie and asks for a retry. The frontend retries once. If it repeats, inspect cookie/credential behavior and deployment routing. |
| HTTP 409 `SUBMISSION_IN_PROGRESS` | A request for this browser/day is still pending. Do not keep clicking. Check Resend Logs and Vercel Function Logs before deciding what happened. |
| HTTP 429 `DAILY_LIMIT` | A message was already accepted for this browser and Manila date. Read `resetAt`; do not clear cookies to bypass the limit. |
| HTTP 503 `SERVICE_UNAVAILABLE` | One or more required variables are absent/invalid, the sender does not end in `@barangay-san-isidro.help`, or the cookie secret is shorter than 32 characters. |
| HTTP 503 `RATE_LIMIT_UNAVAILABLE` | Upstash failed or returned an unexpected result. Check the REST URL, writable token, database status, and Vercel logs. |
| HTTP 502 `EMAIL_PROVIDER_ERROR` | Resend returned a non-success status. Check Resend Logs for the actual status/details, API key permission, domain restriction, and sender. |
| HTTP 503 `SUBMISSION_UNCONFIRMED` | The API could not confirm whether Resend accepted the message, or could not record acceptance in Redis. Check Resend Emails/Logs before retrying. Do not resubmit the same message that day until the result is clear. |
| HTTP 404 or HTML from `/api/contact` | The deployment did not route the endpoint to a Vercel Function. Check the root `api/` function build and routing configuration. |
| `/contact` returns 404 after deployment | The SPA deep-link rewrite may be missing. See the Vercel routing note in Section 1. |
| HTTP 200 but no inbox email | The API and provider accepted the request, but inbox receipt is not proven. Check Resend event status, bounce/suppression details, Spam/Junk, and the recipient address. |

### Known edge case in the current API

In `api/contact.ts`, after Resend clearly rejects a message, the API tries to
release the pending Upstash reservation. If Upstash is unavailable during
that release, the code logs a generic error and still returns 502. The
reservation can remain `pending` until its TTL expires around Manila midnight;
a same-day retry may then return 409 even though Resend rejected the email.
This is bounded by the reservation expiry, but it can block a legitimate
retry for part of that day.

Recommended future fix: after approval, improve the failed-send cleanup path
so reservation-release failure is observable and safely recoverable, while
retaining the atomic token check and avoiding duplicate emails. No source code
was changed for this audit.

For an ambiguous Resend network timeout, the API intentionally does not
release the reservation: the provider may already have accepted the email.
This prevents duplicate sends. Check Resend Logs first and wait for the next
Manila day if the result cannot be confirmed.

## 11. What success does and does not mean

There are three different milestones:

1. **API accepted by Resend:** Resend returned a successful HTTP response.
   The website may show “accepted for delivery.”
2. **Delivered to the recipient mail server:** Resend reports a `delivered`
   event. The receiving mail server accepted the message.
3. **Received in the intended inbox:** You can see the message in
   `johnlloydnadura4@gmail.com` (including checking Spam/Junk).

Do not describe milestone 1 or 2 as proof of milestone 3.

## 12. Official references

- [Resend: Add and verify a domain](https://resend.com/docs/add-a-domain)
- [Resend: Manage domains and view status](https://resend.com/docs/dashboard/domains/manage-domains)
- [Resend: Create API keys](https://resend.com/docs/api-reference/api-keys/create-api-key)
- [Resend: Send Email API](https://resend.com/docs/api-reference/emails/send-email)
- [Resend: View sent email details and delivery events](https://resend.com/docs/dashboard/emails/manage-emails)
- [Resend: API logs](https://resend.com/docs/dashboard/logs/introduction)
- [Upstash: Create a Redis database](https://upstash.com/docs/redis/overall/getstarted)
- [Upstash: REST API](https://upstash.com/docs/redis/features/restapi)
- [Vercel: Environment variables](https://vercel.com/docs/environment-variables)
- [Vercel: Local `vercel dev`](https://vercel.com/docs/cli/dev)
- [Vercel: Deploying Git repositories](https://vercel.com/docs/git)
- [Vercel: Vite deployment and SPA routing](https://vercel.com/docs/frameworks/frontend/vite)
- [Vercel: Node.js Functions](https://vercel.com/docs/functions/runtimes/node-js)
- [Vercel: Rewrites](https://vercel.com/docs/routing/rewrites)
