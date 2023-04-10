import React, { useState, useEffect, memo } from "react";
import CIcon from "@coreui/icons-react";
import { cilMoon, cilSun } from "@coreui/icons";

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, []);

  function toggleDarkMode() {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", `${newDarkMode}`);
    document.documentElement.classList.toggle("dark", newDarkMode);
  }

  return (
    <button
      aria-label={darkMode ? "go-light" : "go-dark"}
      type="button"
      onClick={() => toggleDarkMode()}
    >
      <CIcon icon={darkMode ? cilSun : cilMoon} className="w-5 h-5" />
    </button>
  );
}

export default memo(DarkModeToggle);
