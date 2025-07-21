import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

const DashboardLayout = ({ children }) => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/')
    }

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className="hidden fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white md:flex flex-col p-4">
                <h2 className="text-2xl font-bold mb-6">MAIN MENU</h2>
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

                <Button
                    variant="secondary"
                    className="mt-auto hover:cursor-pointer"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </aside>

            {/* Main content area */}
            <div className="md:ml-64 flex-1 flex flex-col min-h-screen bg-gray-50">
                {/* Top header */}
                <header className="fixed md:ml-64 left-0 right-0 h-16 bg-white shadow flex items-center justify-between px-6">
                    <h1 className="text-xl font-semibold">Enrollment System</h1>
                    <div className="flex items-center gap-4">
                        {/* You can replace the img src with your profile pic URL */}
                        <img
                            src="https://via.placeholder.com/40"
                            alt="Profile"
                            className="w-10 h-10 rounded-full border hover:cursor-pointer"
                        />
                    </div>
                </header>

                {/* Main scrollable content */}
                <main className="my-20 md:my-14 p-6 overflow-auto flex-1">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout
