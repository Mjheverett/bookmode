import React, { useState, useEffect } from "react";
import LightDarkMode from "./LightDarkMode";
import { ThemeProvider } from "styled-components";
import { FormControlLabel, Switch, FormGroup } from '@material-ui/core';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import Brightness5OutlinedIcon from '@material-ui/icons/Brightness5Outlined';
import storage from 'local-storage-fallback';


function getInitialTheme() {
  const savedTheme = storage.getItem('theme')
  return savedTheme ? JSON.parse(savedTheme) : {mode: 'light'}
}

const LightDarkToggle = () => {
  const [theme, setTheme] = useState(getInitialTheme);
  useEffect(
    () => {
      storage.setItem('theme', JSON.stringify(theme));
    },
    [theme]
  );
  return (
    <div className="lightDarkToggle">
      <ThemeProvider theme={theme}>
        <LightDarkMode />
        
        <FormGroup >
        <FormControlLabel
        control={<Switch style={{color: '#D33682'}} size="Normal" onChange={(e) =>
        setTheme(
          theme.mode === "dark" ? { mode: "light" } : { mode: "dark" }
        )} />}
        label={theme.mode === 'light' ? <NightsStayIcon fontSize='small'/> : <Brightness5OutlinedIcon fontSize='small'/>} /> 

        </FormGroup>
      </ThemeProvider>
    </div>
  );
};

export default LightDarkToggle;
