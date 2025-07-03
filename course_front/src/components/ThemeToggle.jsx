import useDarkMode from "use-dark-mode";
import { useEffect } from "react";

export default function ThemeToggle() {
  const darkMode = useDarkMode(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode.value) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode.value]);

  return (
    <button
      className="btn btn-sm btn-outline-secondary"
      onClick={darkMode.toggle}
    >
      {darkMode.value ? "🌞" : "🌙"}
    </button>
  );
}
