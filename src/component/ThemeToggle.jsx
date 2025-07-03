import { useState, useEffect } from "react";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove("dark");
      html.classList.add("light");
    } else {
      html.classList.remove("light");
      html.classList.add("dark");
    }
    setIsDark(!isDark);
  };

  useEffect(() => {
    document.documentElement.classList.add("light"); // Force light on load
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-4 right-4 px-3 py-1 text-sm font-semibold rounded bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition"
    >
      {isDark ? "Light Mode ☀️" : "Dark Mode 🌙"}
    </button>
  );
}

export default ThemeToggle;
