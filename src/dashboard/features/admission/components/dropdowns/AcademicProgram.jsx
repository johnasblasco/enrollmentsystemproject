import React from 'react'

const AcademicProgram = () => {
    return (
        <div>
            <label htmlFor="Headline" className='flex gap-2'>
                <span className="text-sm mx-4 font-medium text-gray-700 md:w-[150px]"> Academic Year & Term </span>

                <select
                    name="Headline"
                    id="Headline"
                    className="md:p-2 mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm md:w-[600px]"
                >
                    <option value="">Please select</option>
                    <option value="JM">BSIT</option>
                    <option value="SRV">BSCS</option>
                    <option value="JH">BEED</option>
                    <option value="BBK">BSN</option>
                    <option value="AK">BSBA</option>
                    <option value="BG">BSCE</option>
                    <option value="EC">BSIS</option>
                </select>
            </label>
        </div>
    )
}

export default AcademicProgram
