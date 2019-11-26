import React from 'react'
import { Box, Container, Typography, makeStyles } from '@material-ui/core'

import Calendar from '../Components/Calendar.jsx'

const useStyles = makeStyles({
  container: {
    paddingTop: '2em',
  },
  heading: {
    fontWeight: '1000',
    color: '#2C3E50',
    background: '#FFF',
    marginTop: '-1em',
    paddingLeft: '0.2em',
    paddingRight: '0.2em',
    width: 'fit-content',
  },
  innerContainer: {
    border: '0.25em solid #2C3E50',
    borderRadius: '1em',
    margin: 'auto',
    padding: '0.625em',
    width: '80%',
  },
  copyright: {
    paddingBottom: '1em',
  },
})

const Main = () => {
  const c = useStyles()

  return (
    <Container maxWidth="xl" className={c.container}>
      <Box className={c.innerContainer} textAlign="center">
        <Typography className={c.heading} variant="h4">
          Reservation system
        </Typography>
        <Calendar />
      </Box>

      <Typography variant="p" className={c.copyright}>
        &copy; CodeWeek 2019
      </Typography>
    </Container>
  )
}

export default Main
