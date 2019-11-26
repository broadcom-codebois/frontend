import React from 'react'
import Calendar from '../Components/Calendar.jsx'
import { Box, Container, makeStyles } from '@material-ui/core'

import Timeline from 'Components/Timeline'

const useStyle = makeStyles({
  container: {
    backgroundColor: '#DFF6F0',
  },
})

const Main = () => {
  const c = useStyle()

  return (
    <div>
      <div id='main'>
        <h1>Reservation system</h1>
        <Calendar />
      </div>
      
      <p id='copyright'>&copy; CodeWeek 2019</p>
  </div>
  );
    <Box className={c.container}>
      <Container maxWidth="xs">
        <Timeline />
      </Container>
    </Box>
  )
}

export default Main
