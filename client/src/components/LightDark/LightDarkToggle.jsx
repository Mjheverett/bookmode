import React, { useState, useEffect } from "react";
import LightDarkMode from "./LightDarkMode";
import { ThemeProvider } from "styled-components";
import { FormControlLabel, Switch, FormGroup } from '@material-ui/core';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import Brightness5OutlinedIcon from '@material-ui/icons/Brightness5Outlined';
import storage from 'local-storage-fallback';

// saves theme preference to local storage so it stays to your preference when you re-login
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



  // Toggle component to switch from light to dark mode 

  return (
    <div className="lightDarkToggle">
      <ThemeProvider theme={theme}>
        <LightDarkMode />
        
        <FormGroup >
        <FormControlLabel
        control={<Switch style={{color: '#52781e'}} size="Normal" onChange={(e) =>
        setTheme(
          theme.mode === "dark" ? { mode: "light" } : { mode: "dark" }
        )} />}
        label={theme.mode === 'light' ? <NightsStayIcon style={{color: '#93A1A1'}} fontSize='small'/> : <Brightness5OutlinedIcon style={{color: '#93A1A1'}} fontSize='small'/>} /> 

        </FormGroup>
        
      </ThemeProvider>
    </div>
  );
};

export default LightDarkToggle;
