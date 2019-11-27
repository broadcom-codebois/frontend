import React from 'react'
import DatetimeRangePicker from 'react-datetime-range-picker'
import originalMoment from 'moment'
import { extendMoment } from 'moment-range'
import { Button } from '@material-ui/core'
const moment = extendMoment(originalMoment)

class DatePicker extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      isOpen: false,
    }
  }

  onToggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const value = moment.range(
      moment(this.props.value.start),
      moment(this.props.value.end)
    )

    return (
      <DatetimeRangePicker
        value={value}
        onChange={this.props.onChange}
        singleDateRange={true}
      />
    )
  }
}

export default DatePicker
