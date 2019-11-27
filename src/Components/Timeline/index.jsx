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
import { useEvents } from 'Hooks'
import Event from './Event'


const useStyles = makeStyles({
  rowText: {
    fontFamily: 'Saira Condensed',
    fontWeight: '1000',
    fontSize: '1.25em',
    color: '#58301B'
  } 
})

const Timeline = () => {
  const c = useStyles()

  const [events, refreshEvents] = useEvents()

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className={c.rowText}>Name</TableCell>
          <TableCell className={c.rowText}>Rooms</TableCell>
          <TableCell className={c.rowText}>Froms</TableCell>
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
