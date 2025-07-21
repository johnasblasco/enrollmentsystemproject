import React, { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'
import { RegisterProvider } from './auth/contexts/RegisterContext'
import Aos from 'aos'
import 'aos/dist/aos.css'
const App = () => {
  useEffect(() => {
    Aos.init({
      duration: 2000,
    })
  }, [])
  return (
    <>
      <RegisterProvider>
        <AppRoutes />
      </RegisterProvider>
    </>
  )
}

export default App
