import React from 'react'
import { TableRow, TableCell, makeStyles } from '@material-ui/core'
import dayjs from 'dayjs'

import { Layouts } from 'Lib'

const useStyles = makeStyles({
  rowText: {
    fontFamily: 'Saira Condensed',
  },
  south: {
    color: '#8AA00C !important',
  },
  north: {
    color: '#4265F0 !important',
  },
  both: {
    color: '#E65137 !important',
  },
})

const Event = ({ event, conf }) => {
  const c = useStyles({ event, conf })
  const displayFormat = 'D/M H:M'

  console.log(event)

  if (event.approved === 0) {
    return(
      <></>
    )
  } else {
    return (
      <TableRow>
        <TableCell className={c.rowText}>{event.name}</TableCell>
        <TableCell className={
          (event.north && event.south) ? c.both : (event.north ? c.north : c.south)
        }>
          {[event.north ? 'North' : undefined, event.south ? 'South' : undefined]
            .filter(a => a !== undefined)
            .join(', ')}
        </TableCell>
        <TableCell className={c.rowText}>
          {dayjs(event.begin_time).format(displayFormat)}
        </TableCell>
        <TableCell className={c.rowText}>
          {dayjs(event.end_time).format(displayFormat)}
        </TableCell>
        <TableCell className={c.rowText}>{Layouts[event.layout]}</TableCell>
        <TableCell className={c.rowText}>{event.author_name}</TableCell>
      </TableRow>
    )
  }
}

export default Event
