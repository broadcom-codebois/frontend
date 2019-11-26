import React, { useState } from 'react'
import { Box, Button, makeStyles } from '@material-ui/core'

import Timeline from './Timeline'
import Calendar from './Calendar'

const useStyle = makeStyles({
  button: {
    position: 'fixed',
    top: '10px',
    left: '10px',
  },
})

const Main = () => {
  const c = useStyle()

  const [view, setView] = useState(false)

  return (
    <>
      <Box className={c.button}>
        <Button primary variant="contained" onClick={() => setView(v => !v)}>
          {view ? 'Calendar' : 'Timeline'}
        </Button>
      </Box>
      {view ? <Timeline /> : <Calendar />}
    </>
  )
}

export default Main
