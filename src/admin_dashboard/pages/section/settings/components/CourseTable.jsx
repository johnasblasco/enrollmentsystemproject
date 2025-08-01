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

const CourseTable = ({ courses = [], onEdit, onDelete }) => {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Course Code</TableHead>
                        <TableHead>Couse Name</TableHead>
                        <TableHead>Course Description</TableHead>
                        <TableHead>Course Type</TableHead>
                        <TableHead>Course Units</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {courses.map((course) => (
                        <TableRow key={course.course_code}>
                            <TableCell>{course.course_code}</TableCell>
                            <TableCell>{course.course_name}</TableCell>
                            <TableCell>{course.course_description}</TableCell>
                            <TableCell>{course.course_type}</TableCell>
                            <TableCell>{course.course_units}</TableCell>

                            <TableCell className="text-right space-x-2">
                                <Button size="sm" variant="outline" onClick={() => onEdit(course)}>
                                    <Pencil className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => onDelete(course.id)}>
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

export default CourseTable;
