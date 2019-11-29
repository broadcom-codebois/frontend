import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  Grid,
  makeStyles,
} from '@material-ui/core'
import { Clear as ClearIcon, Done as DoneIcon } from '@material-ui/icons'

import { useApprove, useDisapprove, useUserRole } from 'Hooks'

import Row from './Row'

const useStyle = makeStyles({})

const EventDetailDialog = ({ visibleEventDetail, setInfoId }) => {
  const c = useStyle()
  const disapprove = useDisapprove()
  const approve = useApprove()
  const role = useUserRole()

  return (
    <Dialog
      open={visibleEventDetail !== undefined}
      onClose={() => setInfoId(undefined)}
      maxWidth="xs"
      scroll="body"
      fullWidth
    >
      {visibleEventDetail !== undefined && (
        <>
          <DialogTitle style={{ color: 'black' }}>
            {visibleEventDetail.name}
          </DialogTitle>
          <DialogContent>
            <Grid container direction="column" justify="flex-start" spacing={1}>
              <Row name="Owner" value={visibleEventDetail.author_name} />
              <Row name="Description" value={visibleEventDetail.description} />
              <Row name="Number of People" value={visibleEventDetail.people} />
              <Row
                name="Auditorium"
                value={['north', 'south']
                  .filter(key => visibleEventDetail[key])
                  .map(
                    key =>
                      ({
                        north: 'Auditorium North',
                        south: 'Auditorium South',
                      }[key])
                  )
                  .join(', ')}
              />
            </Grid>
            {role === 'Soulis' && (
              <Box mt={2}>
                <DialogActions>
                  <Button
                    onClick={() => {
                      disapprove(visibleEventDetail.id)
                      setInfoId(undefined)
                    }}
                    color="secondary"
                    variant="contained"
                    startIcon={<ClearIcon />}
                  >
                    Disapprove
                  </Button>
                  <Button
                    onClick={() => {
                      approve(visibleEventDetail.id)
                      setInfoId(undefined)
                    }}
                    color="primary"
                    variant="contained"
                    startIcon={<DoneIcon />}
                  >
                    Approve
                  </Button>
                </DialogActions>
              </Box>
            )}
          </DialogContent>
        </>
      )}
    </Dialog>
  )
}

export default EventDetailDialog
