import React, { createContext, useContext, useState } from 'react'
import { createStyles, CssBaseline, makeStyles, MuiThemeProvider, Theme } from '@material-ui/core'
import { theme } from '@/theme'
import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer';
import { HelmetProvider } from 'react-helmet-async';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      [theme.breakpoints.up('sm')]: {
        width: '800px',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      margin: '0 auto',
    },
  }),
);

export type PageContext = {
  [pageContext: string]: {
    [site: string]: {
      [siteMetadata: string]: SiteMetadata,
    }
  }
}

export type SiteMetadata = {
  title: string,
  description: string,
  siteUrl: string,
  siteLogo: string,
  defaultImage: string,
  author: string,
}

type ContextType = {
  showProgress: boolean,
  setShowProgress:(value: boolean) => void
};

export const ProgressContext = createContext<ContextType>({
  showProgress: false,
  setShowProgress: () => {},
});
export const useProgressContext = () => useContext(ProgressContext);

const App = ({ children }) => {
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const classes = useStyles();
  const helmetContext = {};

  return (
    <HelmetProvider context={helmetContext}>
    <ProgressContext.Provider value={{showProgress, setShowProgress}}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main className={classes.main}>{children}</main>
      <Footer />
    </MuiThemeProvider>
    </ProgressContext.Provider>
    </HelmetProvider>
  )
}

export const wrapPageElement = ({ element, props }) => <App>{element}</App>
