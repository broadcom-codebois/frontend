import React from 'react'
import {
  Box,
  Container,
  Typography,
  makeStyles,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Grid,
} from '@material-ui/core'

import Calendar from 'Components/Calendar'

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
    border: '0.1em solid black',
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


      <Grid item>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell><b>Legend:</b></TableCell>
              <TableCell style={{ color: '#4983EE' }}>North</TableCell>
              <TableCell style={{ color: '#8AA00C' }}>South</TableCell>
              <TableCell style={{ color: '#E65137' }}>Both</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>

      <Typography className={c.copyright}>&copy; CodeWeek 2019</Typography>
    </Container>
  )
}

export default CalendarPage
