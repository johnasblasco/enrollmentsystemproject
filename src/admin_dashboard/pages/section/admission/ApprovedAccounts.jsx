import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../../components/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Users } from 'lucide-react'
import axios from 'axios'

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from '@/components/ui/dialog'

import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

const ApprovedAccounts = () => {
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState('approved')
    const [loading, setLoading] = useState(false)
    const [emailBody, setEmailBody] = useState(
        'You are invited to take the entrance examination. Please click the link below:\n\nhttps://exam-platform.com'
    )

    const fetchApproved = async () => {
        const token = localStorage.getItem('token')
        try {
            const res = await axios.get(
                `https://server.laravel.bpc-bsis4d.com/public/api/getadmissions?status=${filter}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            setUsers(res.data.admissions)
            console.log(users)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchApproved()
    }, [filter])

    const handleSendEmail = async () => {
        setLoading(true)
        const token = localStorage.getItem('token')
        try {
            await axios.post(
                `https://server.laravel.bpc-bsis4d.com/public/api/send-approved-email`,
                {
                    message: emailBody,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            alert('📧 Email sent to all approved students!')
        } catch (error) {
            console.error(error)
            alert('❌ Failed to send email.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <DashboardLayout>
            <div className="flex items-center justify-between mb-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users size={20} /> Approved Accounts
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p>Total: {users.length}</p>
                        <Select value={filter} onValueChange={setFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="ml-4">Send Exam Invitation</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Send Email to Approved Students</DialogTitle>
                            <DialogDescription>
                                Customize the message that will be sent to all approved students.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-2">
                            <Label htmlFor="email-body">Message</Label>
                            <Textarea
                                id="email-body"
                                value={emailBody}
                                onChange={(e) => setEmailBody(e.target.value)}
                                rows={8}
                            />
                        </div>
                        <DialogFooter>
                            <Button onClick={handleSendEmail} disabled={loading}>
                                {loading ? 'Sending...' : 'Send'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </DashboardLayout>
    )
}

export default ApprovedAccounts
