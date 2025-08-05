import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';

const SubjectModal = ({ open, setOpen, onSubmit, editingData }) => {
    const [formData, setFormData] = useState({
        subject_name: '',
        subject_code: '',
        units: '',
        course_id: '',
    });

    const [courses, setCourses] = useState([]);

    // Fetch courses and sections
    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const [courseRes, sectionRes] = await Promise.all([
                    axios.get('https://server.laravel.bpc-bsis4d.com/public/api/dropdown/courses')
                ]);
                setCourses(courseRes.data?.courses || []);
            } catch (err) {
                console.error('Failed to fetch dropdown data', err);
            }
        };

        if (open) {
            fetchDropdownData();
        }
    }, [open]);

    // Handle form data population when editing
    useEffect(() => {
        if (editingData) {
            setFormData({
                subject_name: editingData.subject_name || '',
                subject_code: editingData.subject_code || '',
                units: editingData.units || '',
                course_id: editingData.course?.id || '',
            });
        } else {
            setFormData({
                subject_name: '',
                subject_code: '',
                units: '',
                course_id: '',
            });
        }
    }, [editingData]);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSelectChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{editingData ? 'Edit Subject' : 'Add Subject'}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <Input
                        placeholder="Subject Code"
                        name="subject_code"
                        value={formData.subject_code}
                        onChange={handleChange}
                    />
                    <Input
                        placeholder="Subject Name"
                        name="subject_name"
                        value={formData.subject_name}
                        onChange={handleChange}
                    />
                    <Input
                        placeholder="Units"
                        name="units"
                        value={formData.units}
                        onChange={handleChange}
                    />

                    {/* Course Dropdown */}
                    <Select value={formData.course_id} onValueChange={(val) => handleSelectChange('course_id', val)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Course" />
                        </SelectTrigger>
                        <SelectContent>
                            {courses.map((course) => (
                                <SelectItem key={course.id} value={course.id.toString()}>
                                    {course.course_name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Button onClick={handleSubmit}>
                        {editingData ? 'Update' : 'Save'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SubjectModal;
