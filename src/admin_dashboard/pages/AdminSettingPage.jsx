import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
    Users,
    FileText,
    Settings,
    MailCheck,
    School,
    CalendarDays,
    Layers,
    BookOpenText,
    ShieldCheck,
} from 'lucide-react'

const AdminSettingPage = () => {
    const navigate = useNavigate()
    const [pendingApplications, setPendingApplications] = useState(0)

    // useEffect(() => {
    //     fetchDashboardStats()
    // }, [])

    // const fetchDashboardStats = async () => {
    //     try {
    //         const userRes = await axios.get('https://your-api.com/api/users/count')
    //         const appRes = await axios.get('https://your-api.com/api/applications/pending/count')
    //         setUserCount(userRes.data.count)
    //         setPendingApplications(appRes.data.count)
    //     } catch (err) {
    //         console.error('Error loading dashboard stats:', err)
    //     }
    // }

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("https://server.laravel.bpc-bsis4d.com/public/api/getusers");
            setUsers(res.data.users);
            console.log("Fetched users:", res.data.users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <DashboardLayout>
            <div className="p-6 space-y-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* User Management */}
                    <Card className="flex flex-col justify-between">
                        <CardHeader className="flex flex-col gap-2">
                            <Users className="text-blue-500 w-5 h-5" />
                            <CardTitle>Users ({users.length})</CardTitle>
                            <p className="text-sm text-muted-foreground">View and manage users & roles.</p>
                        </CardHeader>
                        <CardContent>
                            <Button size="sm" onClick={() => navigate('/admin_dashboard/settings/users')}>
                                Manage Users
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Campuses */}
                    <Card className="flex flex-col justify-between">
                        <CardHeader className="flex flex-col gap-2">
                            <School className="text-green-600 w-5 h-5" />
                            <CardTitle>Campuses</CardTitle>
                            <p className="text-sm text-muted-foreground">Configure campus data and assign campuses to users.</p>
                        </CardHeader>
                        <CardContent>
                            <Button size="sm" onClick={() => navigate('/admin_dashboard/settings/campuses')}>
                                Manage Campuses
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Courses */}
                    <Card className="flex flex-col justify-between">
                        <CardHeader className="flex flex-col gap-2">
                            <BookOpenText className="text-violet-600 w-5 h-5" />
                            <CardTitle>Courses</CardTitle>
                            <p className="text-sm text-muted-foreground">Manage available academic programs and courses.</p>
                        </CardHeader>
                        <CardContent>
                            <Button size="sm" onClick={() => navigate('/admin_dashboard/settings/courses')}>
                                Manage Courses
                            </Button>
                        </CardContent>
                    </Card>



                    {/* School Year */}
                    <Card className="flex flex-col justify-between">
                        <CardHeader className="flex flex-col gap-2">
                            <CalendarDays className="text-yellow-600 w-5 h-5" />
                            <CardTitle>School Year</CardTitle>
                            <p className="text-sm text-muted-foreground">Set active academic year and enrollment periods.</p>
                        </CardHeader>
                        <CardContent>
                            <Button size="sm" onClick={() => navigate('/admin_dashboard/settings/school-year')}>
                                Edit School Year
                            </Button>
                        </CardContent>
                    </Card>

                    {/* User Types */}
                    <Card className="flex flex-col justify-between">
                        <CardHeader className="flex flex-col gap-2">
                            <ShieldCheck className="text-rose-600 w-5 h-5" />
                            <CardTitle>User Roles</CardTitle>
                            <p className="text-sm text-muted-foreground">Define and manage admin, staff, or student roles.</p>
                        </CardHeader>
                        <CardContent>
                            <Button size="sm" onClick={() => navigate('/admin_dashboard/settings/roles')}>
                                Manage Roles
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Sections */}
                    <Card className="flex flex-col justify-between">
                        <CardHeader className="flex flex-col gap-2">
                            <Layers className="text-cyan-600 w-5 h-5" />
                            <CardTitle>Sections</CardTitle>
                            <p className="text-sm text-muted-foreground">Manage sections for each course and academic level.</p>
                        </CardHeader>
                        <CardContent>
                            <Button size="sm" onClick={() => navigate('/admin_dashboard/settings/sections')}>
                                Configure Sections
                            </Button>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </DashboardLayout>
    )
}

export default AdminSettingPage
