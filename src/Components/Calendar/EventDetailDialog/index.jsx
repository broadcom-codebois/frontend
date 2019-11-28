import React from 'react'

import { useUserEmail } from 'Hooks'

import EditableDetail from './EditableDetail'
import ReadOnlyDetail from './ReadOnlyDetail'

const EventDetailDialog = ({ visibleEventDetail, ...props }) => {
  const email = useUserEmail()

  if (
    visibleEventDetail !== undefined &&
    visibleEventDetail.author_email === email
  ) {
    return <EditableDetail visibleEventDetail={visibleEventDetail} {...props} />
  }

  return <ReadOnlyDetail visibleEventDetail={visibleEventDetail} {...props} />
}

export default EventDetailDialog
