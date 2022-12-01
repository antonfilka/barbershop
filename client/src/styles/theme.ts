import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    common: {
      white: '#fff',
      black: '#000',
    },
    primary: {
      main: '#b55b0c',
      light: '#c5ecf1',
    },
    secondary: {
      main: '#f50057',
      light: '#E12929',
    },
    success: {
      main: '#1fa113',
      light: '#60BC58',
      dark: '#c9e8c7',
    },
    text: {
      primary: '#000000',
      secondary: '#8d8d8d',
    },
    background: {
      default: '#281d00',
    },
    error: {
      main: '#E12929',
      light: '#E75454',
      dark: '#B42121',
    },
    info: {
      main: '#ffc800',
      light: '#ffe689',
    },
    grey: {
      50: '#ddd',
      100: '#a1a1a1',
      200: '#bcbfdb',
      300: '#64646499',
      400: '#aeaeae',
      500: '#A4A4A4',
      600: '#757575',
      800: '#e0e9f394',
      900: '#f5f6f8',
      A100: '#c3d8ff73',
    },
    action: {
      selected: '#f3acac',
      focus: '#acf3ac',
    },
  },
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0,0,0,0.2)',
        },
      },
    },
  },
});

type AppTheme = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
