import React from 'react'
import Login from '../dashboard/features/auth/pages/Login'
import Register from '../dashboard/features/auth/pages/Register'
import RegisterTwo from '../dashboard/features/auth/pages/RegisterTwo'
import { useRoutes } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'

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
            path: '/dashboard',
            element: <Dashboard />
        },
        {
            path: '/register/personal-information',
            element: <RegisterTwo />
        }
    ])
    return routes;
}

export default AppRoutes
