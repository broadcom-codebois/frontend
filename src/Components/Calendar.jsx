import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import {
  Box,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  makeStyles,
} from '@material-ui/core'
import { AddRounded } from '@material-ui/icons'

import './calendar-style.scss'

const events = [
  {
    title: 'Test Event 1',
    start: '2019-11-25T10:30:00',
    end: '2019-11-27T11:30:00',
    description: 'Event',
    color: '#71B7B0',
    extendedProps: {
      owner: 'Matyáš Boháček',
      north: true,
      south: false,
    },
  },
  {
    title: 'Test Event 2',
    start: '2019-11-28T10:30:00',
    end: '2019-11-29T11:30:00',
    description: 'Event',
    color: '#A7A635',
    extendedProps: {
      owner: 'Jan Novák',
      north: false,
      south: true,
    },
  },
]

const useStyle = makeStyles({
  roomPicker: {
    display: 'flex',
    alignItems: 'center',
  },
  customActions: {
    display: 'flex',
    alignItems: 'center',
  },
  iconButton: {
    boxSizing: 'content-box',
    width: '24px',
    height: '24px',
  },
})

const Calendar = () => {
  const c = useStyle()

  const [isEventInfoDialogOpen, setIsEventInfoDialogOpen] = useState(false)
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)
  const [selectedRooms, setSelectedRooms] = useState({
    north: true,
    south: true,
  })
  const [modalInfo, setModalInfo] = useState({
    event: {
      title: '',
      extendedProps: {
        north: true,
        south: false,
        owner: '',
      },
    },
  })
  const [newEventData, setNewEventData] = useState({
    //
  })

  const visibleEvents = events.filter(event =>
    Object.keys(selectedRooms).some(
      key => selectedRooms[key] && event.extendedProps[key]
    )
  )

  const onSubmit = e => {
    e.preventDefault()
    alert('huray')
  }

  return (
    <>
      <Box className={c.customActions}>
        <Box className={c.roomPicker} mr={2} my={1}>
          <Typography>Rooms:</Typography>
          <Box className="fc-button-group" ml={2}>
            <button
              type="button"
              className="fc-dayGridDay-button fc-button fc-button-primary"
              onClick={() => setSelectedRooms(r => ({ ...r, north: !r.north }))}
            >
              North
            </button>
            <button
              type="button"
              className="fc-dayGridDay-button fc-button fc-button-primary"
              onClick={() => setSelectedRooms(r => ({ ...r, south: !r.south }))}
            >
              South
            </button>
          </Box>
        </Box>
        <Box mx={4} my={1}>
          <button
            type="button"
            className={`fc-dayGridDay-button fc-button fc-button-primary ${c.iconButton}`}
            onClick={() => setIsFormDialogOpen(true)}
          >
            <AddRounded />
          </button>
        </Box>
      </Box>
      <FullCalendar
        eventClick={function(info) {
          setModalInfo(info)
          setIsEventInfoDialogOpen(true)
        }}
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        events={visibleEvents}
        header={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridDay,dayGridWeek,dayGridMonth',
        }}
        firstDay={1}
        weekends={false}
      />

      <Dialog
        open={isEventInfoDialogOpen}
        onClose={() => setIsEventInfoDialogOpen(false)}
      >
        <DialogTitle>{modalInfo.event.title}</DialogTitle>
        <DialogContent>
          <Typography>
            Rooms:{' '}
            {['north', 'south']
              .filter(key => modalInfo.event.extendedProps[key])
              .map(
                key =>
                  ({
                    north: 'Auditorium North',
                    south: 'Auditorium South',
                  }[key])
              )
              .join(', ')}
          </Typography>
          <Typography>Owner: {modalInfo.event.extendedProps.owner}</Typography>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isFormDialogOpen}
        onClose={() => setIsFormDialogOpen(false)}
      >
        <DialogTitle>New Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please note that your reservation needs to be approved first.
          </DialogContentText>

          <form onSubmit={onSubmit}>
            <Grid container spacing={1} direction="column" alignItems="center">
              <Grid item>
                <TextField label="Event name" />
              </Grid>
              <Grid item>
                <TextField label="Date & Time" />
              </Grid>
              <Grid item>
                <TextField label="Orginiser name" />
              </Grid>
              <Grid item>
                <TextField type="email" label="Orginiser email" />
              </Grid>
              <Grid item>
                <TextField
                  type="number"
                  min={2}
                  max={180}
                  placeholder="up to 180"
                  label="# of attendees"
                />
              </Grid>
              <Grid item>
                <TextField label="Note" multiline />
              </Grid>
            </Grid>
            <Box textAlign="right" mt={4} w="100%">
              <button
                class="fc-dayGridDay-button fc-button fc-button-primary"
                id="submitButton"
              >
                Submit
              </button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Calendar
