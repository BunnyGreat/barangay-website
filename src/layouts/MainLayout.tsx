import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import useDarkMode from "../hooks/useDarkMode";
import { DARK_COLORS } from "../utils/constants";

export default function MainLayout() {
  const isDark = useDarkMode();

  return (
    <div
      className="min-h-screen bg-slate-50 text-slate-900"
      style={{
        backgroundColor: isDark ? DARK_COLORS.background : undefined,
        color: isDark ? DARK_COLORS.paragraph : undefined,
      }}
    >
      <Navbar />
      <main className="px-0">
        <Outlet />
      </main>
    </div>
  );
}
