import React from 'react'
import Login from '../dashboard/features/auth/pages/Login'
import Register from '../dashboard/features/auth/pages/Register'
import RegisterTwo from '../dashboard/features/auth/pages/RegisterTwo'
import { useRoutes } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'
import Admission from '../dashboard/features/admission/pages/Admission'
import Enrollment from '../dashboard/features/enrollment/pages/Enrollment'

const AppRoutes = () => {
    const routes = useRoutes([
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/register',
            element: <Register />
        },

        {
            path: '/register/personal-information',
            element: <RegisterTwo />
        },
        {
            path: '/dashboard',
            element: <Dashboard />
        },
        {
            path: '/dashboard/admission',
            element: <Admission />
        },
        {
            path: '/dashboard/enrollment',
            element: <Enrollment />
        }
    ])
    return routes;
}

export default AppRoutes
