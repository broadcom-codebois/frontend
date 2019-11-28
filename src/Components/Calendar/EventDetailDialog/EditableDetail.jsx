import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
} from '@material-ui/core'

import { useUpdateEvent } from 'Hooks'
import EditEventForm from 'Components/EditEventForm'

const EditableDetail = ({ visibleEventDetail, setInfoId }) => {
  const updateEvent = useUpdateEvent()
  const [eventData, setEventData] = useState(visibleEventDetail)

  const onClose = () => setInfoId(undefined)

  const onSubmit = e => {
    e.preventDefault()
    if (visibleEventDetail !== undefined)
      updateEvent(visibleEventDetail.id)(eventData)

    onClose()
  }

  return (
    <Dialog open={visibleEventDetail !== undefined} onClose={onClose}>
      <DialogTitle style={{ color: 'black', margin: '3px 0px 0px 0px' }}>
        {eventData.name}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please note that any changes need to be re-approved.
        </DialogContentText>

        <form onSubmit={onSubmit}>
          <EditEventForm eventData={eventData} setEventData={setEventData} />
          <Box textAlign="right" mt={4} mb={2} w="100%">
            <button
              class="fc-dayGridDay-button fc-button fc-button-primary"
              id="submitButton"
            >
              Update
            </button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditableDetail
