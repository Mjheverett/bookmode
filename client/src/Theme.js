import { createMuiTheme }  from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
      },
      palette: {
        primary: {
            light: '#fffff',
            main: '#ebebeb',
            dark: '#b9b9b9',
            contrastText: '#444444',
        },
        // This is the accent pink color
        secondary: {
            light: '#ff6cb1',
            main: '#d33582',
            dark: '#9d0056',
            color: '#fffff',
        },
    },
    shadows: ["none"]
});

export default theme;