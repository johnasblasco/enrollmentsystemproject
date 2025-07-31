import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
    Users,

} from 'lucide-react'
const AdminCashierPage = () => {
    return (
        <DashboardLayout>
            <div className="p-6 space-y-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Admitted Accounts  */}
                    <Card className="flex flex-col justify-between">
                        <CardHeader className="flex flex-col gap-2">
                            <Users className="text-blue-500 w-5 h-5" />
                            <CardTitle>Users ({1})</CardTitle>
                            <p className="text-sm text-muted-foreground">View and manage admitted accounts</p>
                        </CardHeader>
                        <CardContent>
                            <Button className={"hover:cursor-pointer"} size="sm" onClick={() => navigate('/admin_dashboard/admissions/admitted-accounts')}>
                                Admitted Users
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default AdminCashierPage
