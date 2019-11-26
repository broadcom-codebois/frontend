import React from 'react'
import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core'
import dayjs from 'dayjs'

const useStyles = makeStyles({
  container: {
    position: 'absolute',
    top: p => `${(p.event.startTime - p.conf.minTime) * p.conf.ms_height}px`,
    left: p => (p.event.north ? '0%' : '50%'),
    right: p => (p.event.south ? '0%' : '50%'),
    height: p =>
      `${(p.event.endTime - p.event.startTime) * p.conf.ms_height}px`,
    padding: '5px',
  },
  paper: {
    backgroundColor: p =>
      p.event.north ? (p.event.south ? '#451E1C' : '#F7BE16') : '#C70D3A',
    height: '100%',
    width: '100%',
    textAlign: 'center',
    padding: '10px',
    boxSizing: 'border-box',
    fontFamily: 'Montserrat',
    color: 'white',
  },
})

const Event = ({ event, conf }) => {
  const c = useStyles({ event, conf })
  const displayFormat = 'D/M H:M'

  return (
    <Box className={c.container}>
      <Paper className={c.paper}>
        <Grid container justify="center" spacing={3}>
          <Grid item>
            <Typography variant="h5">{event.title}</Typography>
          </Grid>
          <Grid container justify="center" direction="column" spacing={1}>
            <Grid item>
              <Typography variant="p">
                {dayjs(event.startTime).format(displayFormat)}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="p">
                {dayjs(event.endTime).format(displayFormat)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default Event
