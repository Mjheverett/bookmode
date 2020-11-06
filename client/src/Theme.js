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
        // This is the accent green color
        secondary: {
            light: '#80A64B',
            main: '#52781e',
            dark: '#244B00',
            color: '#fffff',
        },
    },
    shadows: ["none"]
});

export default theme;