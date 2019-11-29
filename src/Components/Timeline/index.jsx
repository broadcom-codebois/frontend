import React from 'react'
import dayjs from 'dayjs'
import {useState} from 'react'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
  Grid,
  Box
} from '@material-ui/core'
import { useEvents } from 'Hooks'
import Event from './Event'

const useStyles = makeStyles({
  rowText: {
    fontFamily: 'Saira Condensed',
    fontWeight: '1000',
    fontSize: '1.25em',
    color: 'black',
  },
  disabledSouth: {
    borderColor: '#8AA00C !important',
    color: '#8AA00C !important',
  },
  enabledSouth: {
    backgroundColor: '#8AA00C !important',
    borderColor: '#8AA00C !important',
    color: 'white !important',
  },
  disabledNorth: {
    borderColor: '#4265F0 !important',
    color: '#4265F0 !important',
  },
  enabledNorth: {
    backgroundColor: '#4265F0 !important',
    borderColor: '#4265F0 !important',
    color: 'white !important',
  },
  legendRow: {
    borderTop: '1px solid rgba(224, 224, 224, 1)',
  },
})

const Timeline = () => {
  const c = useStyles()

  const [events] = useEvents()

  const [selectedRooms, setSelectedRooms] = useState({
    north: true,
    south: false,
  })

  const visibleEvents = events.filter(event =>
    Object.keys(selectedRooms).some(key => selectedRooms[key] && event[key])
  )

  return (

    <>
    <Grid>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Grid item>
                  <Grid container direction="row" alignItems="center" spacing={2}>
                    <Grid item>
                        <Box className="fc-button-group">
                          <button
                            type="button"
                            className={`fc-dayGridDay-button fc-button fc-button-primary ${
                              selectedRooms.north ? c.enabledNorth : c.disabledNorth
                            }`}
                            onClick={() =>
                              setSelectedRooms(r => ({
                                ...r,
                                north: !r.north,
                                south: true,
                              }))
                            }
                          >
                          North
                          </button>
                          <button
                            type="button"
                            className={`fc-dayGridDay-button fc-button fc-button-primary ${
                              selectedRooms.south ? c.enabledSouth : c.disabledSouth
                            }`}
                            onClick={() =>
                              setSelectedRooms(r => ({
                                ...r,
                                south: !r.south,
                                north: true,
                              }))
                            }
                          >
                          South
                        </button>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid item>
                  <Table size="small">
                    <TableBody>
                      <TableRow className={c.legendRow}>
                        <TableCell><b>Legend:</b></TableCell>
                        <TableCell style={{ color: '#4983EE' }}>North</TableCell>
                        <TableCell style={{ color: '#8AA00C' }}>South</TableCell>
                        <TableCell style={{ color: '#E65137' }}>Both</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>

    <Table>
      <TableHead>
        <TableRow>
          <TableCell className={c.rowText}>Name</TableCell>
          <TableCell className={c.rowText}>Auditorium</TableCell>
          <TableCell className={c.rowText}>From</TableCell>
          <TableCell className={c.rowText}>To</TableCell>
          <TableCell className={c.rowText}>Layout</TableCell>
          <TableCell className={c.rowText}>Owner</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {visibleEvents
          .sort(e => e.startTime)
          .map(event => (
            <Event key={event.title} event={event} />
          ))}
      </TableBody>
    </Table>

    </>
  )
}

export default Timeline
