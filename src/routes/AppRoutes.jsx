import ProtectedRoute from './ProtectedRoute';
import { useRoutes } from 'react-router-dom';
import Login from '../auth/pages/Login';
import Register from '../auth/pages/Register';
import RegisterTwo from '../auth/pages/RegisterTwo';
import ForgotPassword from '../auth/pages/ForgotPassword';
import Verified from '../auth/pages/Verified';
import OauthCallBack from '../auth/google/OauthCallback';
import OAuthCallback2 from '../auth/github/OAuthCallback2';
import Dashboard from '../student_dashboard/Dashboard';
import HelpPages from '../student_dashboard/pages/HelpPage';
import AdmissionPage from '../student_dashboard/pages/AdmissionPage';
import EnrollmentPage from '../student_dashboard/pages/EnrollmentPage';
import AdminDashboard from '../admin_dashboard/AdminDashboard';
import GradesPage from '../student_dashboard/pages/GradesPage';
import ProfilePage from '../student_dashboard/pages/ProfilePage';

import AdminEnrollments from '../admin_dashboard/pages/AdminEnrollments'
import AdminSettings from '../admin_dashboard/pages/AdminSettings';
import AdminHelp from '../admin_dashboard/pages/AdminHelp';
import AdminAdmissionPage from '@/admin_dashboard/pages/AdminAdmissionPage';


const AppRoutes = () => {
    const routes = useRoutes([
        { path: '/', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/forgot-password', element: <ForgotPassword /> },
        { path: '/register/personal-information', element: <RegisterTwo /> },
        { path: '/register/verified', element: <Verified /> },
        { path: '/oauth-callback', element: <OauthCallBack /> },
        { path: '/oauth-callback2', element: <OAuthCallback2 /> },

        // Student routes
        {
            path: '/student_dashboard',
            element: (
                <ProtectedRoute allowedRoles={['student']}>
                    <Dashboard />
                </ProtectedRoute>
            )
        },
        {
            path: '/student_dashboard/help',
            element: (
                <ProtectedRoute allowedRoles={['student']}>
                    <HelpPages />
                </ProtectedRoute>
            )
        },
        {
            path: '/student_dashboard/admission',
            element: (
                <ProtectedRoute allowedRoles={['student']}>
                    <AdmissionPage />
                </ProtectedRoute>
            )
        },
        {
            path: '/student_dashboard/enrollment',
            element: (
                <ProtectedRoute allowedRoles={['student']}>
                    <EnrollmentPage />
                </ProtectedRoute>
            )
        },
        {
            path: '/student_dashboard/grades',
            element: (
                <ProtectedRoute allowedRoles={['student']}>
                    <GradesPage />
                </ProtectedRoute>
            )
        },
        {
            path: '/student_dashboard/profile',
            element: (
                <ProtectedRoute allowedRoles={['student']}>
                    <ProfilePage />
                </ProtectedRoute>
            )
        },
        // Admin routes
        {
            path: '/admin_dashboard',
            element: (
                <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                </ProtectedRoute>
            )
        },
        {
            path: '/admin_dashboard/admissions',
            element: (
                <ProtectedRoute allowedRoles={['admin']}>
                    <AdminAdmissionPage />
                </ProtectedRoute>
            )
        },
        {
            path: '/admin_dashboard/enrollments',
            element: (
                <ProtectedRoute allowedRoles={['admin']}>
                    <AdminEnrollments />
                </ProtectedRoute>
            )
        },
        {
            path: '/admin_dashboard/settings',
            element: (
                <ProtectedRoute allowedRoles={['admin']}>
                    <AdminSettings />
                </ProtectedRoute>
            )
        },
        {
            path: '/admin_dashboard/help',
            element: (
                <ProtectedRoute allowedRoles={['admin']}>
                    <AdminHelp />
                </ProtectedRoute>
            )
        },

        // Fallback route for unauthorized access
        {
            path: '/unauthorized',
            element: <div className="p-10 text-center">Unauthorized Access</div>
        }
    ]);

    return routes;
};
export default AppRoutes;
