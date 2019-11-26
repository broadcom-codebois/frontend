import React from 'react'
import dayjs from 'dayjs'
import { Grid, Box, makeStyles } from '@material-ui/core'

import Event from './Event'
import color from '@material-ui/core/colors/yellow'

const useEvents = () => [
  {
    north: true,
    south: false,
    startTime: dayjs()
      .subtract(1, 'day')
      .valueOf(),
    endTime: dayjs()
      .add(1, 'hour')
      .valueOf(),
    title: 'Event name',
  },
  {
    north: false,
    south: true,
    startTime: dayjs()
      .subtract(1, 'hour')
      .valueOf(),
    endTime: dayjs()
      .add(1, 'day')
      .valueOf(),
    title: 'Event name 2',
  },
  {
    north: true,
    south: true,
    startTime: dayjs()
      .add(1, 'day')
      .add(1, 'hour')
      .valueOf(),
    endTime: dayjs()
      .add(2, 'day')
      .valueOf(),
    title: 'Event name 2',
  },
]

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    position: 'relative',
    width: '100%',
    minHeight: p => `${p.height}px`,
  },
  header: {
    fontFamily: 'Abril Fatface',
    boxSizing: 'border-box',
    backgroundColor: '#202040',
    padding: '5px',
    fontSize: '25px',
    margin: '10px 0px 1px 0px',
    borderRadius: '3px',
    color: 'white',
  },
})

const Timeline = () => {
  const events = useEvents()
  const conf = {
    ms_height: 400 / (24 * 60 * 60 * 1000),
    minTime: Math.min(...events.map(e => e.startTime)),
    maxTime: Math.max(...events.map(e => e.endTime)),
  }
  const length = conf.maxTime - conf.minTime
  const height = length * conf.ms_height
  const c = useStyles({ height })
  return (
    <Box className={c.root}>
      <Grid className={c.header} justify="space-around" container>
        <Grid item>North</Grid>
        <Grid item>South</Grid>
      </Grid>
      <Box className={c.container}>
        {events.map(event => (
          <Event key={event.title} conf={conf} event={event} />
        ))}
      </Box>
    </Box>
  )
}

export default Timeline
