import React from 'react'
import { Box, Container, Typography, makeStyles } from '@material-ui/core'

import Calendar from 'Components/Calendar/index.jsx/index.js'
import { withLogin } from 'Components/withLogin'

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
    border: '0.30em solid #EAA853',
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

const CalendarPage = () => {
  const c = useStyles()

  return (
    <Container maxWidth="md" className={c.container}>
      <Box className={c.innerContainer}>
        <Typography className={c.heading} variant="h4">
          RESERVATION SYSTEM
        </Typography>
        <Calendar />
      </Box>

      <Typography variant="p" className={c.copyright}>
        &copy; CodeWeek 2019
      </Typography>
    </Container>
  )
}

export default withLogin(CalendarPage)
