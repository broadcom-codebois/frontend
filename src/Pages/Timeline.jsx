import React from 'react'
import { Box, Container, makeStyles, Typography } from '@material-ui/core'

import Timeline from 'Components/Timeline'

const useStyles = makeStyles({
  container: {
    paddingTop: '2em',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Saira Condensed',
  },
  heading: {
    fontWeight: '600',
    color: 'black',
    background: '#FFFFFF',
    marginTop: '-1em',
    paddingLeft: '.3em',
    paddingRight: '.3em',
    width: 'fit-content',
    fontFamily: 'Saira Condensed',
    float: 'right',
  },
  innerContainer: {
    border: '0.10em solid black',
    borderRadius: '1em',
    margin: 'auto',
    padding: '0.625em 1em 0.625em 1em',
  },
  copyright: {
    padding: '1em',
    float: 'right',
    color: 'black',
  },
})

const TimelinePage = () => {
  const c = useStyles()

  return (
    <Container maxWidth="md" className={c.container}>
      <Box className={c.innerContainer}>
        <Typography className={c.heading} variant="h4">
          TIMELINE
        </Typography>
        <Timeline />
      </Box>

      <Typography className={c.copyright}>&copy; CodeWeek 2019</Typography>
    </Container>
  )
}

export default TimelinePage
