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
                    <option value="JM">Main Campus</option>
                    <option value="SRV">Hagonoy Campus</option>
                    <option value="JH">SJDM Campus</option>
                    <option value="BBK">Calumpit Campus</option>
                    <option value="AK">Paombong Campus</option>
                </select>
            </label>
        </div>
    )
}

export default SchoolCampus
