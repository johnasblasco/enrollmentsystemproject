import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const RoleModal = ({ role, onClose, onSave }) => {
    const [form, setForm] = useState({ role_name: "", description: "" });

    useEffect(() => {
        if (role) setForm({ role_name: role.role_name, description: role.description });
        else setForm({ role_name: "", description: "" });
    }, [role]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form, role?.id);
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{role ? "Edit Role" : "Add Role"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="Role Name"
                        value={form.role_name}
                        onChange={(e) => setForm({ ...form, role_name: e.target.value })}
                        required
                    />
                    <Input
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">{role ? "Update" : "Save"}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default RoleModal;
