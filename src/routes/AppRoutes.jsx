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

//admins
import AdminAcademicPage from '../admin_dashboard/pages/AdminAcademicPage';
import AdminAccountingPage from '../admin_dashboard/pages/AdminAccountingPage';
import AdminAdmissionPage from '../admin_dashboard/pages/AdminAdmissionPage';
import AdminCashierPage from '../admin_dashboard/pages/AdminCashierPage';
import AdminEnrollmentPage from '../admin_dashboard/pages/AdminEnrollmentPage'
import AdminRegistrarPage from '../admin_dashboard/pages/AdminRegistrarPage';
import AdminSettingPage from '../admin_dashboard/pages/AdminSettingPage';
import AdminHelpPage from '../admin_dashboard/pages/AdminHelpPage';


//admin admission
import AdmittedAccounts from '../admin_dashboard/pages/section/admission/AdmittedAccounts';

//admin enrollments
import ApprovedAccounts from '../admin_dashboard/pages/section/admission/ApprovedAccounts'

//admin settings
import Users from '../admin_dashboard/pages/section/settings/Users';
import UserRoles from '../admin_dashboard/pages/section/settings/UserRoles';
import Campuses from '../admin_dashboard/pages/section/settings/Campuses';
import SchoolYear from '../admin_dashboard/pages/section/settings/SchoolYear';
import Sections from '../admin_dashboard/pages/section/settings/Sections';
import Courses from '../admin_dashboard/pages/section/settings/Courses';
import Subject from '../admin_dashboard/pages/section/settings/Subject';
import Departments from '../admin_dashboard/pages/section/settings/Departments';
import Curriculum from '../admin_dashboard/pages/section/settings/Curriculum'


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
        // Admin Academic
        {
            path: '/admin_dashboard/academics',
            element: (
                <ProtectedRoute allowedRoles={['admin']}>
                    <AdminAcademicPage />
                </ProtectedRoute>
            )
        },

        // Admin Accounting
        {
            path: '/admin_dashboard/accounting',
            element: (
                <ProtectedRoute allowedRoles={['admin']}>
                    <AdminAccountingPage />
                </ProtectedRoute>
            )
        },

        // Admin Admission
        {
            path: '/admin_dashboard/admissions',
            element: (
                <ProtectedRoute allowedRoles={['admin']}>
                    <AdminAdmissionPage />
                </ProtectedRoute>
            )
        },
        {
            path: '/admin_dashboard/admissions/admitted-accounts',
            element: (
                <ProtectedRoute allowedRoles={['admin']}>
                    <AdmittedAccounts />
                </ProtectedRoute>
            )
        },
        {
            path: '/admin_dashboard/admissions/approved-accounts',
            element: (
                <ProtectedRoute allowedRoles={['admin']}>
                    <ApprovedAccounts />
                </ProtectedRoute>
            )
        },


        // Admin Cashier
        {
            path: '/admin_dashboard/cashier',
            element: (
                <ProtectedRoute allowedRoles={['admin']}>
                    <AdminCashierPage />
                </ProtectedRoute>
            )
        },


        // Admin Enrollment
        {
            path: '/admin_dashboard/enrollment',
            element: (
                <ProtectedRoute allowedRoles={['admin']}>
                    <AdminEnrollmentPage />
                </ProtectedRoute>
            )
        },
        // Admin Help
        {
            path: '/admin_dashboard/help',
            element: (
                <ProtectedRoute allowedRoles={['admin']}>
                    <AdminHelpPage />
                </ProtectedRoute>
            )
        },

        // Admin Registrar
        {
            path: '/admin_dashboard/registrar',
            element: (
                <ProtectedRoute allowedRoles={['admin']}>
                    <AdminRegistrarPage />
                </ProtectedRoute>
            )
        },

        // Admin Settings
        {
            path: '/admin_dashboard/settings',
            element: (
                <ProtectedRoute allowedRoles={['admin']}>
                    <AdminSettingPage />
                </ProtectedRoute>
            )
        },
        {
            path: '/admin_dashboard/settings/users',
            element: (
                <ProtectedRoute allowedRoles={['admin']}>
                    <Users />
                </ProtectedRoute>
            )
        },
        {
            path: '/admin_dashboard/settings/roles',
            element: (
                <ProtectedRoute allowedRoles={['admin']}>
                    <UserRoles />
                </ProtectedRoute>
            )
        },
        {
            path: '/admin_dashboard/settings/campuses',
            element: (
                <ProtectedRoute allowedRoles={['admin']}>
                    <Campuses />
                </ProtectedRoute>
            )
        },
        {
            path: '/admin_dashboard/settings/courses',
            element: (
                <ProtectedRoute allowedRoles={['admin']}>
                    <Courses />
                </ProtectedRoute>
            )
        },
        {
            path: '/admin_dashboard/settings/school-year',
            element: (
                <ProtectedRoute allowedRoles={['admin']}>
                    <SchoolYear />
                </ProtectedRoute>
            )
        },
        {
            path: '/admin_dashboard/settings/sections',
            element: (
                <ProtectedRoute allowedRoles={['admin']}>
                    <Sections />
                </ProtectedRoute>
            )
        },
        {
            path: '/admin_dashboard/settings/subject',
            element: (
                <ProtectedRoute allowedRoles={['admin']}>
                    <Subject />
                </ProtectedRoute>
            )
        },
        {
            path: '/admin_dashboard/settings/departments',
            element: (
                <ProtectedRoute allowedRoles={['admin']}>
                    <Departments />
                </ProtectedRoute>
            )
        },
        {
            path: '/admin_dashboard/settings/curriculum',
            element: (
                <ProtectedRoute allowedRoles={['admin']}>
                    <Curriculum />
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
