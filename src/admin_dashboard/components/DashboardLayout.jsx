import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import {
    LayoutDashboard,
    Users,
    Settings,
    FileSpreadsheet,
    Menu,
    House,
    MessageCircleQuestionMark,
} from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { RegisterContext } from "@/auth/contexts/RegisterContext";

const AdminDashboardLayout = ({ children }) => {

    const { registerData } = useContext(RegisterContext);

    const navigate = useNavigate()
    const location = useLocation()

    const [menuOpen, setMenuOpen] = useState(false)
    const [collapsed, setCollapsed] = useState(() => {
        const saved = localStorage.getItem('adminSidebarCollapsed')
        return saved === 'true'
    })

    const [section, setSection] = useState("admin_dashboard")

    useEffect(() => {
        localStorage.setItem('adminSidebarCollapsed', collapsed)
    }, [collapsed])

    useEffect(() => {
        const path = location.pathname
        if (path.startsWith("/admin_dashboard/users")) {
            setSection("admin_dashboard > users")
        } else if (path.startsWith("/admin_dashboard/enrollments")) {
            setSection("admin_dashboard > enrollments")
        } else if (path.startsWith("/admin_dashboard/settings")) {
            setSection("admin_dashboard > settings")
        } else if (path.startsWith("/admin_dashboard/help")) {
            setSection("admin_dashboard > help")
        } else {
            setSection("admin_dashboard")
        }
    }, [location.pathname])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/')
    }

    return (
        <div className="flex">
            <aside className={`fixed top-0 left-0 bottom-0 h-screen bg-gray-900 text-white flex flex-col p-4 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
                <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} mb-6`}>
                    <h2 className={`text-2xl font-bold transition-opacity duration-200 ${collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                        Admin Panel
                    </h2>
                    <Menu className="cursor-pointer" onClick={() => setCollapsed(!collapsed)} />
                </div>

                <nav className="flex flex-col gap-3 flex-grow text-sm">
                    <Link to="/admin_dashboard" className="hover:bg-neutral-50 hover:text-neutral-900 p-2 rounded flex items-center gap-2">
                        <LayoutDashboard size={20} />
                        {!collapsed && "Dashboard"}
                    </Link>
                    <Link to="/admin_dashboard/admissions" className="hover:bg-neutral-50 hover:text-neutral-900 p-2 rounded flex items-center gap-2">
                        <Users size={20} />
                        {!collapsed && "Manage Admissions"}
                    </Link>
                    <Link to="/admin_dashboard/enrollments" className="hover:bg-neutral-50 hover:text-neutral-900 p-2 rounded flex items-center gap-2">
                        <FileSpreadsheet size={20} />
                        {!collapsed && "Enrollments"}
                    </Link>
                    <Link to="/admin_dashboard/settings" className="hover:bg-neutral-50 hover:text-neutral-900 p-2 rounded flex items-center gap-2">
                        <Settings size={20} />
                        {!collapsed && "Settings"}
                    </Link>
                    <Link to="/admin_dashboard/help" className="hover:bg-neutral-50 hover:text-neutral-900 p-2 rounded flex items-center gap-2">
                        <MessageCircleQuestionMark size={20} />
                        {!collapsed && "Help"}
                    </Link>
                </nav>
            </aside>

            <div className={`transition-all duration-300 flex-1 flex flex-col min-h-screen bg-gray-50 ${collapsed ? 'ml-20' : 'ml-64'}`}>
                <header className={`z-0 text-white fixed left-0 right-0 h-16 bg-gray-900 shadow flex items-center ${!collapsed ? 'justify-end-safe' : 'justify-between'} px-6 z-40`} style={{ marginLeft: collapsed ? '5rem' : '16rem' }}>
                    {collapsed && <h1 className="font-bold text-xl">Admin Panel</h1>}
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
                            <DropdownMenuLabel>{registerData?.surname || "Admin"}</DropdownMenuLabel>
                            <DropdownMenuItem className="hover:cursor-pointer">Profile</DropdownMenuItem>
                            <DropdownMenuItem className="hover:cursor-pointer" onClick={handleLogout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>

                {menuOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => setMenuOpen(false)}
                    />
                )}

                <main className="mt-20 p-6 overflow-auto flex-1">
                    <div className="mb-10 p-4 bg-neutral-300 flex gap-2">
                        <House size={20} /> <h1 className="text-sm font-semibold">{section}</h1>
                    </div>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AdminDashboardLayout
