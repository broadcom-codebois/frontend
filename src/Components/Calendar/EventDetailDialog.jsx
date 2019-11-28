import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  makeStyles,
} from '@material-ui/core'

const useStyle = makeStyles({})

const EventDetailDialog = ({ visibleInfoDialog, setInfoId }) => {
  const c = useStyle()

  return (
    <Dialog
      open={visibleInfoDialog !== undefined}
      onClose={() => setInfoId(undefined)}
    >
      {visibleInfoDialog !== undefined && (
        <>
          <DialogTitle style={{ color: 'black' }}>
            {visibleInfoDialog.name}
          </DialogTitle>
          <DialogContent>
            <Typography>
              Auditorium:{' '}
              {['north', 'south']
                .filter(key => visibleInfoDialog[key])
                .map(
                  key =>
                    ({
                      north: 'Auditorium North',
                      south: 'Auditorium South',
                    }[key])
                )
                .join(', ')}
            </Typography>
            <Typography>Owner: {visibleInfoDialog.author_name}</Typography>
          </DialogContent>
        </>
      )}
    </Dialog>
  )
}

export default EventDetailDialog
