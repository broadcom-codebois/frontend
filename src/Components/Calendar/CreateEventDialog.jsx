import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  Grid,
  TextField,
  InputLabel,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  MenuItem,
  Box,
  makeStyles,
} from '@material-ui/core'
import dayjs from 'dayjs'

import { Layouts } from 'Lib'
import TableLayouts from 'Pages/TableLayouts'
import { useCreateEvent } from 'Hooks'
import DatePicker from '../DateRangePicker'
import BlueCheckbox from './BlueCheckbox'

const initialEventState = {
  name: '',
  description: '',
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
  field: {},
})

const CreateEventDialog = ({ isOpen, onClose, refreshEvents }) => {
  const c = useStyle()
  const createEvent = useCreateEvent(refreshEvents)
  const [newEventData, setNewEventData] = useState(initialEventState)

  const onSubmit = e => {
    e.preventDefault()
    createEvent(newEventData)

    onClose()
    setNewEventData(initialEventState)
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle style={{ color: 'black', margin: '3px 0px 0px 0px' }}>
        New Event
      </DialogTitle>
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
                className={c.field}
              />
            </Grid>
            <Grid item className={c.dateRangePicker}>
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
            <Grid item>
              <FormControl
                required
                component="fieldset"
                className={c.formControl}
              >
                <FormLabel component="legend" className={c.formLabel}>
                  Auditorium
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
                    color="#4265F0"
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
                    color="#E65137"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid>
              <TextField
                select
                label="Table layout"
                value={newEventData.layout}
                onChange={e => {
                  if (e.target === null) return
                  const value = e.target.value
                  setNewEventData(d => ({ ...d, layout: value }))
                }}
                className={c.field}
              >
                {Object.keys(Layouts).map(key => (
                  <MenuItem key={key} value={key}>
                    {Layouts[key]}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item>
              <TableLayouts />
            </Grid>
            <Grid item>
              <TextField
                type="number"
                inputProps={{ min: '10', max: '180', step: '1' }}
                label="Number of people"
                value={newEventData.people}
                onChange={e => {
                  if (e.target === null) return
                  const value = e.target.value
                  setNewEventData(d => ({ ...d, people: value }))
                }}
                margin="normal"
                className={c.field}
              />
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
                className={c.field}
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
  )
}

export default CreateEventDialog
