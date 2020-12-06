import { createMuiTheme } from '@material-ui/core';

export const globalStyleTheme = createMuiTheme({
  palette: {
    background: {
      default: '#f4f8f9',
    },
    error: {
      main: '#8f2222',
    },
    primary: {
      main: '#228f38',
    },
    success: {
      main: '#228f38',
    },
    text: {
      primary: '#404040',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
    fontWeightBold: 600,
  },
});
