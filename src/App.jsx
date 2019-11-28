import React from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'

import { GlobalStateProvider } from 'State'
import Main from 'Pages/Main'

const theme = createMuiTheme({
  typography: {
    fontFamily: "'Saira Condensed', sans-serif",
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStateProvider>
        <Main />
      </GlobalStateProvider>
    </ThemeProvider>
  )
}

export default App
