import { useState, useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

import { useGlobalState } from 'State'

const shouldBackendWork = false

export const api = axios.create({
  baseURL: shouldBackendWork
    ? 'https://codeweek2019.kaifer.cz/api/'
    : 'https://booking.magnusi.tech/rgi/',
  timeout: 2000,
})

const useRerender = () => {
  const [, setB] = useState(true)
  return () => setB(b => !b)
}

export const useEvents = () => {
  const rerender = useRerender()
  const [apiState, setApiState] = useState({
    events: undefined,
    fetching: false,
    error: undefined,
    lastRequest: 0,
  })

  useEffect(() => {
    const pid = setInterval(() => {
      rerender()
    }, 1000)
    return () => {
      clearInterval(pid)
    }
  }, [rerender])

  /* eslint-disable-line */ useEffect(() => {
    if (!apiState.fetching && apiState.lastRequest < dayjs().valueOf() - 500) {
      setApiState(s => ({ ...s, fetching: true }))
      api
        .get('events/', {
          headers: {
            'Content-Type': 'application/json'
          },
          body: {}
        })
        .then(response => {
          setApiState(s => ({
            ...s,
            fetching: false,
            events: response.data
              .map(e => ({
                ...e,
                begin_time: dayjs(e.begin_time).valueOf(),
                end_time: dayjs(e.end_time).valueOf(),
              }))
              .map(event =>
                shouldBackendWork
                  ? event
                  : {
                      ...event,
                      north: event.rooms & 1,
                      south: event.rooms & 2,
                      rooms: undefined,
                    }
              )
              .map(event => {
                const [author_name, author_email] = event.author.split(':')
                return { ...event, author_name, author_email }
              })
              .map(event => ({
                people: JSON.stringify(event).length%170 + 10,
                ...event,
              })),
            error: undefined,
            lastRequest: dayjs().valueOf(),
          }))
        })
        .catch(error => {
          setApiState(s => ({
            ...s,
            fetching: false,
            error: error,
            lastRequest: dayjs().valueOf(),
          }))
        })
    }
  })

  const forceRefresh = () =>
    setApiState(s => ({
      ...s,
      lastRequest: dayjs()
        .subtract(1, 'day')
        .valueOf(),
    }))
  const events = apiState.events === undefined ? [] : apiState.events

  return [events, forceRefresh]
}

export const useCreateEvent = onFinish => {
  const name = useUserName()
  const email = useUserEmail()

  const createEvent = async event => {
    const data = {
      ...event,
      begin_time: dayjs(event.begin_time).format(),
      end_time: dayjs(event.end_time).format(),
      layout: shouldBackendWork ? event.layout : parseInt(event.layout),
      rooms: (event.north ? 1 : 0) + (event.south ? 2 : 0),
      author: `${name}:${email}`,
    }

    await api
      .post('events/', data)
      .then(response => {
        if (!shouldBackendWork && response.data.result === 2) {
          alert("Couldn't create the reservation")
        }
      })
      .catch(console.log)
    onFinish()
  }

  return createEvent
}

export const useUpdateEvent = onFinish => {
  const updateEvent = id => event => {
    const data = {
      ...event,
    }
    if (event.begin_time !== undefined) {
      data.begin_time = dayjs(event.begin_time).format()
    }

    if (event.end_time !== undefined) {
      data.end_time = dayjs(event.end_time).format()
    }

    if (event.layout !== undefined) {
      data.layout = shouldBackendWork ? event.layout : parseInt(event.layout)
    }

    if (event.north !== undefined && event.south !== undefined) {
      data.rooms = (event.north ? 1 : 0) + (event.south ? 2 : 0)
    }

    api.patch(`events/${id}/`, data).finally(onFinish)
  }

  return updateEvent
}

export const useDisapprove = () => {
  const updateEvent = useUpdateEvent()
  return id => updateEvent(id)({ approved: false })
}

export const useApprove = () => {
  const updateEvent = useUpdateEvent()
  return id => updateEvent(id)({ approved: true })
}

export const useUserEmail = () => {
  const [globalState] = useGlobalState()

  return globalState.auth.user.email
}

export const useUserName = () => {
  const [globalState] = useGlobalState()

  return globalState.auth.user.displayName
}

export const useUserRole = () => {
  const email = useUserEmail()
  return 'Soulis'
  if (['admin@google.com'].includes(email)) {
    return 'Soulis'
  } else {
    return 'Kámen'
  }
}

export const useDeleteEvent = () => {
  const deleteEvent = id => {
    api.delete(`events/${id}/`)
  }
  return deleteEvent
}
