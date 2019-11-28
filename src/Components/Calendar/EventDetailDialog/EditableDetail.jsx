import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from '@material-ui/core'
import { Clear as ClearIcon, Done as DoneIcon } from '@material-ui/icons'

import { useUpdateEvent, useDeleteEvent } from 'Hooks'
import EditEventForm from 'Components/EditEventForm'

const EditableDetail = ({ visibleEventDetail, setInfoId }) => {
  const updateEvent = useUpdateEvent()
  const [eventData, setEventData] = useState(visibleEventDetail)
  const deleteEvent = useDeleteEvent()

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
          <Box mt={2}>
            <DialogActions>
              <Button
                onClick={() => deleteEvent(visibleEventDetail.id)}
                color="secondary"
                variant="contained"
                startIcon={<ClearIcon />}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                startIcon={<DoneIcon />}
              >
                Update
              </Button>
            </DialogActions>
          </Box>
        </form>{' '}
      </DialogContent>
    </Dialog>
  )
}

export default EditableDetail
