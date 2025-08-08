import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label'; // 🟢 Import Label
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

    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const [courseRes] = await Promise.all([
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

    useEffect(() => {
        if (editingData) {
            setFormData({
                subject_name: editingData.subject_name || '',
                subject_code: editingData.subject_code || '',
                units: editingData.units || '',
                course_id: editingData.course?.id?.toString() || '',
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
        const dataToSubmit = {
            ...formData,
            course_id: parseInt(formData.course_id),
            id: editingData?.id || null
        };
        onSubmit(dataToSubmit);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{editingData ? 'Edit Subject' : 'Add Subject'}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">

                    <div className="space-y-1">
                        <Label htmlFor="subject_code">Subject Code</Label>
                        <Input
                            id="subject_code"
                            placeholder="Subject Code"
                            name="subject_code"
                            value={formData.subject_code}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="subject_name">Subject Name</Label>
                        <Input
                            id="subject_name"
                            placeholder="Subject Name"
                            name="subject_name"
                            value={formData.subject_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="units">Units</Label>
                        <Input
                            id="units"
                            placeholder="Units"
                            name="units"
                            value={formData.units}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label>Course</Label>
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
                    </div>

                    <Button onClick={handleSubmit}>
                        {editingData ? 'Update' : 'Save'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SubjectModal;
