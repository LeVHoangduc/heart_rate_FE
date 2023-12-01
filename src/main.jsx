import App from './App.jsx'
import './Index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'

import Welcome from './pages/Welcome/Welcome.jsx'
import Login from './pages/Login/Login.jsx'
import SignUp from './pages/SignUp/SignUp.jsx'
import AddData from './pages/AddData/AddData.jsx'
import LoadResult from './pages/LoadResult/LoadResult.jsx'
import ListResult from './pages/Result/ListResult.jsx'
import Home from './pages/Home/Home.jsx'

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

          {/* sau khi đăng nhập vào thì sẽ có 2 nút là coi trang result, đo nhịp tim hoặc là gọi bác sĩ */}
          <Route path='/home' element={<Home />} />
        </Routes>
      </App>
    </HashRouter>
    // </React.StrictMode>
  )
}
