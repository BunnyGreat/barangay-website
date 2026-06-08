import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import useDarkMode from "../hooks/useDarkMode";
import { DARK_COLORS } from "../utils/constants";

const Home = lazy(() => import("../pages/Home/Home"));
const About = lazy(() => import("../pages/About/About"));
const Services = lazy(() => import("../pages/Services/Services"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

export default function AppRoutes() {
  const isDark = useDarkMode();
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{
            backgroundColor: isDark ? DARK_COLORS.background : undefined,
          }}
        >
          <p
            className="text-sm font-medium"
            style={{ color: isDark ? DARK_COLORS.paragraph : undefined }}
          >
            Loading...
          </p>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
