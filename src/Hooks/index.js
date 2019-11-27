import { useState, useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

const MyBackend = true

const api = axios.create({
  baseURL: MyBackend
    ? 'https://codeweek2019.kaifer.cz/api/'
    : 'https://booking.magnusi.tech/rgi/',
  timeout: 2000,
})

export const useEvents = () => {
  const [apiState, setApiState] = useState({
    events: undefined,
    fetching: false,
    error: undefined,
    lastRequest: 0,
  })

  useEffect(() => {
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
  }, [
    apiState.fetching,
    apiState.events,
    apiState.lastRequest,
    apiState.errors,
  ])

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
  const createEvent = event => {
    const data = {
      ...event,
      begin_time: dayjs(event.begin_time).format(),
      end_time: dayjs(event.end_time).format(),
      layout: MyBackend ? event.layout : parseInt(event.layout),
    }
    console.log('posting', data)
    api
      .post('events/', data)
      .then(console.log)
      .catch(console.log)
      .finally(onFinish)
  }

  return createEvent
}
