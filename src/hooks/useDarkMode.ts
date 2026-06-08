import { useEffect, useState } from "react";

export default function useDarkMode(): boolean {
  const [isDark, setIsDark] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event: MediaQueryListEvent) => {
      setIsDark(event.matches);
    };

    if (typeof darkModeQuery.addEventListener === "function") {
      darkModeQuery.addEventListener("change", handleChange);
    } else if (typeof darkModeQuery.addListener === "function") {
      darkModeQuery.addListener(handleChange);
    }

    return () => {
      if (typeof darkModeQuery.removeEventListener === "function") {
        darkModeQuery.removeEventListener("change", handleChange);
      } else if (typeof darkModeQuery.removeListener === "function") {
        darkModeQuery.removeListener(handleChange);
      }
    };
  }, []);

  return isDark;
}
