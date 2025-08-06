import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2 } from "lucide-react";
import DashboardLayout from "@/admin_dashboard/components/DashboardLayout";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

const SchoolYear = () => {
    const [schoolYears, setSchoolYears] = useState([]);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ school_year: "", semester: "" });

    const token = localStorage.getItem("token");

    const fetchSchoolYears = async () => {
        try {
            const res = await axios.get(
                "https://server.laravel.bpc-bsis4d.com/public/api/getschoolyears",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setSchoolYears(res.data.schoolYears || []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSave = async () => {
        if (!form.school_year.trim() || !form.semester.trim()) {
            return alert("All fields are required.");
        }

        try {
            const url = editing
                ? `https://server.laravel.bpc-bsis4d.com/public/api/updateschoolyear/${editing.id}`
                : "https://server.laravel.bpc-bsis4d.com/public/api/addschoolyear";

            await axios.post(url, form, {
                headers: { Authorization: `Bearer ${token}` },
            });

            fetchSchoolYears();
            setOpen(false);
            setForm({ school_year: "", semester: "" });
            setEditing(null);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `https://server.laravel.bpc-bsis4d.com/public/api/deleteschoolyear/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            fetchSchoolYears();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchSchoolYears();
    }, []);

    return (
        <DashboardLayout>
            <div className="p-6 space-y-6 w-full">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">School Year</h1>
                    <Button onClick={() => { setOpen(true); setForm({ school_year: "", semester: "" }); setEditing(null); }}>
                        <Plus className="w-4 h-4 mr-2" /> Add
                    </Button>
                </div>

                <div className="rounded-md border shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>School Year</TableHead>
                                <TableHead>Semester</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {schoolYears.map((sy) => (
                                <TableRow key={sy.id}>
                                    <TableCell>{sy.school_year}</TableCell>
                                    <TableCell>{sy.semester}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            onClick={() => {
                                                setEditing(sy);
                                                setForm({ school_year: sy.school_year, semester: sy.semester });
                                                setOpen(true);
                                            }}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            onClick={() => handleDelete(sy.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editing ? "Edit" : "Add"} School Year</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label>School Year</Label>
                                <Input
                                    value={form.school_year}
                                    onChange={(e) => setForm({ ...form, school_year: e.target.value })}
                                    placeholder="e.g. 2025-2026"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Semester</Label>
                                <Input
                                    value={form.semester}
                                    onChange={(e) => setForm({ ...form, semester: e.target.value })}
                                    placeholder="e.g. 1st semester"
                                />
                            </div>
                            <Button onClick={handleSave}>
                                {editing ? "Update" : "Save"}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </DashboardLayout>
    );
};

export default SchoolYear;
