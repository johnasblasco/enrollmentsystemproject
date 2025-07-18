import React, { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'
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

      <AppRoutes />
    </>
  )
}

export default App
