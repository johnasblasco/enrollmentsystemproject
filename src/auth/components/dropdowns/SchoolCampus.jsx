import React, { useState, useEffect } from 'react'
import axios from 'axios'
const SchoolCampus = ({ value, onChange }) => {

    const [schoolCampus, setSchoolCampus] = useState([])

    const fetchAcademicData = async () => {
        try {
            const response = await axios.get("https://server.laravel.bpc-bsis4d.com/public/api/dropdown/school-campuses");
            setSchoolCampus(response.data.campuses);
        } catch (error) {
            console.error("Failed to fetch academic programs:", error);
        }
    };

    useEffect(() => {
        fetchAcademicData()
    }, [])
    return (
        <div>
            <label htmlFor="Headline" className='flex gap-2'>
                <span className="text-sm mx-4 font-medium text-gray-700 md:w-[150px]"> School Campus </span>


                <select
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    name="schoolCampus"
                    id="schoolCampus"
                    className="md:p-2 mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm md:w-[600px]"
                >
                    <option value="">Please select</option>
                    {schoolCampus.map((program) => (
                        <option key={program.id} value={program.id}>
                            {program.campus_name}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    )
}

export default SchoolCampus
