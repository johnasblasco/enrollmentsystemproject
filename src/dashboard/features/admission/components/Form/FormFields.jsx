
const FormField = ({ label, children }) => {
    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="bg-gray-50 border rounded-lg px-3 py-2 hover:bg-gray-100">
                {children}
            </div>
        </div>
    )
}

export default FormField
