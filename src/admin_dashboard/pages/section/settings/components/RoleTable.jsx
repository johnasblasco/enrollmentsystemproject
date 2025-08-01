import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

const RoleTable = ({ roles = [], onEdit, onDelete }) => {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Role Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {roles.map((role) => (
                        <TableRow key={role.id}>
                            <TableCell>{role.role_name}</TableCell>
                            <TableCell>{role.description}</TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button size="sm" variant="outline" onClick={() => onEdit(role)}>
                                    <Pencil className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => onDelete(role.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default RoleTable;
