import React, { useState } from "react";
import LightDarkMode from "./LightDarkMode";
import { ThemeProvider } from "styled-components";
import { FormControlLabel, Switch, FormGroup } from '@material-ui/core';
import NightsStayIcon from '@material-ui/icons/NightsStay';

const LightDarkToggle = () => {
  const [theme, setTheme] = useState({ mode: "light" });
  return (
    <div>
      <ThemeProvider theme={theme}>
        <LightDarkMode />
        
        <FormGroup >
        <FormControlLabel
        control={<Switch style={{color: '#D33682'}} size="Normal" onChange={(e) =>
        setTheme(
          theme.mode === "dark" ? { mode: "light" } : { mode: "dark" }
        )} />}
        label={<NightsStayIcon fontSize='small'/>} /> 

        </FormGroup>
      </ThemeProvider>
    </div>
  );
};

export default LightDarkToggle;
