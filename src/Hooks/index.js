import { useState, useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

import { useGlobalState } from 'State'

const MyBackend = true

export const api = axios.create({
  baseURL: MyBackend
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
    if (
      !apiState.fetching &&
      (((apiState.events === undefined || apiState.errors !== undefined) &&
        apiState.lastRequest < dayjs().valueOf() - 1000) ||
        apiState.lastRequest < dayjs().valueOf() - 10000)
    ) {
      setApiState(s => ({ ...s, fetching: true }))
      api
        .get('events')
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
                MyBackend
                  ? event
                  : {
                      ...event,
                      north: event.rooms & 1,
                      south: event.rooms & 2,
                      rooms: undefined,
                    }
              ),
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
  const createEvent = async event => {
    const data = {
      ...event,
      begin_time: dayjs(event.begin_time).format(),
      end_time: dayjs(event.end_time).format(),
      layout: MyBackend ? event.layout : parseInt(event.layout),
      rooms: (event.north ? 1 : 0) + (event.south ? 2 : 0),
    }
    api.post('events/', data).finally(onFinish)
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
      data.layout = MyBackend ? event.layout : parseInt(event.layout)
    }

    if (event.north !== undefined && event.south !== undefined) {
      data.rooms = (event.north ? 1 : 0) + (event.south ? 2 : 0)
    }

    api.post(`events/${id}`, data).finally(onFinish)
  }

  return updateEvent
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
  /* mockup data */
  const email = useUserEmail()
  if (['admin@google.com'].includes(email)) {
    return 'Soulis'
  } else {
    return 'Kámen'
  }
  /* end of mockup data */

  const rerender = useRerender()
  const [apiState, setApiState] = useState({
    role: undefined,
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

  /* eslint-disable-line */
  useEffect(() => {
    if (
      !apiState.fetching &&
      (((apiState.role === undefined || apiState.errors !== undefined) &&
        apiState.lastRequest < dayjs().valueOf() - 1000) ||
        apiState.lastRequest < dayjs().valueOf() - 10000)
    ) {
      setApiState(s => ({ ...s, fetching: true }))
      api
        .get('roles')
        .then(response => {
          setApiState(s => ({
            ...s,
            fetching: false,
            role: response.data
              .map(e => ({
                ...e,
                begin_time: dayjs(e.begin_time).valueOf(),
                end_time: dayjs(e.end_time).valueOf(),
              }))
              .map(event =>
                MyBackend
                  ? event
                  : {
                      ...event,
                      north: event.rooms & 1,
                      south: event.rooms & 2,
                      rooms: undefined,
                    }
              ),
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

  return apiState.role
}
