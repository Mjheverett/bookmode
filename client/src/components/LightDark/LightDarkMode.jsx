import { createGlobalStyle } from "styled-components";
//global styles for light dark mode
const LightDarkMode = createGlobalStyle`
body {
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#002B36" : "#EBEBEB"};
  color: #93A1A1;
  }
`;

export default LightDarkMode;
