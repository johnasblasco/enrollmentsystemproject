import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

const CurriculumTable = ({ data, onEdit }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Curriculum</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Subjects</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.course_name}</TableCell>
                        <TableCell>{item.subjects?.map(s => s.subject_name).join(', ')}</TableCell>
                        <TableCell>
                            <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
                                <Pencil className="w-4 h-4 mr-1" /> Edit
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default CurriculumTable;
