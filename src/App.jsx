import React, { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'

import { RegisterProvider } from './auth/contexts/RegisterContext'
import { AdmissionProvider } from './globalContexts/AdmissionContext'
import { AuthProvider } from './globalContexts/AuthContext'
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
      <AuthProvider>
        <AdmissionProvider>
          <RegisterProvider>
            <AppRoutes />
          </RegisterProvider>
        </AdmissionProvider>
      </AuthProvider>
    </>
  )
}

export default App
