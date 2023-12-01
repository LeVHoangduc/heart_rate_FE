/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'

import UserContextProvider from './contexts/userContext'

const App = ({ children }) => {
  App.propTypes = {
    children: PropTypes.node.isRequired,
  }
  return (
    <UserContextProvider>
      <div>{children}</div>
    </UserContextProvider>
  )
}
export default App
