import { useEffect, useState } from "react";
import SectionModal from "./components/SectionModal";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import axios from "axios";
import AdminDashboardLayout from "@/admin_dashboard/components/DashboardLayout";

const Sections = () => {
    const [sections, setSections] = useState([]);
    const [campuses, setCampuses] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editingSection, setEditingSection] = useState(null);

    const fetchSections = async () => {
        const res = await axios.get("https://your-api/sections");
        setSections(res.data.sections);
    };

    const fetchCampuses = async () => {
        const res = await axios.get("https://server.laravel.bpc-bsis4d.com/public/api/getcampuses");
        setCampuses(res.data.campuses);
    };

    useEffect(() => {
        fetchSections();
        fetchCampuses();
    }, []);

    return (
        <AdminDashboardLayout>
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Manage Sections</h1>
                    <Button onClick={() => { setEditingSection(null); setOpenModal(true); }}>
                        Add Section
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Sections ({sections.length})</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {sections.map((sec) => (
                            <div key={sec.id} className="flex justify-between items-center border p-3 rounded-lg">
                                <div>
                                    <div className="font-semibold">{sec.name}</div>
                                    <div className="text-sm text-gray-500">Campus: {sec.campus?.name}</div>
                                </div>
                                <Button onClick={() => { setEditingSection(sec); setOpenModal(true); }}>Edit</Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {openModal && (
                    <SectionModal
                        section={editingSection}
                        campuses={campuses}
                        onClose={() => setOpenModal(false)}
                        onSuccess={() => {
                            fetchSections();
                            setOpenModal(false);
                        }}
                    />
                )}
            </div>
        </AdminDashboardLayout>
    );
};

export default Sections;
