import React from 'react'
import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import { theme } from '@/theme'
import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer';

const App = ({ children, location }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Header location={location} />
      <main>{children}</main>
      <Footer />
    </MuiThemeProvider>
  )
}

export const wrapPageElement = ({ element, props }) => <App location={props.location}>{element}</App>
