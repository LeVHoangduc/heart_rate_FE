// App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginComponent from './LoginComponent'
import RegisterComponent from './RegisterComponent'

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginComponent />} />
      <Route path='/register' element={<RegisterComponent />} />
    </Routes>
  )
}

export default App
