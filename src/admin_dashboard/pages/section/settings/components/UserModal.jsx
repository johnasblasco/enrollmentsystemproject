import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

const UserModal = ({ roles, user, onClose, onSuccess }) => {
    const isEdit = Boolean(user);
    const [form, setForm] = useState({
        given_name: "",
        surname: "",
        email: "",
        user_type_id: "",
    });

    useEffect(() => {
        if (user) {
            setForm({
                given_name: user.given_name || "",
                surname: user.surname || "",
                email: user.email || "",
                user_type_id: user.user_type?.id?.toString() || "", // <-- safer
            });
        } else {
            setForm({
                given_name: "",
                surname: "",
                email: "",
                user_type_id: "",
            });
        }
    }, [user]);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEdit) {
                await axios.post(`https://server.laravel.bpc-bsis4d.com/public/api/updateuser/${user.id}`, form);
            } else {
                await axios.post("https://server.laravel.bpc-bsis4d.com/public/api/createuser", form);
            }
            onSuccess();
        } catch (error) {
            console.error("Submit failed:", error);
        }
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit User" : "Add User"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Given Name</Label>
                        <Input name="given_name" value={form.given_name} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label>Surname</Label>
                        <Input name="surname" value={form.surname} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input name="email" value={form.email} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                        <Label>User Type</Label>
                        <Select
                            value={form.user_type_id}
                            onValueChange={(value) =>
                                setForm({ ...form, user_type_id: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select User Type" />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map((type) => (
                                    <SelectItem key={type.id} value={String(type.id)}>
                                        {type.role_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                    </div>


                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                        <Button type="submit">{isEdit ? "Update" : "Create"}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UserModal;
