import React, { useState } from 'react'
import {
  Grid,
  TextField,
  InputLabel,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  MenuItem,
  makeStyles,
} from '@material-ui/core'
import dayjs from 'dayjs'

import { Layouts } from 'Lib'
import TableLayouts from 'Pages/TableLayouts'
import DatePicker from './DateRangePicker'
import BlueCheckbox from './BlueCheckbox'

const useStyle = makeStyles({
  formLabel: {
    paddingTop: '26px',
  },
  fullWidth: {
    width: '100%',
  },
})

const EditEventForm = ({ eventData, setEventData }) => {
  const c = useStyle()

  return (
    <Grid container spacing={3} direction="column">
      <Grid item>
        <TextField
          label="Event name"
          value={eventData.name}
          onChange={e => {
            if (e.target === null) return
            const value = e.target.value
            setEventData(d => ({ ...d, name: value }))
          }}
          className={c.field}
          fullWidth
        />
      </Grid>
      <Grid item>
        <InputLabel htmlFor="datePicker">Time range</InputLabel>
        <DatePicker
          value={{
            start: dayjs(eventData.begin_time).format('YYYY-M-D HH:mm'),
            end: dayjs(eventData.end_time).format('YYYY-M-D HH:mm'),
          }}
          onChange={value => {
            setEventData(d => ({
              ...d,
              begin_time: dayjs(value.start).valueOf(),
              end_time: dayjs(value.end).valueOf(),
            }))
          }}
        />
      </Grid>
      <Grid item>
        <FormControl required component="fieldset">
          <FormLabel component="legend" className={c.formLabel}>
            Auditorium
          </FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <BlueCheckbox
                  checked={eventData.north}
                  onChange={() =>
                    setEventData(d => ({ ...d, north: !d.north }))
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
                  checked={eventData.south}
                  onChange={() =>
                    setEventData(d => ({ ...d, south: !d.south }))
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
      <Grid item>
        <TextField
          select
          label="Table layout"
          value={eventData.layout}
          onChange={e => {
            if (e.target === null) return
            const value = e.target.value
            setEventData(d => ({ ...d, layout: value }))
          }}
          className={c.field}
          fullWidth
        >
          {Object.keys(Layouts).map(key => (
            <MenuItem key={key} value={key}>
              {Layouts[key]}
            </MenuItem>
          ))}
        </TextField>
        <TableLayouts />
      </Grid>
      <Grid item>
        <TextField
          type="number"
          inputProps={{ min: '10', max: '180', step: '1' }}
          label="Number of people"
          value={eventData.people}
          onChange={e => {
            if (e.target === null) return
            const value = e.target.value
            setEventData(d => ({ ...d, people: value }))
          }}
          className={c.field}
          fullWidth
        />
      </Grid>
      <Grid item>
        <TextField
          label="Note"
          multiline
          rowsMax={6}
          value={eventData.description}
          onChange={e => {
            if (e.target === null) return
            const value = e.target.value
            setEventData(d => ({ ...d, description: value }))
          }}
          className={c.field}
          fullWidth
        />
      </Grid>
    </Grid>
  )
}

export default EditEventForm
