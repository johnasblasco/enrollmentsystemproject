import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const CurriculumModal = ({ curriculum, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        course_id: '',
        subject_ids: [],
    });

    const [courses, setCourses] = useState([]);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        // Fetch related data
        fetchCourses();
        fetchSubjects();

        if (curriculum) {
            setFormData({
                name: curriculum.name || '',
                course_id: curriculum.course_id || '',
                subject_ids: curriculum.subject_ids || [],
            });
        } else {
            setFormData({ name: '', course_id: '', subject_ids: [] });
        }
    }, [curriculum]);

    const fetchCourses = async () => {
        const res = await fetch('https://server.laravel.bpc-bsis4d.com/public/api/courses');
        const data = await res.json();
        setCourses(data);
    };

    const fetchSubjects = async () => {
        const res = await fetch('https://server.laravel.bpc-bsis4d.com/public/api/subjects');
        const data = await res.json();
        setSubjects(data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleMultiSelect = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData({ ...formData, subject_ids: selectedOptions });
    };

    const handleSubmit = () => {
        onSave(formData, curriculum?.id);
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{curriculum ? 'Edit Curriculum' : 'Add Curriculum'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input
                        placeholder="Curriculum Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <select
                        name="course_id"
                        className="w-full p-2 border rounded"
                        value={formData.course_id}
                        onChange={handleChange}
                    >
                        <option value="">Select Course</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.course_name}
                            </option>
                        ))}
                    </select>
                    <select
                        multiple
                        className="w-full p-2 border rounded"
                        value={formData.subject_ids}
                        onChange={handleMultiSelect}
                    >
                        {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                                {subject.subject_name}
                            </option>
                        ))}
                    </select>
                    <Button onClick={handleSubmit}>
                        {curriculum ? 'Update' : 'Save'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CurriculumModal;
