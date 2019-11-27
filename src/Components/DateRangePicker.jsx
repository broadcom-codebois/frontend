import React from "react";
import DatetimeRangePicker from 'react-datetime-range-picker';
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import { Button } from '@material-ui/core'
const moment = extendMoment(originalMoment);

class DatePicker extends React.Component {
  constructor(props, context) {
    super(props, context);

    const today = moment();

    this.state = {
      isOpen: false,
      value: moment.range(today.clone().subtract(7, "days"), today.clone())
    };
  }

  onSelect = (value, states) => {
    this.setState({ value, states });
  };

  onToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  renderSelectionValue = () => {
    return (
      <div>
        {this.state.value.start.format("YYYY-MM-DD HH:MM")}
        {" - "}
        {this.state.value.end.format("YYYY-MM-DD HH:MM")}
      </div>
    );
  };

  render() {
    return (
      <div>
        
        <DatetimeRangePicker
            value={this.state.value}
            onSelect={this.onSelect}
            singleDateRange={true}
        />

      </div>
    );
  }
}

export default DatePicker
