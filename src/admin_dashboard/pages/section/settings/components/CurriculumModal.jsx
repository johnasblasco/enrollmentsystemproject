import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";

const CurriculumModal = ({ open, onOpenChange, onSave, initialData }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [courseId, setCourseId] = useState("");
    const [subjectIds, setSubjectIds] = useState([]);
    const [courses, setCourses] = useState([]);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        if (initialData) {
            setName(initialData.curriculum_name || "");
            setDescription(initialData.curriculum_description || "");
            setCourseId(initialData.course_id || "");
            setSubjectIds(initialData.subjects?.map((s) => s.id) || []);
        } else {
            setName("");
            setDescription("");
            setCourseId("");
            setSubjectIds([]);
        }
    }, [initialData]);

    useEffect(() => {
        const fetchData = async () => {
            const courseRes = await axios.get("https://server.laravel.bpc-bsis4d.com/public/api/courses");
            const subjectRes = await axios.get("https://server.laravel.bpc-bsis4d.com/public/api/subjects");
            setCourses(courseRes.data);
            setSubjects(subjectRes.data);
        };
        fetchData();
    }, []);

    const handleSubmit = () => {
        onSave({
            curriculum_name: name,
            curriculum_description: description,
            course_id: courseId,
            subject_ids: subjectIds
        });
        onOpenChange(false);
    };

    const handleCheckboxChange = (id) => {
        setSubjectIds((prev) =>
            prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit Curriculum" : "Add Curriculum"}</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label>Curriculum Name</Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Course</Label>
                        <select
                            value={courseId}
                            onChange={(e) => setCourseId(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">Select Course</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.course_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label>Subjects</Label>
                        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border p-2 rounded">
                            {subjects.map((subject) => (
                                <label key={subject.id} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={subjectIds.includes(subject.id)}
                                        onChange={() => handleCheckboxChange(subject.id)}
                                    />
                                    <span>{subject.subject_name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={handleSubmit}>{initialData ? "Update" : "Save"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CurriculumModal;
