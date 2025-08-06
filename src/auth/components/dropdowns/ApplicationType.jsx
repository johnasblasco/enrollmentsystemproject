import React from 'react';

const ApplicationType = ({ value, onChange }) => {
    return (
        <div>
            <label htmlFor="applicationType" className='flex gap-2'>
                <span className="text-sm mx-4 font-medium text-gray-700 md:w-[150px]">
                    Application Type
                </span>

                <select
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    name="applicationType"
                    id="applicationType"
                    className="md:p-2 mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm md:w-[600px]"
                >
                    <option value="">Please select</option>
                    <option value="University Academic Extension Programs">University Academic Extension Programs</option>
                    <option value="Regular In-Campus">Regular In-Campus</option>
                    <option value="Pure Online/Modular">Pure Online/Modular</option>
                    <option value="Freshman">Freshman</option>
                    <option value="Transferee">Transferee</option>
                    <option value="Cross-Enrollee">Cross-Enrollee</option>
                    <option value="Returnee">Returnee</option>
                </select>
            </label>
        </div>
    );
};

export default ApplicationType;
