import React from 'react'
import { Dialog, Box, Button } from '@material-ui/core'

import { useGlobalState } from 'State'
import { useLogin } from 'Auth'

export const withLogin = Component => ({ ...props }) => {
  const [globalState] = useGlobalState()

  const login = useLogin()

  if (globalState.auth.isAuthenticated) {
    return <Component {...props} />
  }

  return (
    <Dialog open>
      <Box p={2}>
        <Button variant="outlined" color="primary" size="large" onClick={login}>
          Login to RUST
        </Button>
      </Box>
    </Dialog>
  )
}
