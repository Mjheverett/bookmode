import React, { useState } from "react";
import LightDarkMode from "./LightDarkMode";
import { ThemeProvider } from "styled-components";

const LightDarkToggle = () => {
  const [theme, setTheme] = useState({ mode: "light" });
  return (
    <div>
      <ThemeProvider theme={theme}>
        <LightDarkMode />

        <button
          onClick={(e) =>
            setTheme(
              theme.mode === "dark" ? { mode: "light" } : { mode: "dark" }
            )
          }
        >
          Toggle
        </button>
      </ThemeProvider>
    </div>
  );
};

export default LightDarkToggle;
