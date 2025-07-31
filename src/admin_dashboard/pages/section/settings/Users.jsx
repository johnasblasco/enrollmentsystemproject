import DashboardLayout from '@/admin_dashboard/components/DashboardLayout'
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import axios from "axios";
import UserTable from "./components/UserTable";
import UserModal from "./components/UserModal";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("https://server.laravel.bpc-bsis4d.com/public/api/getusers");
            setUsers(res.data.users);
            setEditingUser(res.data.users)
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
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Manage Users</h1>
                    <Button onClick={() => { setEditingUser(null); setOpenModal(true); }}>
                        <Plus className="w-4 h-4 mr-2" /> Add User
                    </Button>
                </div>

                <Card className="rounded-2xl shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg">Users ({users.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <UserTable
                            users={users}
                            onEdit={(user) => { setEditingUser(user); setOpenModal(true); }}
                            onRefresh={fetchUsers}
                        />
                    </CardContent>
                </Card>

                {openModal && (
                    <UserModal
                        user={editingUser}
                        onClose={() => setOpenModal(false)}
                        onSuccess={() => {
                            fetchUsers();
                            setOpenModal(false);
                        }}
                    />
                )}
            </div>
        </DashboardLayout>
    )
}

export default Users
