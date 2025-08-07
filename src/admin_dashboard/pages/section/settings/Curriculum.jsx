import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/admin_dashboard/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen } from 'lucide-react';
import CurriculumModal from './components/CurriculumModal';
import CurriculumTable from './components/CurriculumTable';
import axios from 'axios';

const Curriculum = () => {
    const [curriculums, setCurriculums] = useState([]);
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);

    const fetchCurriculums = async () => {
        const res = await axios.get('https://server.laravel.bpc-bsis4d.com/public/api/getcurriculums');
        setCurriculums(res.data.curriculum);
    };

    useEffect(() => {
        fetchCurriculums();
    }, []);

    const handleSave = async (data, id) => {
        if (id) {
            await axios.put(`https://server.laravel.bpc-bsis4d.com/public/api/updatecurriculums/${id}`, data);
        } else {
            await axios.post(`https://server.laravel.bpc-bsis4d.com/public/api/createcurriculums`, data);
        }
        setOpen(false);
        fetchCurriculums();
    };

    const handleDelete = async (id) => {
        await axios.delete(`https://server.laravel.bpc-bsis4d.com/public/api/deletecurriculum/${id}`);
        fetchCurriculums();
    };

    return (
        <DashboardLayout>
            <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle className="text-xl flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Curriculum
                    </CardTitle>
                    <Button onClick={() => { setSelected(null); setOpen(true); }}>
                        <Plus className="w-4 h-4 mr-1" /> Add Curriculum
                    </Button>
                </CardHeader>
                <CardContent>
                    <CurriculumTable
                        curriculums={curriculums}
                        onEdit={(item) => { setSelected(item); setOpen(true); }}
                        onDelete={handleDelete}
                    />
                </CardContent>
            </Card>

            {open && (
                <CurriculumModal
                    curriculum={selected}
                    onClose={() => setOpen(false)}
                    onSave={handleSave}
                />
            )}
        </DashboardLayout>
    );
};

export default Curriculum;
