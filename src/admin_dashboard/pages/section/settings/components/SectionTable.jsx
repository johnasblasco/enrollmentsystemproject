import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SectionTable = ({ sections, onEdit, onDelete }) => {
    return (
        <Card>
            <CardContent className="overflow-x-auto p-4">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left font-bold border-b">
                            <th className="p-2">Section Name</th>
                            <th className="p-2">Course</th>
                            <th className="p-2">Campus</th>
                            <th className="p-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sections.map((section) => (
                            <tr key={section.id} className="border-b">
                                <td className="p-2">{section.section_name}</td>
                                <td className="p-2">{section.course?.name}</td>
                                <td className="p-2">{section.campus?.campus_name}</td>
                                <td className="p-2 flex gap-2 justify-end">
                                    <Button size="sm" onClick={() => onEdit(section)}>Edit</Button>
                                    <Button size="sm" variant="destructive" onClick={() => onDelete(section.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
};

export default SectionTable;
