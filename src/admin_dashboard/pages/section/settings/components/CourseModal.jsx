import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CourseModal = ({ course, onClose, onSave }) => {
    const [form, setForm] = useState({
        course_name: "",
        course_code: "",
        course_units: "",
        course_type: "",
        course_description: "",
    });

    useEffect(() => {
        if (course) {
            setForm({
                course_name: course.course_name || "",
                course_code: course.course_code || "",
                course_units: course.course_units || "",
                course_type: course.course_type || "",
                course_description: course.course_description || "",

            });
        } else {
            setForm({
                course_name: "",
                course_code: "",
                course_units: "",
                course_type: "",
                course_description: "",

            });
        }
    }, [course]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const data = {
            ...form,
            course_units: parseInt(form.course_units) || 0,
        };
        onSave(data, course?.id); // second param is `id` if editing
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{course ? "Edit Course" : "Add Course"}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label>Course Name</Label>
                        <Input name="course_name" value={form.course_name} onChange={handleChange} />
                    </div>
                    <div>
                        <Label>Course Code</Label>
                        <Input name="course_code" value={form.course_code} onChange={handleChange} />
                    </div>
                    <div>
                        <Label>Course Units</Label>
                        <Input
                            type="number"
                            name="course_units"
                            value={form.course_units}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full">
                        <Label>Course Type</Label>
                        <Select
                            value={form.course_type}
                            onValueChange={(value) => setForm((prev) => ({ ...prev, course_type: value }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select course type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Associate">Associate</SelectItem>
                                <SelectItem value="Bachelor">Bachelor</SelectItem>
                                <SelectItem value="Master">Master</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Course Description</Label>
                        <Input name="course_description" value={form.course_description} onChange={handleChange} />
                    </div>


                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit}>
                            {course ? "Update" : "Save"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CourseModal;
