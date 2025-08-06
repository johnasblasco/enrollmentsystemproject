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
const AdminEnrollmentPage = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    return (
        <DashboardLayout>
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Reconsideration Users */}
                    <Card className="flex flex-col justify-between h-full">
                        <CardHeader className="space-y-2">
                            <div className="flex items-center gap-2 text-orange-600">
                                <UserSearch className="w-5 h-5" />
                                <CardTitle>Reconsideration Students (0)</CardTitle>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Manage users for reconsideration and exam scheduling.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <Button
                                className="w-full"
                                size="sm"

                            >
                                Manage Recon Students
                            </Button>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </DashboardLayout>
    )
}

export default AdminEnrollmentPage
