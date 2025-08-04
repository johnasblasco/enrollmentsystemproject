import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"

const SubjectSectionTable = ({ data, onEdit }) => {
    return (
        <div className="rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Subject Code</TableHead>
                        <TableHead>Subject Name</TableHead>
                        <TableHead>Units</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((subject) => (
                        <TableRow key={subject.id}>
                            <TableCell>{subject.subject_code}</TableCell>
                            <TableCell>{subject.subject_name}</TableCell>
                            <TableCell>{subject.units}</TableCell>
                            <TableCell>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => onEdit(subject)}
                                >
                                    <Pencil className="h-4 w-4 mr-1" />
                                    Edit
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default SubjectSectionTable
