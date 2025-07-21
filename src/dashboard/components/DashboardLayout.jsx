import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const DashboardLayout = ({ children }) => {
    return (
        <div className="md:h-screen hidden md:flex">
            {/* Sidebar */}
            <aside className="md:w-64 bg-gray-900 text-white flex flex-col p-4">
                <h2 className="text-2xl font-bold mb-6">EnrollmentSys</h2>
                <nav className="flex flex-col gap-3 flex-grow">
                    <Link to="/dashboard" className="hover:bg-gray-800 p-2 rounded">
                        📊 Dashboard
                    </Link>
                    <Link to="/dashboard/admission" className="hover:bg-gray-800 p-2 rounded">
                        📝 Admissions
                    </Link>
                    <Link to="/dashboard/enrollment" className="hover:bg-gray-800 p-2 rounded">
                        📚 Enrollments
                    </Link>
                </nav>
                <Button variant="secondary" className="mt-auto">
                    Logout
                </Button>
            </aside>

            {/* Main content */}
            <main className="flex-1 bg-gray-50 p-6 overflow-auto">
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout
