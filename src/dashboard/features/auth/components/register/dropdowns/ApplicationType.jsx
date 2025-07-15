import React from 'react'

const ApplicationType = () => {
    return (
        <div>
            <label htmlFor="Headline" className='flex gap-2'>
                <span className="text-sm mx-4 font-medium text-gray-700 md:w-[150px]"> Application Type </span>

                <select
                    name="Headline"
                    id="Headline"
                    className="md:p-2 mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm md:w-[600px]"
                >
                    <option value="">Please select</option>
                    <option value="JM">University Academic Extension Programs</option>
                    <option value="SRV">Regular In-Campus</option>
                    <option value="JH">Pure Online/Modular</option>
                    <option value="BBK">Freshman</option>
                    <option value="AK">Transferee</option>
                    <option value="BG">Cross-Enrollee</option>
                    <option value="EC">Returnee</option>
                </select>
            </label>
        </div>
    )
}

export default ApplicationType
