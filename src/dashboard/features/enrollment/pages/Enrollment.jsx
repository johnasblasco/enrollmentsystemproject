import React, { useState, useEffect } from "react"
import DashboardLayout from "@/dashboard/components/DashboardLayout"
import { Button } from "@/components/ui/button"

const Enrollment = () => {
    // Sample state to hold enrolled students
    const [students, setStudents] = useState([])

    // Example: fetch enrollment data from API
    useEffect(() => {
        // TODO: replace with your real API call
        const fetchData = async () => {
            // Example data
            const data = [
                { id: 1, name: "Juan Dela Cruz", course: "BSIT", year: "1st Year" },
                { id: 2, name: "Maria Santos", course: "BSBA", year: "2nd Year" }
            ]
            setStudents(data)
        }
        fetchData()
    }, [])

    const handleAddEnrollment = () => {
        // 👉 Navigate to enrollment form or open modal
        alert("Add Enrollment form here!")
    }

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-6">📚 Enrollment</h1>

            {/* Add Enrollment Button */}
            <div className="mb-4 flex justify-end">
                <Button onClick={handleAddEnrollment}>➕ Add Enrollment</Button>
            </div>

            {/* Enrollment Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full text-left border-collapse">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="py-3 px-4">#</th>
                            <th className="py-3 px-4">Student Name</th>
                            <th className="py-3 px-4">Course</th>
                            <th className="py-3 px-4">Year Level</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map((s, index) => (
                                <tr key={s.id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">{s.name}</td>
                                    <td className="py-2 px-4">{s.course}</td>
                                    <td className="py-2 px-4">{s.year}</td>
                                    <td className="py-2 px-4 text-center">
                                        <Button
                                            variant="secondary"
                                            className="mr-2"
                                            onClick={() => alert(`Edit ${s.name}`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={() => alert(`Delete ${s.name}`)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                                    No enrollment records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    )
}

export default Enrollment
