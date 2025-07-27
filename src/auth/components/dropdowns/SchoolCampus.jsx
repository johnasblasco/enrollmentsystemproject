import React from 'react'

const SchoolCampus = () => {
    return (
        <div>
            <label htmlFor="Headline" className='flex gap-2'>
                <span className="text-sm mx-4 font-medium text-gray-700 md:w-[150px]"> School Campus </span>

                <select
                    name="Headline"
                    id="Headline"
                    className="md:p-2 mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm md:w-[600px]"
                >
                    <option value="">Please select</option>
                    <option value="JM">Manila</option>
                    <option value="SRV">North Luzon</option>
                    <option value="JH">Calabarzon</option>
                    <option value="BBK">Cebu</option>
                    <option value="AK">Davao</option>
                </select>
            </label>
        </div>
    )
}

export default SchoolCampus
