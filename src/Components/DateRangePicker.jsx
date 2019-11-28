import React from 'react'
import { makeStyles } from '@material-ui/core'
import DatetimeRangePicker from 'react-datetime-range-picker'
import originalMoment from 'moment'
import { extendMoment } from 'moment-range'
const moment = extendMoment(originalMoment)

const useStyle = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    '& > div': {
      margin: '0 1em',
      width: 'auto',
      '& > input': {
        width: 'auto',
      },
    },
  },
})

const DatePicker = ({ value, onChange }) => {
  const c = useStyle()
  const computedValue = moment.range(moment(value.start), moment(value.end))

  return (
    <DatetimeRangePicker
      className={c.root}
      value={computedValue}
      onChange={onChange}
      singleDateRange
    />
  )
}

export default DatePicker
