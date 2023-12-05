/* eslint-disable prettier/prettier */
import React from 'react'

import UserContextProvider from './contexts/userContext'

const App = ({ children }) => {
  return (
    <UserContextProvider>
      <div>{children}</div>
    </UserContextProvider>
  )
}
export default App
