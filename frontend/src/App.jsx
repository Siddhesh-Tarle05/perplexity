import React, { use } from 'react'
import Login from './features/auth/pages/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './features/auth/pages/Register'
import { useAuth } from './hooks/useAuth'
import { useEffect } from 'react'
import Dashboard from './features/chat/pages/Dashboard'
import Protected from './features/auth/components/Protected'


const App = () => {
  const { handleGetMe } = useAuth();
  useEffect(() => { 
   handleGetMe()
  }, [])
  return (
    <Routes>
      <Route path='/' element={<Protected><Dashboard /></Protected>} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  )
}

export default App
