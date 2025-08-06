import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

const DepartmentTable = ({ departments, onEdit, onDelete }) => {
    return (
        <Card>
            <CardContent className="overflow-x-auto p-4">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left font-bold border-b">
                            <th className="p-2">Department Name</th>
                            <th className="p-2">Department Description</th>
                            <th className="p-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((department) => (
                            <tr key={department.id} className="border-b">
                                <td className="p-2">{department.department_name}</td>
                                <td className="p-2">{department.description}</td>
                                <td className="p-2 flex justify-end gap-2">
                                    <Button size="sm" variant="outline" onClick={() => onEdit(department)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="destructive" onClick={() => onDelete(department.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
};

export default DepartmentTable;
