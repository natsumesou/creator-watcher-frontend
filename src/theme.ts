import { createMuiTheme } from '@material-ui/core/styles'
import { Shadows } from '@material-ui/core/styles/shadows'

const { palette, breakpoints } = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffffff',
      dark: '#078085',
      contrastText: '#ffffff',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#ffffff',
    },
    text: {
      primary: 'rgba(0,0,0,0.87)',
      secondary: 'rgba(0,0,0,0.54)',
      disabled: 'rgba(0,0,0,0.26)',
    },
  },
})

export const theme = createMuiTheme({
  palette: palette,
  breakpoints: breakpoints,
  typography: {
    fontFamily: '"Noto Sans JP", sans-serif',
    h1: {
      fontSize: '2.4rem',
      fontWeight: 'bold',
      color: palette.text.primary,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: palette.text.primary,
    },
    h3: {
      fontSize: '1.6rem',
      fontWeight: 'bold',
      color: palette.text.primary,
    },
    h4: {
      fontSize: '1.4rem',
      fontWeight: 'bold',
      color: palette.text.primary,
    },
    h5: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: palette.text.primary,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: palette.text.primary,
    },
    body1: {
      letterSpacing: 0,
      fontSize: '1.6rem',
      color: palette.text.primary,
    },
    body2: {
      fontSize: '1.4rem',
      lineHeight: '1.8rem',
      color: palette.text.secondary,
    },
    button: {
      textTransform: 'none',
      fontSize: '1.2rem',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          minHeight: '100%',
          fontSize: '12px',
        },
      },
    },
    MuiButton: {
      sizeLarge: {
        "& $label": {
          fontSize: '1.6rem',
        }
      }
    },
    MuiFab: {
      sizeMedium: {
        "& $label": {
          fontSize: '1.6rem',
        }
      }
    }
  },
  shadows: Array(25).fill('none') as Shadows,
})
