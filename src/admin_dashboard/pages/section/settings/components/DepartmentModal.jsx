import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const DepartmentModal = ({ department, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        department_name: '',
        description: '',
    });

    useEffect(() => {
        if (department) {
            setFormData({
                department_name: department.department_name || '',
                description: department.description || '',
            });
        } else {
            setFormData({
                department_name: '',
                description: '',
            });
        }
    }, [department]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!formData.department_name || !formData.description) return;
        onSave(formData, department?.id);
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{department ? 'Edit Department' : 'Add Department'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input
                        name="department_name"
                        placeholder="Department Name"
                        value={formData.department_name}
                        onChange={handleChange}
                    />
                    <Input
                        name="description"
                        placeholder="Department Description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>Cancel</Button>
                        <Button onClick={handleSubmit}>
                            {department ? 'Update' : 'Save'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DepartmentModal;
