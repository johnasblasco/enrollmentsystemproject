import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout'
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
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const [approvedUsers, setApprovedUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            let allUsers = [];
            let page = 1;
            let lastPage = 1;

            // Loop through all pages
            while (page <= lastPage) {
                const res = await axios.get(`https://server.laravel.bpc-bsis4d.com/public/api/getadmissions?page=${page}`);
                const admissions = res.data.admissions || [];

                allUsers = [...allUsers, ...admissions];

                lastPage = res.data.pagination.last_page;
                page++;
            }

            const approved = allUsers.filter(user => user.status === 'approved');

            setUsers(allUsers);
            setApprovedUsers(approved);

        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage);
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
                                Managed the Approval and Deletion of admitted accounts.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <Button
                                className="w-full"
                                size="sm"
                                onClick={() => navigate('/admin_dashboard/admissions/admitted-accounts')}
                            >
                                Manage Admitted Students
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Approved Users */}
                    <Card className="flex flex-col justify-between h-full">
                        <CardHeader className="space-y-2">
                            <div className="flex items-center gap-2 text-green-700">
                                <UserCheck className="w-5 h-5" />
                                <CardTitle>Accepted Students ({approvedUsers?.length || 0})</CardTitle>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Handle Accepted applicants admission that takes the Examinations.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <Button
                                className="w-full"
                                size="sm"
                                onClick={() => navigate('/admin_dashboard/admissions/approved-accounts')}

                            >
                                View Accepted Students
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminAdmissionPage;
