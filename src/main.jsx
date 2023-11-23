import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './Index.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Welcome from './pages/Welcome/Welcome.jsx'
import Login from './pages/Login/Login.jsx'
import SignUp from './pages/SignUp/SignUp.jsx'
import AddData from './pages/AddData/AddData.jsx'
import LoadResult from './pages/LoadResult/LoadResult.jsx'
import ListResult from './pages/Result/ListResult.jsx'


const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    // <React.StrictMode>
      <HashRouter>
        <App>
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/add-data' element={<AddData />} />
            <Route path='/load-result' element={<LoadResult />} />
            <Route path='/result' element={<ListResult />} />
          </Routes>
        </App>
      </HashRouter>
    // </React.StrictMode>
  )
}
