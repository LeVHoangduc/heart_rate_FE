/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'

const App = ({ children }) => {
  App.propTypes = {
    children: PropTypes.node.isRequired
  }
  return (
    <div>
      {children}
    </div>
  )
}
export default App
