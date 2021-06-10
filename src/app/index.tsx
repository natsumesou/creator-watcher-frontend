import React, { createContext, useContext, useState } from 'react'
import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import { theme } from '@/theme'
import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer';

type ContextType = {
  showProgress: boolean,
  setShowProgress:(value: boolean) => void
};

export const ProgressContext = createContext<ContextType>({
  showProgress: false,
  setShowProgress: () => {},
});
export const useProgressContext = () => useContext(ProgressContext);

const App = ({ children, location }) => {
  const [showProgress, setShowProgress] = useState<boolean>(false);
  return (
    <ProgressContext.Provider value={{showProgress, setShowProgress}}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Header location={location} showProgress={true} />
      <main>{children}</main>
      <Footer />
    </MuiThemeProvider>
    </ProgressContext.Provider>
  )
}

export const wrapPageElement = ({ element, props }) => <App location={props.location}>{element}</App>
