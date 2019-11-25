import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import './calendar-style.scss'

export default class Calendar extends React.Component {

  render() {

    const events = [
        {
            title: 'Test Event 1',
            start: '2019-11-25T10:30:00',
            end: '2019-11-25T11:30:00',
            extendedProps: {
              department: 'Room 1'
            },
            description: 'Event'
          },
          {
            title: 'Test Event 2',
            start: '2019-11-26T10:30:00',
            end: '2019-11-26T11:30:00',
            extendedProps: {
              department: 'Room 2'
            },
            description: 'Event'
          }
    ];

    return (
      <FullCalendar dateClick={this.handleDateClick} defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} events={events}/>
    )
  }

  handleDateClick = (arg) => {
    alert(arg.dateStr)
  }

}