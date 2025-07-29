import React, { useState, useEffect } from "react"
import DashboardLayout from "@/dashboard/components/DashboardLayout"
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
            <h1>📚 Enrollment</h1>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Left side: Inputs */}
                <div className="flex flex-col gap-4">
                    <input type="text" placeholder="Student Name" className="border p-2 rounded" />

                </div>

                {/* Right side: Subjects */}
                <div>
                    <h2 className="font-bold mb-2">Select Subjects</h2>
                    <div className="border rounded p-4 space-y-2">
                        <label><input type="checkbox" /> IT101 - Intro to Computing</label><br />
                        <label><input type="checkbox" /> IT102 - Programming 1</label><br />
                        <label><input type="checkbox" /> IT103 - Web Development</label>
                    </div>
                </div>
            </div>

            {/* Summary and Enroll */}
            <div className="mt-6 flex justify-end">
                <button className="bg-blue-600 text-white px-6 py-2 rounded">Confirm Enrollment</button>
            </div>

        </DashboardLayout>
    )
}

export default Enrollment
