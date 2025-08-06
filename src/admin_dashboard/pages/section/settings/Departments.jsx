import DashboardLayout from '@/admin_dashboard/components/DashboardLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import DepartmentTable from './components/DepartmentTable';
import DepartmentModal from './components/DepartmentModal';

const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState(null);
    const token = localStorage.getItem('token');

    const fetchDepartments = async () => {
        try {
            const res = await axios.get('https://server.laravel.bpc-bsis4d.com/public/api/getdepartments', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setDepartments(res.data.department || []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSave = async (data, id) => {
        if (!data.department_name?.trim()) {
            alert("Department name is required.");
            return;
        }

        try {
            const url = id
                ? `https://server.laravel.bpc-bsis4d.com/public/api/updatedepartment/${id}`
                : 'https://server.laravel.bpc-bsis4d.com/public/api/adddepartment';

            await axios.post(url, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            fetchDepartments();
            setOpenModal(false);
        } catch (err) {
            console.error('Error saving department:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://server.laravel.bpc-bsis4d.com/public/api/deletedepartment/${id}`);
            fetchDepartments();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    return (
        <DashboardLayout>
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Departments</h1>
                    <Button onClick={() => { setEditingDepartment(null); setOpenModal(true); }}>
                        <Plus className="w-4 h-4 mr-2" /> Add Department
                    </Button>
                </div>
                <DepartmentTable
                    departments={departments}
                    onEdit={(d) => { setEditingDepartment(d); setOpenModal(true); }}
                    onDelete={handleDelete}
                />
                {openModal && (
                    <DepartmentModal
                        department={editingDepartment}
                        onClose={() => setOpenModal(false)}
                        onSave={handleSave}
                    />
                )}
            </div>
        </DashboardLayout>
    );
};

export default Departments;
