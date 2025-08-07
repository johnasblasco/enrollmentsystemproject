import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

const CurriculumTable = ({ curriculums, onEdit, onDelete }) => {
    return (
        <Card>
            <CardContent className="overflow-x-auto p-4">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left font-bold border-b">
                            <th className="p-2">Curriculum Name</th>
                            <th className="p-2">Course</th>
                            <th className="p-2">Description</th>
                            <th className="p-2">Subjects</th>
                            <th className="p-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {curriculums.map((curriculum) => (
                            <tr key={curriculum.id} className="border-b">
                                <td className="p-2">{curriculum.curriculum_name}</td>
                                <td className="p-2">{curriculum.course?.course_name}</td>
                                <td className="p-2">{curriculum.curriculum_description}</td>
                                <td className="p-2">{curriculum.subjects?.length || 0}</td>
                                <td className="p-2 flex gap-2 justify-end">
                                    <Button size="sm" variant="outline" onClick={() => onEdit(curriculum)}>
                                        <Pencil className="h-4 w-4 mr-1" />
                                    </Button>
                                    <Button size="sm" variant="destructive" onClick={() => onDelete(curriculum.id)}>
                                        <Trash2 className="h-4 w-4 mr-1" />
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

export default CurriculumTable;
