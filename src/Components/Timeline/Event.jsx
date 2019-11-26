import React from 'react'
import { TableRow, TableCell, makeStyles } from '@material-ui/core'
import dayjs from 'dayjs'

const useStyles = makeStyles({})

const Event = ({ event, conf }) => {
  const c = useStyles({ event, conf })
  const displayFormat = 'D/M H:M'

  return (
    <TableRow>
      <TableCell align="right">{event.title}</TableCell>
      <TableCell align="right">
        {[event.north ? 'north' : undefined, event.south ? 'south' : undefined]
          .filter(a => a !== undefined)
          .join(', ')}
      </TableCell>
      <TableCell align="right">
        {dayjs(event.startTime).format(displayFormat)}
      </TableCell>
      <TableCell align="right">
        {dayjs(event.endTime).format(displayFormat)}
      </TableCell>
      <TableCell align="right">{event.layout}</TableCell>
    </TableRow>
  )
}

export default Event
