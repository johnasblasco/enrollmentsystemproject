import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
    Users,

} from 'lucide-react'
const AdminRegistrarPage = () => {
    return (
        <DashboardLayout>
            <div>
                <h1 className="text-2xl font-bold mb-6">Registrar Dashboard</h1>
            </div>
        </DashboardLayout>
    )
}

export default AdminRegistrarPage
