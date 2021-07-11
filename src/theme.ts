import { createMuiTheme } from '@material-ui/core/styles'
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'
import { Shadows } from '@material-ui/core/styles/shadows'

const breakpoints = createBreakpoints({})

const { palette } = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffffff',
      dark: 'rgba(0,0,0,0.70)',
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
      [breakpoints.down('xs')]: {
        fontSize: '1.6rem',
      },
    },
    h3: {
      fontSize: '1.6rem',
      fontWeight: 'bold',
      color: palette.text.primary,
      [breakpoints.down('xs')]: {
        fontSize: '1.4rem',
      },
    },
    h4: {
      fontSize: '1.4rem',
      fontWeight: 'bold',
      color: palette.text.primary,
      [breakpoints.down('xs')]: {
        fontSize: '1.2rem',
      },
    },
    h5: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: palette.text.primary,
      [breakpoints.down('xs')]: {
        fontSize: '1.0rem',
      },
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: palette.text.primary,
      [breakpoints.down('xs')]: {
        fontSize: '0.8rem',
      },
    },
    body1: {
      letterSpacing: 0,
      fontSize: '1.6rem',
      color: palette.text.primary,
      [breakpoints.down('xs')]: {
        fontSize: '1.4rem',
      },
    },
    body2: {
      fontSize: '1.2rem',
      lineHeight: '1.4rem',
      color: palette.text.secondary,
      [breakpoints.down('xs')]: {
        fontSize: '1.0rem',
        lineHeight: '1.2rem',
      },
    },
    button: {
      textTransform: 'none',
      fontSize: '1.2rem',
      [breakpoints.down('xs')]: {
        fontSize: '1.0rem',
      },
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
        },
        [breakpoints.down('xs')]: {
          fontSize: '1.4rem',
        },
      },
    },
    MuiFab: {
      sizeMedium: {
        "& $label": {
          fontSize: '1.6rem',
        },
        [breakpoints.down('xs')]: {
          fontSize: '1.4rem',
        },
      }
    }
  },
  shadows: Array(25).fill('none') as Shadows,
})
