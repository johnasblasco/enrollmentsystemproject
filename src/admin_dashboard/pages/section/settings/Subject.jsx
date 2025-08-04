import DashboardLayout from '@/admin_dashboard/components/DashboardLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import SubjectSectionTable from './components/SubjectSectionTable';
import SubjectSectionModal from './components/SubjectSectionModal';

const SubjectSections = () => {
    const [subjects, setSubjects] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editingSubject, setEditingSubject] = useState(null);

    const token = localStorage.getItem('token');

    const fetchSubjects = async () => {
        try {
            const res = await axios.get(
                'https://server.laravel.bpc-bsis4d.com/public/api/getsubjects',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSubjects(res.data.subjects);
            console.log("SHEEESH: ", subjects)
        } catch (err) {
            console.error(err);
        }
    };

    const handleSave = async (data, id) => {
        if (!data.subject_name || !data.subject_code || !data.units) {
            alert('All fields are required.');
            return;
        }

        try {
            const url = id
                ? `https://server.laravel.bpc-bsis4d.com/public/api/updatesubject/${id}`
                : 'https://server.laravel.bpc-bsis4d.com/public/api/addsubject';

            await axios.post(url, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            fetchSubjects();
            setOpenModal(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `https://server.laravel.bpc-bsis4d.com/public/api/deletesubject/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchSubjects();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    return (
        <DashboardLayout>
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Subject Sections</h1>
                    <Button onClick={() => { setEditingSubject(null); setOpenModal(true); }}>
                        <Plus className="w-4 h-4 mr-2" /> Add Subject
                    </Button>
                </div>
                <SubjectSectionTable
                    data={subjects}
                    onEdit={(subject) => {
                        setEditingSubject(subject);
                        setOpenModal(true);
                    }}
                    onDelete={handleDelete}
                />
                {openModal && (
                    <SubjectSectionModal
                        subject={editingSubject}
                        onClose={() => setOpenModal(false)}
                        onSave={handleSave}
                    />
                )}
            </div>
        </DashboardLayout>
    );
};

export default SubjectSections;
