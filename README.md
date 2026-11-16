# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Contact form on Vercel

The contact form uses the server-side `api/contact.ts` Vercel function. It
accepts Gmail addresses only, sends through Resend to the configured barangay
contact recipient, and enforces one accepted message per signed visitor cookie
per calendar day in `Asia/Manila` using an atomic Upstash Redis reservation.
The rate-limit record stores only a hash of the visitor identifier and the
Manila calendar date.

Configure these variables in Vercel Project Settings → Environment Variables,
then redeploy:

- `RESEND_API_KEY`: private Resend API key.
- `RESEND_FROM_EMAIL`: permitted sender on the verified
  `barangay-san-isidro.help` domain, for example
  `Barangay San Isidro <contact@barangay-san-isidro.help>`.
- `UPSTASH_REDIS_REST_URL`: Upstash Redis REST URL.
- `UPSTASH_REDIS_REST_TOKEN`: private Upstash Redis REST token.
- `CONTACT_COOKIE_SECRET`: a private random secret with at least 32 characters.
  Generate one with
  `node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"`.

Keep all of these values server-side; never use `VITE_` variables for secrets.
The signed visitor cookie is HttpOnly, SameSite=Lax, and Secure on production
requests. It identifies a browser, not a person; without site authentication,
clearing cookies or switching browsers creates a new visitor identity.

The sender domain being verified does not configure the Resend API key, sender
address, Upstash database, or Vercel environment variables. Email submission
requires all five variables, the Vercel function deployment, and a sender
address allowed by Resend. The Vite development server alone does not run this
API function; use the Vercel development runtime to test the endpoint locally.
For the full setup, deployment, and testing walkthrough, see
[docs/CONTACT_FORM_EMAIL_SETUP_GUIDE.md](./docs/CONTACT_FORM_EMAIL_SETUP_GUIDE.md).

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
