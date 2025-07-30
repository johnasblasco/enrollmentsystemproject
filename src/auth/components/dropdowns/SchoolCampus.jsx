import React from 'react'

const SchoolCampus = ({ value, onChange }) => {
    return (
        <div>
            <label htmlFor="Headline" className='flex gap-2'>
                <span className="text-sm mx-4 font-medium text-gray-700 md:w-[150px]"> School Campus </span>

                <select
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    name="Headline"
                    id="Headline"
                    className="md:p-2 mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm md:w-[600px]"
                >
                    <option value="">Please select</option>
                    <option value="Main Campus">Main Campus</option>
                    <option value="Hagonoy Campus">Hagonoy Campus</option>
                    <option value="SJDM Campus">SJDM Campus</option>
                    <option value="Calumpit Campus">Calumpit Campus</option>
                    <option value="Paombong Campus">Paombong Campus</option>
                </select>
            </label>
        </div>
    )
}

export default SchoolCampus
