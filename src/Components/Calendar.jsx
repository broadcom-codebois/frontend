import React, { useState } from 'react'
import dayjs from 'dayjs'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import DatePicker from './DateRangePicker'

import {
  Box,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  MenuItem,
  makeStyles,
  InputLabel,
  Checkbox,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  withStyles,
} from '@material-ui/core'
import { AddRounded } from '@material-ui/icons'

import { useEvents, useCreateEvent } from 'Hooks'

import './calendar-style.scss'

import TableLayouts from 'Pages/TableLayouts'

const initialEventState = {
  name: '',
  description: '',
  author: '',
  north: true,
  south: true,
  begin_time: dayjs()
    .add(1, 'day')
    .valueOf(),
  end_time: dayjs()
    .add(2, 'day')
    .valueOf(),
  layout: 1,
  approved: false,
}

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
  dateRangePicker: {
    maxWidth: '151px',
    width: '151px',
    paddingTop: '26px',
  },
  disabledRoom: {
    backgroundColor: 'brown',
  },
  formLabel: {
    paddingTop: '26px',
  },
  formControl: {
    maxWidth: '151px',
    width: '151px',
  },
})

const convertToFCEvent = event => ({
  title: event.name,
  start: dayjs(event.begin_time).format('YYYY-MM-DDTHH:mm:ss'),
  end: dayjs(event.end_time).format('YYYY-MM-DDTHH:mm:ss'),
  description: event.description,
  color: event.north ? (event.south ? '#FF0000' : '#00FF00') : '#0000FF',
  extendedProps: {
    id: event.id,
  },
})

const BlueCheckbox = withStyles({
  root: {
    color: '#154A46',
    '&$checked': {
      color: '#154A46',
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />)

const Calendar = () => {
  const c = useStyle()

  const [events, refreshEvents] = useEvents()
  const createEvent = useCreateEvent(refreshEvents)

  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)
  const [selectedRooms, setSelectedRooms] = useState({
    north: true,
    south: true,
  })
  const [infoId, setInfoId] = useState(undefined)
  const [newEventData, setNewEventData] = useState(initialEventState)

  const visibleEvents = events.filter(event =>
    Object.keys(selectedRooms).some(key => selectedRooms[key] && event[key])
  )

  const visibleInfoDialog = events.find(event => event.id === infoId)

  const onSubmit = e => {
    e.preventDefault()
    createEvent(newEventData)

    setIsFormDialogOpen(false)
    setNewEventData(initialEventState)
  }

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
                <Typography>Rooms:</Typography>
              </Grid>
              <Grid item>
                <Box className="fc-button-group">
                  <button
                    type="button"
                    className={`fc-dayGridDay-button fc-button fc-button-primary ${
                      selectedRooms.north ? '' : c.disabledRoom
                    }`}
                    onClick={() =>
                      setSelectedRooms(r => ({ ...r, north: !r.north }))
                    }
                  >
                    North
                  </button>
                  <button
                    type="button"
                    className={`fc-dayGridDay-button fc-button fc-button-primary ${
                      selectedRooms.south ? '' : c.disabledRoom
                    }`}
                    onClick={() =>
                      setSelectedRooms(r => ({ ...r, south: !r.south }))
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

      <Dialog open={visibleInfoDialog} onClose={() => setInfoId(undefined)}>
        {visibleInfoDialog !== undefined && (
          <>
            <DialogTitle>{visibleInfoDialog.name}</DialogTitle>
            <DialogContent>
              <Typography>
                Rooms:{' '}
                {['north', 'south']
                  .filter(key => visibleInfoDialog[key])
                  .map(
                    key =>
                      ({
                        north: 'Auditorium North',
                        south: 'Auditorium South',
                      }[key])
                  )
                  .join(', ')}
              </Typography>
              <Typography>Owner: {visibleInfoDialog.author}</Typography>
            </DialogContent>
          </>
        )}
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
                <TextField
                  label="Event name"
                  value={newEventData.name}
                  onChange={e => {
                    if (e.target === null) return
                    const value = e.target.value
                    setNewEventData(d => ({ ...d, name: value }))
                  }}
                />
              </Grid>
              <Grid className={c.dateRangePicker}>
                <InputLabel htmlFor="datePicker">Time range</InputLabel>
                <DatePicker
                  value={{
                    start: dayjs(newEventData.begin_time).format(
                      'YYYY-M-D HH:mm'
                    ),
                    end: dayjs(newEventData.end_time).format('YYYY-M-D HH:mm'),
                  }}
                  onChange={value => {
                    setNewEventData(d => ({
                      ...d,
                      begin_time: dayjs(value.start).valueOf(),
                      end_time: dayjs(value.end).valueOf(),
                    }))
                  }}
                />
              </Grid>
              <FormControl
                required
                component="fieldset"
                className={c.formControl}
              >
                <FormLabel component="legend" className={c.formLabel}>
                  Rooms
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <BlueCheckbox
                        checked={newEventData.north}
                        onChange={() =>
                          setNewEventData(d => ({ ...d, north: !d.north }))
                        }
                        value="formNorth"
                      />
                    }
                    label="North"
                    color="#f5f8fa"
                  />
                  <FormControlLabel
                    control={
                      <BlueCheckbox
                        checked={newEventData.south}
                        onChange={() =>
                          setNewEventData(d => ({ ...d, south: !d.south }))
                        }
                        value="formSouth"
                      />
                    }
                    label="South"
                    color="#f5f8fa"
                  />
                </FormGroup>
              </FormControl>
              <Grid item>
                <TextField
                  label="Organiser name"
                  value={newEventData.author}
                  onChange={e => {
                    if (e.target === null) return
                    const value = e.target.value
                    setNewEventData(d => ({ ...d, author: value }))
                  }}
                />
              </Grid>
              <Grid item style={{ width: 172 }}>
                <TextField
                  select
                  label="Table layout"
                  value={newEventData.layout}
                  onChange={e => {
                    if (e.target === null) return
                    const value = e.target.value
                    setNewEventData(d => ({ ...d, layout: value }))
                  }}
                  style={{ width: '100%' }}
                >
                  <MenuItem value={1}>U-style</MenuItem>
                  <MenuItem value={2}>School style</MenuItem>
                  <MenuItem value={3}>Cinema style</MenuItem>
                  <MenuItem value={4}>Islands</MenuItem>
                  <MenuItem value={5}>Theatre style</MenuItem>
                  <MenuItem value={6}>Circle</MenuItem>
                </TextField>
              </Grid>
              <Grid item>
                <TableLayouts />
              </Grid>
              <Grid item>
                <TextField
                  label="Note"
                  multiline
                  value={newEventData.description}
                  onChange={e => {
                    if (e.target === null) return
                    const value = e.target.value
                    setNewEventData(d => ({ ...d, description: value }))
                  }}
                />
              </Grid>
            </Grid>
            <Box textAlign="right" mt={4} mb={2} w="100%">
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
