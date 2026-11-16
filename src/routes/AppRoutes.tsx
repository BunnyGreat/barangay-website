import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import useDarkMode from "../hooks/useDarkMode";
import { DARK_COLORS } from "../utils/constants";

const Home = lazy(() => import("../pages/Home/Home"));
const About = lazy(() => import("../pages/About/About"));
const Services = lazy(() => import("../pages/Services/Services"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

const pageMetadata: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Barangay San Isidro | Official Website",
    description:
      "Information about Barangay San Isidro in Rodriguez, Rizal, including leadership, services, contact information, and emergency hotlines.",
  },
  "/about": {
    title: "About Barangay San Isidro | Officials and Vision",
    description:
      "Learn about Barangay San Isidro, its vision and mission, barangay officials, and their listed committee assignments.",
  },
  "/services": {
    title: "Services and Information | Barangay San Isidro",
    description:
      "Find available barangay information, contact options, emergency hotlines, and the downloadable Android application.",
  },
  "/contact": {
    title: "Contact Barangay San Isidro | Hotlines and Inquiries",
    description:
      "View Barangay San Isidro contact information, emergency hotlines, common questions, and the inquiry form.",
  },
};

export default function AppRoutes() {
  const isDark = useDarkMode();
  const { pathname } = useLocation();

  useEffect(() => {
    const normalizedPath = pathname.replace(/\/+$/, "") || "/";
    const metadata = pageMetadata[normalizedPath] ?? {
      title: "Page Not Found | Barangay San Isidro",
      description: "The requested page could not be found.",
    };

    document.title = metadata.title;
    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    if (description) {
      description.content = metadata.description;
    }
  }, [pathname]);

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
