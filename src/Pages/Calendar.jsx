import React from 'react'
import { Box, Container, Typography, makeStyles } from '@material-ui/core'

import Calendar from '../Components/Calendar.jsx'

const useStyles = makeStyles({
  container: {
    paddingTop: '2em',
    backgroundColor: '#f7ffff',
  },
  heading: {
    fontWeight: '1000',
    color: '#2C3E50',
    background: '#f7ffff',
    marginTop: '-1em',
    paddingLeft: '.2em',
    paddingRight: '.2em',
    width: 'fit-content',
  },
  innerContainer: {
    border: '0.25em solid #2C3E50',
    borderRadius: '1em',
    margin: 'auto',
    padding: '0.625em 1em 0.625em 1em',
  },
  copyright: {
    padding: '1em',
    float: 'right',
  },
})

const Main = () => {
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

export default Main
