import DashboardLayout from '@/admin_dashboard/components/DashboardLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CourseTable from './components/CourseTable';
import CourseModal from './components/CourseModal';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const token = localStorage.getItem('token');

    const fetchCourses = async () => {
        try {
            const res = await axios.get("https://server.laravel.bpc-bsis4d.com/public/api/getcourses", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setCourses(res.data.courses);
            console.log
        } catch (err) {
            console.error(err);
        }
    };

    const handleSave = async (data, id) => {
        const token = localStorage.getItem('token');

        if (!data.course_name?.trim()) {
            alert("Course name is required.");
            return;
        }

        if (!data.course_code?.trim()) {
            alert("Course code is required.");
            return;
        }

        const formData = new FormData();
        formData.append("course_name", data.course_name);
        formData.append("course_code", data.course_code);
        formData.append("course_description", data.course_description || "");
        formData.append("course_type", data.course_type || "");
        formData.append("course_units", data.course_units || "");

        try {
            const url = id
                ? `https://server.laravel.bpc-bsis4d.com/public/api/updatecourse/${id}`
                : "https://server.laravel.bpc-bsis4d.com/public/api/addcourse";

            await axios.post(url, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            fetchCourses();
            setOpenModal(false);
        } catch (err) {
            console.error("Error saving course:", err.response?.data || err.message);
        }
    };


    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://server.laravel.bpc-bsis4d.com/public/api/deletecourse/${id}`);
            fetchCourses();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <DashboardLayout>
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Courses</h1>
                    <Button onClick={() => { setEditingCourse(null); setOpenModal(true); }}>
                        <Plus className="w-4 h-4 mr-2" /> Add Course
                    </Button>
                </div>
                <CourseTable courses={courses} onEdit={(c) => { setEditingCourse(c); setOpenModal(true); }} onDelete={handleDelete} />
                {openModal && (
                    <CourseModal
                        course={editingCourse}
                        onClose={() => setOpenModal(false)}
                        onSave={handleSave}
                    />
                )}
            </div>
        </DashboardLayout>
    );
};

export default Courses;
