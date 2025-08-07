import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
    Users,

} from 'lucide-react'
const AdminHelpPage = () => {
    return (
        <DashboardLayout>
            <div>
                <h1>Helpppppp</h1>
            </div>
        </DashboardLayout>
    )
}

export default AdminHelpPage
