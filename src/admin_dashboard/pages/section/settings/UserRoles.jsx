import DashboardLayout from '@/admin_dashboard/components/DashboardLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import RoleTable from './components/RoleTable';
import RoleModal from './components/RoleModal';

const UserRoles = () => {
    const [roles, setRoles] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editingRole, setEditingRole] = useState(null);

    const fetchRoles = async () => {
        try {
            const res = await axios.get("https://server.laravel.bpc-bsis4d.com/public/api/getusertypes");
            setRoles(res.data.userTypes);
            console.log("Fetched roles:", res.data.userTypes);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSave = async (data, id) => {
        const token = localStorage.getItem('token');
        try {
            const url = id
                ? `https://server.laravel.bpc-bsis4d.com/public/api/updateusertype/${id}`
                : "https://server.laravel.bpc-bsis4d.com/public/api/createusertype";

            await axios.post(url, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            fetchRoles();
            setOpenModal(false);
        } catch (err) {
            console.error(err);
        }
    };


    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://server.laravel.bpc-bsis4d.com/public/api/deleteusertype/${id}`);
            fetchRoles();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    return (
        <DashboardLayout>
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">User Roles</h1>
                    <Button onClick={() => { setEditingRole(null); setOpenModal(true); }}>
                        <Plus className="w-42 h-4 mr-2" /> Add Role
                    </Button>
                </div>
                <RoleTable roles={roles} onEdit={(r) => { setEditingRole(r); setOpenModal(true); }} onDelete={handleDelete} />
                {openModal && (
                    <RoleModal
                        role={editingRole}
                        onClose={() => setOpenModal(false)}
                        onSave={handleSave}
                    />
                )}
            </div>
        </DashboardLayout>
    );
};

export default UserRoles;
