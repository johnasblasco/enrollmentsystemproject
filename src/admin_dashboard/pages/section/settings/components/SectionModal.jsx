import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState, useEffect } from "react";
import axios from "axios";

const SectionModal = ({ onClose, onSuccess, section, campuses }) => {
    const [name, setName] = useState(section?.name || "");
    const [campusId, setCampusId] = useState(section?.campus_id || "");

    const handleSubmit = async () => {
        try {
            if (section) {
                await axios.put(`https://your-api/sections/${section.id}`, { name, campus_id: campusId });
            } else {
                await axios.post("https://your-api/sections", { name, campus_id: campusId });
            }
            onSuccess();
        } catch (err) {
            console.error(err);
        }
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
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <Label>Campus</Label>
                        <Select value={campusId} onValueChange={setCampusId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select campus" />
                            </SelectTrigger>
                            <SelectContent>
                                {campuses.map((campus) => (
                                    <SelectItem key={campus.id} value={campus.id.toString()}>
                                        {campus.campus_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="w-full" onClick={handleSubmit}>
                        {section ? "Update" : "Create"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SectionModal;
