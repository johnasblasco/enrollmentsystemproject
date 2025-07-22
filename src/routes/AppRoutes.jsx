import React from 'react'
import Login from '../auth/pages/Login'
import RegisterTwo from '../auth/pages/RegisterTwo'
import { useRoutes } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'
import Admission from '../dashboard/features/admission/pages/Admission'
import Enrollment from '../dashboard/features/enrollment/pages/Enrollment'
import OAuthCallback from '@/auth/oath/OAuthCallBack'

const AppRoutes = () => {
    const routes = useRoutes([
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/oauth/callback',
            element: <OAuthCallback />
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
