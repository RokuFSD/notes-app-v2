import React, { useState, useEffect } from "react";

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
    <button type="button" onClick={() => toggleDarkMode()}>
      {darkMode ? "Light" : "Dark"}
    </button>
  );
}

export default DarkModeToggle;
