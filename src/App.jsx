import React from 'react'
import './App.css'
import Home from './Pages/Home'
import Authentication from './Pages/Authentication'
import { Route, Routes } from 'react-router-dom'
import Profile from './Pages/Profile'
import AppliedUsers from './Pages/AppliedUsers'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Authentication />} />
        <Route path='/Register' element={<Authentication insideRegister={true} />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/AppliedUsers' element={<AppliedUsers />} />
      </Routes>
    </>
  )
}

export default App
