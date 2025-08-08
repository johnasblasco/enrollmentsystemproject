import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { School } from 'lucide-react';
import axios from 'axios';

// Cleaner, more appealing Tailwind text colors
const colorPalette = [
    'blue', 'green', 'teal', 'cyan', 'purple', 'indigo', 'pink', 'rose', 'orange', 'amber'
];

const getRandomColor = () => {
    const base = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    return {
        text: `text-${base}-600`,
        border: `border-${base}-500`
    };
};

const ExaminationInfo = () => {
    const [campuses, setCampuses] = useState([]);
    const navigate = useNavigate();

    const fetchCampuses = async () => {
        try {
            const res = await axios.get("https://server.laravel.bpc-bsis4d.com/public/api/getcampuses");
            const campusesWithColors = res.data.campuses.map(campus => ({
                ...campus,
                ...getRandomColor()
            }));
            setCampuses(campusesWithColors);
        } catch (error) {
            console.error("Failed to fetch campuses:", error);
        }
    };

    useEffect(() => {
        fetchCampuses();
    }, []);

    return (
        <DashboardLayout>
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {campuses.map((campus) => (
                        <Card
                            key={campus.id}
                            className={`flex flex-col justify-between h-full border-l-4 ${campus.border}`}
                        >
                            <CardHeader className="space-y-2">
                                <div className={`flex items-center gap-2 ${campus.text}`}>
                                    <School className="w-5 h-5" />
                                    <CardTitle>{campus.campus_name}</CardTitle>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {campus.description || 'No description provided'}
                                </p>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    className="w-full"
                                    size="sm"
                                    onClick={() =>
                                        navigate(`/admin_dashboard/admissions/examination-info/campus/${campus.id}`)
                                    }
                                >
                                    View {campus.campus_name}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ExaminationInfo;
