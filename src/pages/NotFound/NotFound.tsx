import { Link } from "react-router-dom";
import {
  buttonClassNames,
  textClassNames,
  DARK_COLORS,
} from "../../utils/constants";
import useDarkMode from "../../hooks/useDarkMode";
import notFoundImage from "../../assets/images/404.png";
import homeIcon from "../../assets/icons/home.svg";
import arrowLeftIcon from "../../assets/icons/arrow-left.svg";

export default function NotFound() {
  const isDark = useDarkMode();
  return (
    <section
      className="min-h-screen px-6 py-16 sm:px-8 lg:px-12"
      style={{ backgroundColor: isDark ? DARK_COLORS.background : "#f8fafc" }}
    >
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-10 inline-flex overflow-hidden rounded-[40px] shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)]">
          <img
            src={notFoundImage}
            alt="404 page not found"
            className="block h-80 w-full object-cover"
          />
        </div>

        <p
          className={`mt-4 text-xl font-semibold ${textClassNames.primaryBlue}`}
          style={{ color: isDark ? DARK_COLORS.primary : undefined }}
        >
          Page Not Found
        </p>
        <p
          className="mx-auto mt-6 max-w-xl text-base leading-8"
          style={{ color: isDark ? DARK_COLORS.paragraph : undefined }}
        >
          Sorry, the page you’re looking for can’t be found. It may have been
          moved, renamed, or might no longer exist.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className={`${buttonClassNames.basePill} ${buttonClassNames.heroPrimary} inline-flex items-center justify-center gap-2`}
            style={{
              backgroundColor: isDark ? DARK_COLORS.primary : undefined,
            }}
          >
            <img src={homeIcon} alt="Home" className="h-4 w-4" />
            Return Home
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className={`${buttonClassNames.basePill} ${buttonClassNames.heroSecondary} inline-flex items-center justify-center gap-2`}
            style={{
              borderColor: isDark ? DARK_COLORS.primary : undefined,
              color: isDark ? "#ffffff" : undefined,
            }}
          >
            <img src={arrowLeftIcon} alt="Go back" className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    </section>
  );
}
