import React, { useEffect } from 'react'
import { Box } from '@material-ui/core'

import { useGlobalState } from 'State'
import { useLogin } from 'Auth'

export const withLogin = Component => ({ ...props }) => {
  const [globalState] = useGlobalState()

  const login = useLogin()
  useEffect(() => {
    if (!globalState.auth.isAuthenticated) {
      login()
    }
  }, [globalState.auth.isAuthenticated]) // eslint-disable-line

  if (globalState.auth.isAuthenticated) {
    return <Component {...props} />
  }

  return <Box style={{ fontSize: '100px' }}>RUST</Box>
}
