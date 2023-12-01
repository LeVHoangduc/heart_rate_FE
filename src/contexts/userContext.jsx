import React from 'react'
import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext('')

const UserContextProvider = ({ children }) => {
  console.log('alo')

  const [user, setUser] = useState('')

  useEffect(() => {
    const userData = localStorage.getItem('user')
    console.log('user', userData)

    userData && setUser(userData)
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export default UserContextProvider
