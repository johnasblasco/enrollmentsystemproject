import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AcademicYear = ({ value, onChange }) => {
    const [academicYears, setAcademicYears] = useState([])

    useEffect(() => {
        const fetchAcademicData = async () => {
            try {
                const response = await axios.get("https://server.laravel.bpc-bsis4d.com/public/api/dropdown/academic-years");
                setAcademicYears(response.data.academic_years);
            } catch (error) {
                console.error("Failed to fetch academic years:", error);
            }
        };

        fetchAcademicData();
    }, [])

    return (
        <div>
            <label htmlFor="academicYear" className="flex gap-2">
                <span className="text-sm mx-4 font-medium text-gray-700 md:w-[150px]">
                    Academic Year & Term
                </span>

                <select
                    id="academicYear"
                    name="academicYear"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    className="md:p-2 mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm md:w-[600px]"
                >
                    <option value="">Please select</option>
                    {academicYears.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.school_year} - {item.semester}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    )
}

export default AcademicYear
