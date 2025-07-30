const Classifications = ({ value, onChange, gradeLevel, onGradeChange }) => {
    return (
        <div>
            <label htmlFor="classification" className="flex gap-2">
                <span className="text-sm mx-4 font-medium text-gray-700 md:w-[150px]">
                    Classification
                </span>

                <select
                    id="classification"
                    name="classification"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    className="md:p-2 mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm md:w-[600px]"
                >
                    <option value="">Please select</option>
                    <option value="Pre-School">Pre-School</option>
                    <option value="Grade School">Grade School</option>
                    <option value="JHS">JHS</option>
                    <option value="SHS">SHS</option>
                    <option value="Technical/Vocational">Technical/Vocational</option>
                    <option value="College">College</option>
                    <option value="Masters">Masters</option>
                    <option value="PHD">PHD</option>
                </select>
            </label>

            {/* Conditional Grade Level dropdown */}
            {['COL', 'TV', 'SHS', 'JHS', 'GS', 'PS'].includes(value) && (
                <div>
                    <label htmlFor="gradeLevel" className="flex gap-2 mt-4">
                        <span className="text-sm mx-4 font-medium text-gray-700 md:w-[150px]">
                            Grade Level
                        </span>

                        <select
                            id="gradeLevel"
                            name="gradeLevel"
                            value={gradeLevel || ''}
                            onChange={(e) => onGradeChange(e.target.value)}
                            className="md:p-2 mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm md:w-[600px]"
                        >
                            <option value="">Please select</option>
                            <option value="1">Level 1</option>
                            <option value="2">Level 2</option>
                            <option value="3">Level 3</option>
                            <option value="4">Level 4</option>
                            <option value="5">Level 5</option>
                            <option value="6">Level 6</option>
                        </select>
                    </label>
                </div>
            )}
        </div>
    );
};

export default Classifications;
