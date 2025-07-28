import React from 'react'
import Login from '../auth/pages/Login'
import RegisterTwo from '../auth/pages/RegisterTwo'
import { useRoutes } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'
import Admission from '../dashboard/features/admission/pages/Admission'
import Enrollment from '../dashboard/features/enrollment/pages/Enrollment'
import Help from '../dashboard/features/help/pages/Help'
import Verified from '../auth/pages/Verified'
import OauthCallBack from '../auth/google/OauthCallback'

const AppRoutes = () => {
    const routes = useRoutes([
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/oauth-callback',
            element: <OauthCallBack />
        },
        {
            path: '/register/personal-information',
            element: <RegisterTwo />
        },
        {
            path: '/register/verified',
            element: <Verified />
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
