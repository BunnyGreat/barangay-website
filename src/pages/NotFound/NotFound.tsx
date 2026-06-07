import { Link } from "react-router-dom";
import { buttonClassNames, textClassNames } from "../../utils/constants";

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-16 sm:px-8 lg:px-12">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-6xl sm:text-8xl font-bold text-slate-900">404</h1>
          <p
            className={`mt-4 text-xl font-semibold ${textClassNames.primaryBlue}`}
          >
            Page Not Found
          </p>
        </div>

        <p className="text-lg leading-7 text-slate-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved or no longer exists.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className={`${buttonClassNames.basePill} ${buttonClassNames.heroPrimary} w-full sm:w-auto`}
          >
            Go to Home
          </Link>
          <Link
            to="/about"
            className={`${buttonClassNames.basePill} ${buttonClassNames.heroSecondary} w-full sm:w-auto`}
          >
            Learn About Us
          </Link>
        </div>
      </div>
    </section>
  );
}
