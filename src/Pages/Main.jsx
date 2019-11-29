import React, { useState } from 'react'
import { Button, Grid, makeStyles } from '@material-ui/core'
import { useLogout } from 'Auth'
import { withLogin } from 'Components/withLogin'

import Timeline from './Timeline'
import Calendar from './Calendar'

const useStyle = makeStyles({
  button: {
    position: 'fixed',
    top: '10px',
    left: '10px',
    fontFamily: 'Saira Condensed',
  },
})

const Main = () => {
  const c = useStyle()
  const logout = useLogout()

  const [view, setView] = useState(false)

  return (
    <>
      <Grid container direction="column" spacing={2} className={c.button}>
        <Grid item>
          <Button variant="outlined" onClick={() => setView(v => !v)}>
            {view ? 'Calendar' : 'Timeline'}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={logout}>
            Logout
          </Button>
        </Grid>
      </Grid>
      {view ? <Timeline /> : <Calendar />}
    </>
  )
}

export default withLogin(Main)
