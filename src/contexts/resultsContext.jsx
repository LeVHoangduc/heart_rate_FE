import React from 'react'
import { createContext, useEffect, useState } from 'react'

export const ResultsContext = createContext('')

const ResultsContextProvider = ({ children }) => {
  console.log('alo')

  const [user, setUser] = useState('')

  useEffect(() => {
    const userData = localStorage.getItem('user')
    console.log('user', userData)

    userData && setUser(userData)
  }, [])

  return <ResultsContext.Provider value={user}>{children}</ResultsContext.Provider>
}

export default ResultsContextProvider
