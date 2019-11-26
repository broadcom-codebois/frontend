import React from 'react'
import { Box, Container, makeStyles } from '@material-ui/core'

import Timeline from 'Components/Timeline'

const useStyle = makeStyles({
  container: {
    backgroundColor: '#F7F8F7',
  },
})

const Main = () => {
  const c = useStyle()

  return (
    <Box className={c.container}>
      <Container maxWidth="md">
        <Timeline />
      </Container>
    </Box>
  )
}

export default Main
