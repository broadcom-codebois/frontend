import React from 'react'
import { TableRow, TableCell, makeStyles } from '@material-ui/core'
import dayjs from 'dayjs'

import { Layouts } from 'Lib'

const useStyles = makeStyles({
  rowText: {
    fontFamily: 'Saira Condensed',
  },
})

const Event = ({ event, conf }) => {
  const c = useStyles({ event, conf })
  const displayFormat = 'D/M H:M'

  return (
    <TableRow>
      <TableCell className={c.rowText}>{event.name}</TableCell>
      <TableCell className={c.rowText}>
        {[event.north ? 'north' : undefined, event.south ? 'south' : undefined]
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
      <TableCell className={c.rowText}>{event.owner}</TableCell>
    </TableRow>
  )
}

export default Event
