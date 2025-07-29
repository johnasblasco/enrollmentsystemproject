import React from 'react'
import Login from '../auth/pages/Login'
import RegisterTwo from '../auth/pages/RegisterTwo'
import { useRoutes } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'
import AdmissionPage from '../dashboard/pages/AdmissionPage'
import EnrollmentPage from '../dashboard/pages/EnrollmentPage'
import HelpPages from '../dashboard/pages/HelpPage'
import Verified from '../auth/pages/Verified'
import OauthCallBack from '../auth/google/OauthCallback'
import OAuthCallback2 from '../auth/github/OAuthCallback2'
import Register from '../auth/pages/Register'

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
            path: '/oauth-callback',
            element: <OauthCallBack />
        },
        {
            path: '/oauth-callback2',
            element: <OAuthCallback2 />
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
            path: '/dashboard/help',
            element: <HelpPages />
        },
        {
            path: '/dashboard/admission',
            element: <AdmissionPage />
        },
        {
            path: '/dashboard/enrollment',
            element: <EnrollmentPage />
        }
    ])
    return routes;
}

export default AppRoutes
