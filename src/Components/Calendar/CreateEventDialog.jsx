import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
} from '@material-ui/core'
import dayjs from 'dayjs'

import { useCreateEvent } from 'Hooks'
import EditEventForm from 'Components/EditEventForm'

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

const CreateEventDialog = ({ isOpen, onClose, refreshEvents }) => {
  const createEvent = useCreateEvent(refreshEvents)
  const [newEventData, setNewEventData] = useState(initialEventState)

  const onSubmit = e => {
    e.preventDefault()
    createEvent(newEventData)

    onClose()
    setNewEventData(initialEventState)
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle style={{ color: 'black', margin: '3px 0px 0px 0px' }}>
        New Event
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please note that your reservation needs to be approved first.
        </DialogContentText>

        <form onSubmit={onSubmit}>
          <EditEventForm
            eventData={newEventData}
            setEventData={setNewEventData}
          />
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
