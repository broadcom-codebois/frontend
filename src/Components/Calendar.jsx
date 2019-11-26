import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import { Modal, Paper } from '@material-ui/core'

import './calendar-style.scss'

const events = [
  {
    title: 'Test Event 1',
    start: '2019-11-25T10:30:00',
    end: '2019-11-27T11:30:00',
    north: true,
    south: false,
    description: 'Event',
  },
  {
    title: 'Test Event 2',
    start: '2019-11-28T10:30:00',
    end: '2019-11-29T11:30:00',
    north: false,
    south: true,
    description: 'Event',
  },
]

const Calendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <FullCalendar
        eventClick={() => setIsModalOpen(true)}
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        events={events}
        header={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridDay,dayGridWeek,dayGridMonth',
        }}
        firstDay={1}
        weekends={false}
      />
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Paper>
          <h2 id="simple-modal-title">Text in a modal</h2>
          <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </Paper>
      </Modal>
    </>
  )
}

export default Calendar
