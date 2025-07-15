import React, { useState } from 'react'


const Classifications = () => {

    const [selected, setSelected] = useState('');

    return (
        <div>
            <label htmlFor="Headline" className='flex gap-2'>
                <span className="text-sm mx-4 font-medium text-gray-700 md:w-[150px]"> Classification </span>

                <select
                    name="Headline"
                    id="Headline"
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    className="md:p-2 mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm md:w-[600px]"
                >
                    <option value="PS">Pre-School</option>
                    <option value="GS">Grade School</option>
                    <option value="JHS">JHS</option>
                    <option value="SHS">SHS</option>
                    <option value="TV">Technical/Vocational</option>
                    <option value="COL">College</option>
                    <option value="M">Masters</option>
                    <option value="PHD">PHD</option>
                </select>
            </label>

            {/* conditional rendering */}

            {(selected === 'COL' || selected === 'TV' || selected === 'SHS' || selected === 'JHS' || selected === 'GS' || selected === 'PS') && (
                <div>
                    <label htmlFor="Headline" className='flex gap-2 mt-4'>
                        <span className="text-sm mx-4 font-medium text-gray-700 md:w-[150px]"> Grade Level </span>

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
            )}
        </div>
    )
}

export default Classifications
