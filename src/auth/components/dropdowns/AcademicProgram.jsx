import React from 'react'
import axios from 'axios'
const AcademicProgram = ({ value, onChange }) => {

    const fetchAcademicData = async () => {

    }

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
                    <option value="BSIT">BSIT</option>
                    <option value="BSCS">BSCS</option>
                    <option value="BEED">BEED</option>
                    <option value="BSN">BSN</option>
                    <option value="BSBA">BSBA</option>
                    <option value="BSCE">BSCE</option>
                    <option value="BSIS">BSIS</option>
                </select>
            </label>
        </div>
    )
}

export default AcademicProgram
