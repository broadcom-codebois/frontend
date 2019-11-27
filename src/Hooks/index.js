import { useState, useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

const api = axios.create({
  baseURL: 'https://codeweek2019.kaifer.cz/api/',
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
    console.log('efecting')
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
            events: response.data.map(e => ({
              ...e,
              begin_time: dayjs(e.begin_time).valueOf(),
              end_time: dayjs(e.end_time).valueOf(),
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
    api
      .post('events', {
        ...event,
        begin_time: dayjs(event.begin_time).format(),
        end_time: dayjs(event.end_time).format(),
      })
      .finally(onFinish)
  }

  return createEvent
}
