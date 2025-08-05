import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';

const SubjectTable = ({ subjects = [], onEdit, onDelete }) => {
    return (
        <div className="rounded-md border">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2">Subject Code</th>
                        <th className="p-2">Subject Name</th>
                        <th className="p-2">Units</th>
                        <th className="p-2 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center p-4">
                                No subjects available.
                            </td>
                        </tr>
                    ) : (
                        subjects.map((subject) => (
                            <tr key={subject.id} className="border-t">
                                <td className="p-2">{subject.subject_code}</td>
                                <td className="p-2">{subject.subject_name}</td>
                                <td className="p-2">{subject.units}</td>
                                <td className="p-2 text-right space-x-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => onEdit(subject)}
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => onDelete(subject.id)}
                                    >
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SubjectTable;
