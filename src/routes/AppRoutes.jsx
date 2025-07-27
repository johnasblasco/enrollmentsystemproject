import React from 'react'
import Login from '../auth/pages/Login'
import RegisterTwo from '../auth/pages/RegisterTwo'
import { useRoutes } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'
import Admission from '../dashboard/features/admission/pages/Admission'
import Enrollment from '../dashboard/features/enrollment/pages/Enrollment'
import GoogleCallBack from '../auth/google/GoogleCallback'
import Help from '../dashboard/features/help/pages/Help'
import RegisterOne from '../auth/pages/RegisterOne'
const AppRoutes = () => {
    const routes = useRoutes([
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/auth/google/callback',
            element: <GoogleCallBack />
        },
        {
            path: '/register',
            element: <RegisterOne />
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
        },
        {
            path: '/dashboard/help',
            element: <Help />
        }
    ])
    return routes;
}

export default AppRoutes
