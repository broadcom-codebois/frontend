import React from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'

import Main from 'Pages/Main'
import TableLayouts from 'Pages/TableLayouts'

const theme = createMuiTheme({
  typography: {
    fontFamily: "'Saira Condensed', sans-serif",
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TableLayouts />
    </ThemeProvider>
  )
}

export default App
