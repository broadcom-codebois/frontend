import React from 'react'
import dayjs from 'dayjs'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
} from '@material-ui/core'

import Event from './Event'

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

const useStyles = makeStyles({})

const Timeline = () => {
  const events = useEvents()
  const c = useStyles()

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Rooms</TableCell>
          <TableCell align="right">From</TableCell>
          <TableCell align="right">To</TableCell>
          <TableCell align="right">Layout</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {events
          .sort(e => e.startTime)
          .map(event => (
            <Event key={event.title} event={event} />
          ))}
      </TableBody>
    </Table>
  )
}

export default Timeline
