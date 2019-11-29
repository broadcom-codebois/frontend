import React, { useState } from 'react'
import dayjs from 'dayjs'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import {
  Box,
  Grid,
  Typography,
  makeStyles,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core'
import { AddRounded } from '@material-ui/icons'

import { useEvents } from 'Hooks'
import EventDetailDialog from './EventDetailDialog'
import CreateEventDialog from './CreateEventDialog'

import '../calendar-style.scss'

const useStyle = makeStyles({
  roomPicker: {
    display: 'flex',
    alignItems: 'center',
  },
  iconButton: {
    boxSizing: 'content-box',
    width: '24px',
    height: '24px',
  },
  logInButton: {
    boxSizing: 'content-box',
    marginRight: '0.5em',
  },
  dateRangePicker: {
    maxWidth: '151px',
    width: '151px',
    paddingTop: '26px',
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
  formLabel: {
    paddingTop: '26px',
  },
  formControl: {
    maxWidth: '151px',
    width: '151px',
  },
  field: {
    width: '145px',
  },
})

const convertToFCEvent = event => ({
  title: `${event.name} - by ${event.author_name}`,
  start: dayjs(event.begin_time).format('YYYY-MM-DDTHH:mm:ss'),
  end: dayjs(event.end_time).format('YYYY-MM-DDTHH:mm:ss'),
  description: event.description,
  color: event.approved
    ? event.north
      ? event.south
        ? '#E65137'
        : '#4983EE'
      : '#8AA00C'
    : 'white',
  borderColor: event.approved
    ? 'white'
    : event.north ? (event.south ? '#E65137' : '#4983EE') : '#8AA00C',
  textColor: event.approved
    ? 'white'
    : event.north ? (event.south ? '#E65137' : '#4983EE') : '#8AA00C',
  extendedProps: {
    id: event.id,
  },
})

const Calendar = () => {
  const c = useStyle()

  const [events, refreshEvents] = useEvents()

  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)
  const [selectedRooms, setSelectedRooms] = useState({
    north: true,
    south: false,
  })
  const [infoId, setInfoId] = useState(undefined)

  const visibleEvents = events.filter(event =>
    Object.keys(selectedRooms).some(key => selectedRooms[key] && event[key])
  )

  const visibleEventDetail = events.find(event => event.id === infoId)

  return (
    <>
      <FullCalendar
        eventClick={info => setInfoId(info.event.extendedProps.id)}
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        events={visibleEvents.map(convertToFCEvent)}
        header={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridDay,dayGridWeek,dayGridMonth',
        }}
        firstDay={1}
        weekends={false}
        contentHeight={600}
      />

      <Box mt={2}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          direction="row"
        >
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
          <Grid item>
            <button
              type="button"
              className={`fc-dayGridDay-button fc-button fc-button-primary ${c.iconButton}`}
              onClick={() => setIsFormDialogOpen(true)}
            >
              <AddRounded />
            </button>
          </Grid>
        </Grid>
      </Box>

      <EventDetailDialog
        visibleEventDetail={visibleEventDetail}
        setInfoId={setInfoId}
      />

      <CreateEventDialog
        isOpen={isFormDialogOpen}
        onClose={() => setIsFormDialogOpen(false)}
        refreshEvents={refreshEvents}
      />
    </>
  )
}

export default Calendar
