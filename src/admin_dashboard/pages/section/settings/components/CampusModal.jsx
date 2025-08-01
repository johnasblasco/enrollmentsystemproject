import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const CampusModal = ({ campus, onClose, onSave }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (campus) {
            setName(campus.campus_name || "");
            setDescription(campus.campus_description || "");
        }
    }, [campus]);

    const handleSubmit = () => {
        if (!name.trim()) {
            alert("Campus name is required.");
            return;
        }
        if (!description.trim()) {

            alert(`this is ${description} || dscription is required.`);
            return;
        }

        onSave({ campus_name: name, campus_description: description }, campus?.id);
    };

    useEffect(() => {
        console.log(description)
    }, [description]);


    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{campus ? "Edit Campus" : "Add Campus"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Campus Name</Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={handleSubmit}>
                            {campus ? "Update" : "Save"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CampusModal;
