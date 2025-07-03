import React from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import { Routes,Route } from 'react-router-dom'
import DashBoard from './pages/DashBoard'
import Protected from './components/Protected'
import VerifyEmail from './pages/VerifyEmail'
import AllRoadMaps from './pages/AllRoadMaps'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Protected><DashBoard/></Protected>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="/verify-email/:token" element={<VerifyEmail />} />
      <Route path="/roadmaps" element={<Protected><AllRoadMaps/></Protected>} />
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
   
  )
}

export default App
