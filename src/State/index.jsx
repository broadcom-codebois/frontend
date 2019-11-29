import React, { createContext, useState, useContext } from 'react'
import Cookies from 'js-cookies'

import { api } from 'Hooks'

const initialState = {
  auth: {
    user: null,
    token: null,
    isAuthenticated: false,
  },
}

const StateContext = createContext(initialState)

export const GlobalStateProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    const inCookies = Cookies.getItem('state')
    if (inCookies === null) return initialState
    else return JSON.parse(inCookies)
  })

  Cookies.setItem('state', JSON.stringify(state))

  if (state.auth.isAuthenticated) {
    api.defaults.headers.common['Authorization'] = `Bearer ${btoa(
      unescape(
        encodeURIComponent(
          JSON.stringify({
            email: state.auth.user.email,
            name: state.auth.user.displayName,
          })
        )
      )
    )}`
  }
  return (
    <StateContext.Provider value={[state, setState]}>
      {children}
    </StateContext.Provider>
  )
}

export const useGlobalState = () => useContext(StateContext)
