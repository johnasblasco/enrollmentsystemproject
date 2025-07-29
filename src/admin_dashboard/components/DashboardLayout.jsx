import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { LayoutDashboard, BookMarked, BookUser, Menu, House, MessageCircleQuestionMark, ChevronDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { RegisterContext } from "@/auth/contexts/RegisterContext";



const DashboardLayout = ({ children }) => {

    const { registerData } = useContext(RegisterContext);



    const navigate = useNavigate()
    const location = useLocation()

    const [menuOpen, setMenuOpen] = useState(false)

    const [collapsed, setCollapsed] = useState(() => {
        // ✅ Load from localStorage on mount
        const saved = localStorage.getItem('sidebarCollapsed')
        return saved === 'true'
    })
    const [section, setSection] = useState("dashboard")

    // ✅ Save whenever collapsed changes
    useEffect(() => {
        localStorage.setItem('sidebarCollapsed', collapsed)
    }, [collapsed])


    useEffect(() => {
        const path = location.pathname
        if (path.startsWith("/student_dashboard/admission")) {
            setSection("student_dashboard > admission")
        } else if (path.startsWith("/student_dashboard/enrollment")) {
            setSection("student_dashboard > enrollment")
        } else if (path.startsWith("/student_dashboard/help")) {
            setSection("student_dashboard > help")
        }
        else {
            setSection("student_dashboard")
        }
    }, [location.pathname])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/')
    }

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-screen bg-gray-900 text-white flex flex-col p-4 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
                {/* Logo and Menu */}
                <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'}  mb-6`}>
                    <h2 className={`text-2xl font-bold transition-opacity duration-200 ${collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                        SNL University
                    </h2>
                    <Menu
                        className="cursor-pointer"
                        onClick={() => setCollapsed(!collapsed)}
                    />
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-3 flex-grow text-sm">

                    <Link to="/student_dashboard" className="hover:bg-neutral-50 hover:text-neutral-900 p-2 rounded flex items-center gap-2">
                        <LayoutDashboard size={20} />
                        {!collapsed && "student_dashboard"}
                    </Link>
                    <Link to="/student_dashboard/admission" className="hover:bg-neutral-50 hover:text-neutral-900 p-2 rounded flex items-center gap-2">
                        <BookMarked size={20} />
                        {!collapsed && "Admissions"}
                    </Link>

                    <Link to="/student_dashboard/enrollment" className="hover:bg-neutral-50 hover:text-neutral-900 p-2 rounded flex items-center gap-2">
                        <BookUser size={20} />
                        {!collapsed && "Enrollments"}
                    </Link>
                    <Link to="/student_dashboard/help" className="hover:bg-neutral-50 hover:text-neutral-900 p-2 rounded flex items-center gap-2">
                        <MessageCircleQuestionMark size={20} />
                        {!collapsed && "Help"}
                    </Link>

                </nav>

            </aside>

            {/* Main Content */}
            <div className={`transition-all duration-300 flex-1 flex flex-col min-h-screen bg-gray-50 ${collapsed ? 'ml-20' : 'ml-64'}`}>
                {/* Header */}


                <header className={`z-0 text-white fixed left-0 right-0 h-16 bg-gray-900 shadow flex items-center ${!collapsed ? 'justify-end-safe' : 'justify-between'} px-6 z-40`} style={{ marginLeft: collapsed ? '5rem' : '16rem' }}>
                    {collapsed && <h1 className="font-bold text-xl">SNL University</h1>}
                    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                        <DropdownMenuTrigger>
                            <img
                                src="https://via.placeholder.com/40"
                                alt="Profile"
                                className="mr-6 w-10 h-10 rounded-full border hover:cursor-pointer"
                            />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="relative right-16 w-46">
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>{registerData.surname}</DropdownMenuLabel>
                            <DropdownMenuItem className={"hover:cursor-pointer"}>Profile</DropdownMenuItem>
                            <DropdownMenuItem className={"hover:cursor-pointer"} onClick={handleLogout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </header>



                {/* Overlay when menu is open */}
                {menuOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => setMenuOpen(false)}
                    />
                )}
                {/* Main content */}
                <main className="mt-20 p-6 overflow-auto flex-1">
                    <div className="mb-10 p-4 bg-neutral-300 flex gap-2">
                        <House size={20}></House> <h1 className="text-sm font-semibold">{section}</h1>
                    </div>
                    {children}
                </main>
            </div>
        </div >
    )
}

export default DashboardLayout
