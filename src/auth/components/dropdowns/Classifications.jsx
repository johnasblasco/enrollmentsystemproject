const Classifications = ({ value, onChange, applicationType }) => {
    const isFreshman = applicationType === 'Freshman';

    const gradeLevels = isFreshman
        ? [{ value: '1', label: 'Level 1' }]
        : [
            { value: '1', label: 'Level 1' },
            { value: '2', label: 'Level 2' },
            { value: '3', label: 'Level 3' },
            { value: '4', label: 'Level 4' },
            { value: '5', label: 'Level 5' },
            { value: '6', label: 'Level 6' },
        ];

    return (
        <div>
            <label htmlFor="gradeLevel" className="flex gap-2">
                <span className="text-sm mx-4 font-medium text-gray-700 md:w-[150px]">
                    Grade Level
                </span>

                <select
                    id="gradeLevel"
                    name="gradeLevel"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    className="md:p-2 mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm md:w-[600px]"
                >
                    <option value="">Please select</option>
                    {gradeLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                            {level.label}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default Classifications;
