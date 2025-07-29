import React from 'react'

const AcademicYear = ({ value, onChange }) => {
    return (
        <div>
            <label htmlFor="Headline" className='flex gap-2'>
                <span className="text-sm mx-4 font-medium text-gray-700 md:w-[150px]"> Academic Year & Term </span>

                <select
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    name="Headline"
                    id="Headline"
                    className="md:p-2 mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm md:w-[600px]"
                >
                    <option value="">Please select</option>
                    <option value="JM">2024-2025 -1st Trimester</option>
                    <option value="SRV"> 2024-2025-2st Semester</option>
                    <option value="JH">2024-2025 - School Year</option>
                </select>
            </label>
        </div>
    )
}

export default AcademicYear
