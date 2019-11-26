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

const useStyles = makeStyles({
  rowText: {
    fontFamily: 'Saira Condensed',
    fontWeight: '1000',
    fontSize: '1.25em',
    color: '#58301B'
  } 
})

const Timeline = () => {
  const events = useEvents()
  const c = useStyles()

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className={c.rowText}>Name</TableCell>
          <TableCell className={c.rowText}>Rooms</TableCell>
          <TableCell className={c.rowText}>From</TableCell>
          <TableCell className={c.rowText}>To</TableCell>
          <TableCell className={c.rowText}>Layout</TableCell>
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
