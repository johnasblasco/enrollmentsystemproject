import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import {
    LayoutDashboard,
    Users,
    Settings,
    FileSpreadsheet,
    FileText,
    CalendarDays,
    BookOpenText,
    School,
    MessageCircleQuestionMark,
    Menu,
    House,
} from 'lucide-react';

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

    const [section, setSection] = useState([
        { label: "dashboard", path: "/admin_dashboard" },
    ]);

    useEffect(() => {
        localStorage.setItem('adminSidebarCollapsed', collapsed)
    }, [collapsed])

    useEffect(() => {
        const path = location.pathname;
        const breadcrumbs = [{ label: "dashboard", path: "/admin_dashboard" }];

        const routeMap = [
            { path: "/admin_dashboard/admissions", label: "admissions" },
            { path: "/admin_dashboard/admissions/admitted-accounts", label: "admitted accounts" },
            { path: "/admin_dashboard/registrar", label: "registrar" },
            { path: "/admin_dashboard/accounting", label: "accounting" },
            { path: "/admin_dashboard/cashier", label: "cashier" },
            { path: "/admin_dashboard/enrollment", label: "enrollment" },
            { path: "/admin_dashboard/academics", label: "academics" },
            { path: "/admin_dashboard/settings", label: "settings" },
            { path: "/admin_dashboard/help", label: "help" },
        ];

        for (const route of routeMap) {
            if (path.startsWith(route.path)) {
                breadcrumbs.push({ label: route.label, path: route.path });
            }
        }

        setSection(breadcrumbs);
    }, [location.pathname]);



    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/')
    }

    return (
        <div className="flex">
            <aside className={`fixed top-0 left-0 bottom-0 h-screen bg-blue-500 text-white flex flex-col p-4 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
                <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} mb-6`}>
                    <h2 className={`text-2xl font-bold transition-opacity duration-200 ${collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                        SNL University
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
                        {!collapsed && "Admissions"}
                    </Link>

                    <Link to="/admin_dashboard/registrar" className="hover:bg-neutral-50 hover:text-neutral-900 p-2 rounded flex items-center gap-2">
                        <BookOpenText size={20} />
                        {!collapsed && "Registrar"}
                    </Link>

                    <Link to="/admin_dashboard/accounting" className="hover:bg-neutral-50 hover:text-neutral-900 p-2 rounded flex items-center gap-2">
                        <FileText size={20} />
                        {!collapsed && "Accounting"}
                    </Link>

                    <Link to="/admin_dashboard/cashier" className="hover:bg-neutral-50 hover:text-neutral-900 p-2 rounded flex items-center gap-2">
                        <FileSpreadsheet size={20} />
                        {!collapsed && "Cashier"}
                    </Link>

                    <Link to="/admin_dashboard/enrollment" className="hover:bg-neutral-50 hover:text-neutral-900 p-2 rounded flex items-center gap-2">
                        <CalendarDays size={20} />
                        {!collapsed && "Enrollments"}
                    </Link>

                    <Link to="/admin_dashboard/academic" className="hover:bg-neutral-50 hover:text-neutral-900 p-2 rounded flex items-center gap-2">
                        <School size={20} />
                        {!collapsed && "Academics"}
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
                <header className={`z-0 text-white fixed left-0 right-0 h-16 bg-blue-500 shadow flex items-center ${!collapsed ? 'justify-end-safe' : 'justify-between'} px-6 z-40`} style={{ marginLeft: collapsed ? '5rem' : '16rem' }}>
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
                    <div className="mb-10 p-4 bg-neutral-300 flex gap-2 items-center text-sm font-semibold">
                        <House size={20} />
                        {section.map((item, index) => (
                            <span key={index} className="flex items-center gap-2">
                                {index > 0 && <span>{'>'}</span>}
                                <span
                                    className="text-blue-700 hover:underline cursor-pointer"
                                    onClick={() => navigate(item.path)}
                                >
                                    {item.label}
                                </span>
                            </span>
                        ))}
                    </div>

                    {children}
                </main>
            </div>
        </div>
    )
}

export default AdminDashboardLayout
