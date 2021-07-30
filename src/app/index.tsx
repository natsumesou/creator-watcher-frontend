import React, { createContext, useContext, useState } from 'react'
import { createStyles, CssBaseline, makeStyles, MuiThemeProvider, Theme } from '@material-ui/core'
import { theme } from '@/theme'
import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer';

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

type BuildTimestampContextType = {
  timestamp: number,
  setTimestamp:(value: number) => void
};

export const ProgressContext = createContext<ContextType>({
  showProgress: false,
  setShowProgress: () => {},
});
export const useProgressContext = () => useContext(ProgressContext);

export const buildTimestampContext = createContext<BuildTimestampContextType>({
  timestamp: null,
  setTimestamp: () => {},
});
export const useBuildTimestampContext = () => useContext(buildTimestampContext);

const App = ({ children }) => {
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [timestamp, setTimestamp] = useState<number>(children.props.pageContext.buildTimestamp);
  const classes = useStyles();

  return (
    <ProgressContext.Provider value={{showProgress, setShowProgress}}>
    <buildTimestampContext.Provider value={{timestamp, setTimestamp}}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main className={classes.main}>{children}</main>
      <Footer />
    </MuiThemeProvider>
    </buildTimestampContext.Provider>
    </ProgressContext.Provider>
  )
}

export const wrapPageElement = ({ element, props }) => <App>{element}</App>
