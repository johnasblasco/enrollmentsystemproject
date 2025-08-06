import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import {
    Menu,
    House,
    LayoutDashboard,
    Users,
    UserCheck,
    BookOpenText,
    HandCoins,
    CreditCard,
    ScrollText,
    GraduationCap,
    Settings,
    LifeBuoy
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { RegisterContext } from "@/auth/contexts/RegisterContext"

const AdminDashboardLayout = ({ children }) => {
    const { registerData } = useContext(RegisterContext)
    const navigate = useNavigate()
    const location = useLocation()

    const [menuOpen, setMenuOpen] = useState(false)
    const [collapsed, setCollapsed] = useState(() => {
        const saved = localStorage.getItem("adminSidebarCollapsed")
        return saved === "true"
    })

    const [section, setSection] = useState([{ label: "dashboard", path: "/admin_dashboard" }])

    const isActive = (path) => location.pathname === path

    const getLinkClass = (path) =>
        `p-2 rounded flex items-center gap-2 transition-colors ${isActive(path)
            ? "bg-white text-neutral-900 "
            : "hover:bg-neutral-50 hover:text-neutral-900"
        }`

    useEffect(() => {
        localStorage.setItem("adminSidebarCollapsed", collapsed)
    }, [collapsed])

    useEffect(() => {
        const path = location.pathname
        const breadcrumbs = [{ label: "dashboard", path: "/admin_dashboard" }]

        const routeMap = [
            { path: "/admin_dashboard/admissions", label: "admissions" },
            { path: "/admin_dashboard/registrar", label: "registrar" },
            { path: "/admin_dashboard/programs", label: "programs" },
            { path: "/admin_dashboard/schedule", label: "schedule" },
            { path: "/admin_dashboard/enrollment-period", label: "enrollment period" },
            { path: "/admin_dashboard/user-management", label: "user management" },
            { path: "/admin_dashboard/settings", label: "settings" }
        ]

        for (const route of routeMap) {
            if (path.startsWith(route.path)) {
                breadcrumbs.push({ label: route.label, path: route.path })
            }
        }

        setSection(breadcrumbs)
    }, [location.pathname])

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/")
    }

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 bottom-0 h-screen bg-blue-500 text-white flex flex-col p-4 transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}>
                <div className={`flex items-center ${collapsed ? "justify-center border-b-2" : "justify-between border-b-2 pb-4"} border-white mb-6`}>
                    <h2 className={`text-2xl font-bold transition-opacity duration-200 ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}>
                        SNL University
                    </h2>
                    <Menu className="cursor-pointer" onClick={() => setCollapsed(!collapsed)} />
                </div>

                <nav className="space-y-1">
                    <Link to="/admin_dashboard" className={getLinkClass("/admin_dashboard")}>
                        <LayoutDashboard size={20} />
                        {!collapsed && "Dashboard"}
                    </Link>
                    <Link to="/admin_dashboard/admissions" className={getLinkClass("/admin_dashboard/admissions")}>
                        <Users size={20} />
                        {!collapsed && "Admissions"}
                    </Link>

                    <Link to="/admin_dashboard/registrar" className={getLinkClass("/admin_dashboard/registrar")}>
                        <BookOpenText size={20} />
                        {!collapsed && "Registrar"}
                    </Link>
                    <Link to="/admin_dashboard/accounting" className={getLinkClass("/admin_dashboard/accounting")}>
                        <HandCoins size={20} />
                        {!collapsed && "Accounting"}
                    </Link>
                    <Link to="/admin_dashboard/cashier" className={getLinkClass("/admin_dashboard/cashier")}>
                        <CreditCard size={20} />
                        {!collapsed && "Cashier"}
                    </Link>
                    <Link to="/admin_dashboard/enrollment" className={getLinkClass("/admin_dashboard/enrollment")}>
                        <ScrollText size={20} />
                        {!collapsed && "Enrollment"}
                    </Link>
                    <Link to="/admin_dashboard/academics" className={getLinkClass("/admin_dashboard/academics")}>
                        <GraduationCap size={20} />
                        {!collapsed && "Academics"}
                    </Link>
                    <Link to="/admin_dashboard/settings" className={getLinkClass("/admin_dashboard/settings")}>
                        <Settings size={20} />
                        {!collapsed && "Settings"}
                    </Link>
                    <Link to="/admin_dashboard/help" className={getLinkClass("/admin_dashboard/help")}>
                        <LifeBuoy size={20} />
                        {!collapsed && "Help"}
                    </Link>
                </nav>
            </aside>

            {/* Main layout */}
            <div className={`transition-all duration-300 flex-1 flex flex-col min-h-screen bg-gray-50 ${collapsed ? "ml-20" : "ml-64"}`}>
                <header
                    className={`text-white fixed left-0 right-0 h-16 bg-blue-500 shadow flex items-center justify-between px-6 z-40`}
                    style={{ marginLeft: collapsed ? "5rem" : "16rem" }}
                >
                    {collapsed && <h1 className="font-bold text-xl">SNL University</h1>}

                    <div className="flex items-center gap-4 ml-auto">
                        {/* 📅 Calendar Date */}
                        <span className="text-sm font-medium text-white">
                            {new Date().toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>

                        {/* 🔔 Notifications */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className="relative focus:outline-none">
                                <div className="relative hover:opacity-80 transition cursor-pointer">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405C18.79 14.79 18 13.42 18 12V8a6 6 0 00-12 0v4c0 1.42-.79 2.79-1.595 3.595L3 17h5m7 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                    <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full" />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-64 bg-white shadow-lg text-black">
                                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-sm text-muted-foreground">🎉 New student approved</DropdownMenuItem>
                                <DropdownMenuItem className="text-sm text-muted-foreground">📢 Schedule update posted</DropdownMenuItem>
                                <DropdownMenuItem className="text-sm text-muted-foreground">📨 2 unread inquiries</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* 👤 Avatar & Dropdown */}
                        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel>{registerData?.surname || "Admin"}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="hover:cursor-pointer">Profile</DropdownMenuItem>
                                <DropdownMenuItem className="hover:cursor-pointer" onClick={handleLogout}>
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>


                {menuOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setMenuOpen(false)} />}

                <main className="mt-20 p-6 overflow-auto flex-1">
                    <div className="mb-10 p-4 bg-blue-100 flex gap-2 items-center text-sm font-semibold">
                        <House size={20} />
                        {section.map((item, index) => (
                            <span key={index} className="flex items-center gap-2">
                                {index > 0 && <span>{">"}</span>}
                                <span
                                    className="text-neutral-700 hover:underline cursor-pointer"
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
