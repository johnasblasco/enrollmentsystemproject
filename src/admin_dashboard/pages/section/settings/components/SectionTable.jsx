import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SectionTable = ({ sections, onEdit, onDelete }) => {
    return (
        <Card>
            <CardContent className="p-4 overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Section Name</TableHead>
                            <TableHead>Section Size</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Campus</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sections.map((section) => (
                            <TableRow key={section.id}>
                                <TableCell>{section.section_name}</TableCell>
                                <TableCell>{section.section_size}</TableCell>
                                <TableCell>{section.course?.name}</TableCell>
                                <TableCell>{section.campus?.campus_name}</TableCell>
                                <TableCell className="flex justify-end gap-2">
                                    <Button size="sm" variant="outline" onClick={() => onEdit(section)}>
                                        <Pencil className="w-4 h-4 " />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => onDelete(section.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default SectionTable;
