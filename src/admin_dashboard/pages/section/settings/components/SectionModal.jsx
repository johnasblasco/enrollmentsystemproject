import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState } from "react";

const SectionModal = ({ section, campuses, courses, onClose, onSave }) => {
    const [form, setForm] = useState({
        section_name: section?.section_name || "",
        section_size: section?.section_size || "",
        campus_id: section?.campus_id || "",
        course_id: section?.course_id || "",
    });

    const handleChange = (key, value) => {
        setForm({ ...form, [key]: value });
    };

    const handleSubmit = () => {
        onSave(form, section?.id || null);
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{section ? "Edit Section" : "Add Section"}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label>Section Name</Label>
                        <Input value={form.section_name} onChange={(e) => handleChange("section_name", e.target.value)} />
                    </div>
                    <div>
                        <Label>Section Size</Label>
                        <Input type={"number"} value={form.section_size} onChange={(e) => handleChange("section_size", e.target.value)} />
                    </div>

                    <div>
                        <Label>Campus</Label>
                        <Select value={form.campus_id} onValueChange={(val) => handleChange("campus_id", val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select campus" />
                            </SelectTrigger>
                            <SelectContent>
                                {campuses.map(c => (
                                    <SelectItem key={c.id} value={String(c.id)}>
                                        {c.campus_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Course</Label>
                        <Select value={form.course_id} onValueChange={(val) => handleChange("course_id", val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select course" />
                            </SelectTrigger>
                            <SelectContent>
                                {courses.map(c => (
                                    <SelectItem key={c.id} value={String(c.id)}>
                                        {c.course_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>Cancel</Button>
                        <Button onClick={handleSubmit}>{section ? "Update" : "Save"}</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SectionModal;
