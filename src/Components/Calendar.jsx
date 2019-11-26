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

const Calendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFormModalOpen, setIsFormModalOpen] = useState(true)
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

  const visibleEvents = events.filter(event =>
    Object.keys(selectedRooms).some(
      key => selectedRooms[key] && event.extendedProps[key]
    )
  )
  console.log(visibleEvents)

  return (
    <>
      <div id="roomPicker">
        <p>Rooms:</p>
        <div class="fc-button-group">
          <button
            type="button"
            class="fc-dayGridDay-button fc-button fc-button-primary"
            onClick={() => setSelectedRooms(r => ({ ...r, north: !r.north }))}
          >
            North
          </button>
          <button
            type="button"
            class="fc-dayGridDay-button fc-button fc-button-primary"
            onClick={() => setSelectedRooms(r => ({ ...r, south: !r.south }))}
          >
            South
          </button>
        </div>
      </div>
      <FullCalendar
        eventClick={function(info) {
          setModalInfo(info)
          console.log(info)

          setIsModalOpen(true)
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

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Paper>
          <h2 id="simple-modal-title">{modalInfo.event.title}</h2>
          <p id="simple-modal-description">
            Room:{' '}
            {modalInfo.event.extendedProps.north === true
              ? 'Auditorium North'
              : ' Auditorium South'}
          </p>
          <p>Owner: {modalInfo.event.extendedProps.owner}</p>
        </Paper>
      </Modal>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        style={{ height: '1em' }}
      >
        <Paper>
          <h2 id="simple-modal-title">New event</h2>
          <p id="simple-modal-description">
            Please note that your reservation needs to be approved first.
          </p>

          <form action="POST">
            <label htmlFor="name">Event name:</label>
            <br />
            <input type="text" name="name" />
            <br />
            <label htmlFor="date">Date and time:</label>
            <br />
            <label htmlFor="owner">Organiser name:</label>
            <br />
            <input type="text" name="owner" />
            <br />
            <label htmlFor="name">Organiser email:</label>
            <br />
            <input type="email" name="email" />
            <br />
            <label htmlFor="attendees">Number of attendees:</label>
            <br />
            <input
              type="number"
              name="attendees"
              min="2"
              max="180"
              placeholder="up to 180"
            />
            <br />
            <label htmlFor="note">Note:</label>
            <br />
            <input type="text" name="note" />
            <br />

            <button
              class="fc-dayGridDay-button fc-button fc-button-primary"
              id="submitButton"
            >
              Submit
            </button>
          </form>
          <p></p>
        </Paper>
      </Modal>
    </>
  )
}

export default Calendar
