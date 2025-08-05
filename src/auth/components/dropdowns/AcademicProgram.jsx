import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AcademicProgram = ({ value, onChange }) => {
    const [programs, setPrograms] = useState([]);

    const fetchAcademicData = async () => {
        try {
            const response = await axios.get("https://server.laravel.bpc-bsis4d.com/public/api/dropdown/academic-programs");
            setPrograms(response.data.academic_programs);
        } catch (error) {
            console.error("Failed to fetch academic programs:", error);
        }
    };

    useEffect(() => {
        fetchAcademicData();
    }, []);

    return (
        <div>
            <label htmlFor="academicProgram" className="flex gap-2">
                <span className="text-sm mx-4 font-medium text-gray-700 md:w-[150px]">Academic Program</span>

                <select
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    name="academicProgram"
                    id="academicProgram"
                    className="md:p-2 mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm md:w-[600px]"
                >
                    <option value="">Please select</option>
                    {programs.map((program) => (
                        <option key={program.id} value={program.id}>
                            {program.course_name}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default AcademicProgram;
