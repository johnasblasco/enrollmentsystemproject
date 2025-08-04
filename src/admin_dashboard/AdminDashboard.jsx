import React from 'react'
import DashboardLayout from './components/DashboardLayout'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import {
    LayoutDashboard,
    Users,
    BookOpenText,
    FileText,
    FileSpreadsheet,
    CalendarDays,
    School,
    Settings,
    MessageCircleQuestion
} from 'lucide-react'

const sections = [
    { label: 'Dashboard', icon: LayoutDashboard, link: '/admin_dashboard' },
    { label: 'Admissions', icon: Users, link: '/admin_dashboard/admissions' },
    { label: 'Registrar', icon: BookOpenText, link: '/admin_dashboard/registrar' },
    { label: 'Accounting', icon: FileText, link: '/admin_dashboard/accounting' },
    { label: 'Cashier', icon: FileSpreadsheet, link: '/admin_dashboard/cashier' },
    { label: 'Enrollments', icon: CalendarDays, link: '/admin_dashboard/enrollments' },
    { label: 'Academics', icon: School, link: '/admin_dashboard/academics' },
    { label: 'Settings', icon: Settings, link: '/admin_dashboard/settings' },
    { label: 'Help', icon: MessageCircleQuestion, link: '/admin_dashboard/help' },
]
import { DashboardChart } from './components/DashboardChart'
import DashboardSummary from './components/SummaryCard'

const AdminDashboard = () => {
    return (
        <DashboardLayout>

            <DashboardSummary />
            <DashboardChart />
            <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {sections.map(({ label, icon: Icon, link }, index) => (
                        <Link to={link} key={index} className="block">
                            <Card className="p-4 hover:shadow-lg transition duration-200 h-full">
                                <CardContent className="flex items-center gap-4">
                                    <Icon className="text-blue-600" size={28} />
                                    <span className="text-lg font-medium">{label}</span>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}

export default AdminDashboard
