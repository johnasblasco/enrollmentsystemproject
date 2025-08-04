import DashboardLayout from '@/admin_dashboard/components/DashboardLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SectionTable from './components/SectionTable';
import SectionModal from './components/SectionModal';

const Sections = () => {
    const [sections, setSections] = useState([]);
    const [campuses, setCampuses] = useState([]);
    const [courses, setCourses] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editingSection, setEditingSection] = useState(null);
    const token = localStorage.getItem('token');

    const fetchSections = async () => {
        try {
            const res = await axios.get('https://server.laravel.bpc-bsis4d.com/public/api/getsections', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSections(res.data.sections);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchCampusesAndCourses = async () => {
        try {
            const [campusRes, courseRes] = await Promise.all([
                axios.get('https://server.laravel.bpc-bsis4d.com/public/api/dropdown/school-campuses', {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get('https://server.laravel.bpc-bsis4d.com/public/api/dropdown/courses', {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);
            setCampuses(campusRes.data.campuses);
            setCourses(courseRes.data.courses);


            console.log(campusRes)
            console.log(courseRes.data.courses)
        } catch (err) {
            console.error(err);
        }
    };

    const handleSave = async (data, id) => {
        if (!data.section_name || !data.course_id || !data.campus_id) return alert("All fields required.");

        const payload = {
            section_name: data.section_name,
            course_id: data.course_id,
            campus_id: data.campus_id,
        };

        try {
            const url = id
                ? `https://server.laravel.bpc-bsis4d.com/public/api/updatesection/${id}`
                : 'https://server.laravel.bpc-bsis4d.com/public/api/addsection';

            await axios.post(url, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            fetchSections();
            setOpenModal(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://server.laravel.bpc-bsis4d.com/public/api/deletesection/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchSections();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchSections();
        fetchCampusesAndCourses();
    }, []);

    return (
        <DashboardLayout>
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Sections</h1>
                    <Button onClick={() => { setEditingSection(null); setOpenModal(true); }}>
                        <Plus className="w-4 h-4 mr-2" /> Add Section
                    </Button>
                </div>

                <SectionTable sections={sections} onEdit={(s) => { setEditingSection(s); setOpenModal(true); }} onDelete={handleDelete} />

                {openModal && (
                    <SectionModal
                        section={editingSection}
                        campuses={campuses}
                        courses={courses}
                        onClose={() => setOpenModal(false)}
                        onSave={handleSave}
                    />
                )}
            </div>
        </DashboardLayout>
    );
};

export default Sections;
