import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Users,
    UserCheck,
    UserSearch,
} from 'lucide-react';

const AdminAdmissionPage = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("https://server.laravel.bpc-bsis4d.com/public/api/getadmissions");
            setUsers(res.data.admissions || []);
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
                    {/* Admitted Users */}
                    <Card className="flex flex-col justify-between h-full">
                        <CardHeader className="space-y-2">
                            <div className="flex items-center gap-2 text-blue-600">
                                <Users className="w-5 h-5" />
                                <CardTitle>Admitted Students ({users?.length || 0})</CardTitle>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                View and manage admitted accounts.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <Button
                                className="w-full"
                                size="sm"
                                onClick={() => navigate('/admin_dashboard/admissions/admitted-accounts')}
                            >
                                View Admitted Students
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Reserve Users */}
                    <Card className="flex flex-col justify-between h-full">
                        <CardHeader className="space-y-2">
                            <div className="flex items-center gap-2 text-green-700">
                                <UserCheck className="w-5 h-5" />
                                <CardTitle>Approved Students ({0 || 0})</CardTitle>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Handle exam admission for approve applicants.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <Button
                                className="w-full"
                                size="sm"

                            >
                                Manage Approved Students
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminAdmissionPage;
