import DashboardLayout from '../../../components/DashboardLayout';
import { useEffect, useState } from "react"
import axios from "axios"
import { Mail, Trash2, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui/pagination"

const AdmittedAccounts = () => {

    const [loadingId, setLoadingId] = useState(null)

    const [users, setUsers] = useState([])

    const [selectedUsers, setSelectedUsers] = useState([])
    const [selectAll, setSelectAll] = useState(false)
    const [loading, setLoading] = useState(true)

    const [searchTerm, setSearchTerm] = useState("")
    const [filters, setFilters] = useState({ status: "", campus: "", program: "" })

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [statusFilter, setStatusFilter] = useState("all");




    const fetchUsers = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`https://server.laravel.bpc-bsis4d.com/public/api/getadmissions?page=${page}`)
            if (res.data.isSuccess) {
                setUsers(res.data.admissions)
                setTotalPages(res.data.pagination.last_page)
            }
        } catch (err) {
            console.error("Failed to fetch users:", err)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => { fetchUsers() }, [page])

    const handleSendEmail = async () => {
        const token = localStorage.getItem("token");

        const approvedUsers = users.filter(user => user.status === "approved");

        if (approvedUsers.length === 0) {
            alert("⚠️ No approved users to email.");
            return;
        }

        const emailBody = approvedUsers.map(user =>
            `• ${user.first_name} ${user.last_name} - ${user.email}`
        ).join('\n');

        try {
            const res = await axios.post(
                `https://server.laravel.bpc-bsis4d.com/public/api/send-email`,
                {
                    subject: "Approved Admissions",
                    body: emailBody,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (res.data.isSuccess) {
                alert("✅ Emails sent to approved users.");
            } else {
                alert("⚠️ Failed to send emails.");
            }
        } catch (err) {
            console.error(err);
            alert("❌ Error sending emails.");
        }
    };


    const handleApprove = async (id) => {
        const token = localStorage.getItem("token");
        setLoadingId(id); // Show loading on this user only

        try {
            const res = await axios.post(
                `https://server.laravel.bpc-bsis4d.com/public/api/acceptadmission/${id}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.isSuccess) {
                setUsers(prev =>
                    prev.map(user => user.id === id ? { ...user, status: "approved" } : user)
                );
                alert("✅ Applicant approved.");
            } else {
                alert("⚠️ Failed to approve applicant.");
            }
        } catch (err) {
            console.error(err);
            alert("❌ Something went wrong.");
        } finally {
            setLoadingId(null); // Reset loading
        }
    };


    const handleSelectUser = (id) => {
        setSelectedUsers(prev => prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id])
    }

    const handleSelectAll = () => {
        setSelectedUsers(selectAll ? [] : users.map(u => u.id))
        setSelectAll(!selectAll)
    }

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this user?")) {
            setUsers(users.filter(user => user.id !== id))
            setSelectedUsers(selectedUsers.filter(uid => uid !== id))
        }
    }

    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" ? true : user.status === statusFilter;
        const matchesCampus = filters.campus ? user.school_campus === filters.campus : true;
        const matchesProgram = filters.program ? user.academic_program === filters.program : true;

        return matchesSearch && matchesStatus && matchesCampus && matchesProgram;
    });


    return (
        <DashboardLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold">Admitted Accounts</h1>
                <div className="flex flex-wrap items-center justify-between my-10 gap-4">
                    <div className="w-full md:w-auto flex items-center gap-4 flex-wrap">
                        {/* Filters here */}
                        <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search users..." />
                        <Select onValueChange={setStatusFilter} defaultValue="all">
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>



                    <Button onClick={handleSendEmail}><Mail size={16} /> Send Email</Button>
                </div>

                {loading ? <p>Loading...</p> : (
                    <div className="overflow-x-auto w-full">

                        <table className="min-w-full bg-white rounded shadow text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="p-2">
                                        <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                                    </th>
                                    <th className='p-2'>Applicant Number</th>
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Email</th>
                                    <th className="p-2">Status</th>
                                    <th className="p-2">Campus</th>
                                    <th className="p-2">Program</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(user => (
                                    <Drawer key={user.id}>
                                        <DrawerTrigger asChild>
                                            <tr className="border-b hover:bg-gray-50 cursor-pointer">
                                                <td className="p-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedUsers.includes(user.id)}
                                                        onChange={() => handleSelectUser(user.id)}
                                                        onClick={(e) => e.stopPropagation()} // Prevent drawer opening when checkbox is clicked
                                                    />
                                                </td>
                                                <td className="p-2">{user.applicant_number}</td>
                                                <td className="p-2">{user.first_name} {user.middle_name} {user.last_name}</td>
                                                <td className="p-2">{user.email}</td>
                                                <td className="p-2 capitalize">
                                                    <span className={`font-semibold ${user.status === 'approved' ? 'text-green-600' : 'text-yellow-600'}`}>
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td className="p-2">{user.school_campus}</td>
                                                <td className="p-2">{user.academic_program || 'N/A'}</td>
                                            </tr>
                                        </DrawerTrigger>

                                        <DrawerContent>
                                            <DrawerHeader className="items-center text-center">
                                                <DrawerTitle className="text-xl font-bold">Applicant Information</DrawerTitle>
                                                <DrawerDescription>Full profile of the selected applicant</DrawerDescription>
                                            </DrawerHeader>


                                            <div className="overflow-y-auto max-h-[60vh] px-6 pb-6 text-sm">
                                                <div className="flex flex-wrap gap-6 justify-center">
                                                    {[
                                                        { label: 'Full Name', value: `${user.first_name} ${user.middle_name} ${user.last_name} ${user.suffix ? `(${user.suffix})` : ''}` },
                                                        { label: 'Applicant Number', value: user.applicant_number },
                                                        { label: 'Email', value: user.email },
                                                        { label: 'Contact No.', value: user.contact_number || 'N/A' },
                                                        { label: 'Gender', value: user.gender },
                                                        { label: 'Birthdate', value: user.birthdate?.split(' ')[0] },
                                                        { label: 'Birthplace', value: user.birthplace },
                                                        { label: 'Civil Status', value: user.civil_status },
                                                        { label: 'Address', value: `${user.barangay}, ${user.city}, ${user.province}` },
                                                        { label: 'Nationality', value: user.nationality },
                                                        { label: 'Religion', value: user.religion },
                                                        { label: 'Ethnic Affiliation', value: user.ethnic_affiliation || 'None' },
                                                        { label: '4Ps Member', value: user.is_4ps_member },
                                                        { label: 'Vaccinated', value: user.is_vaccinated },
                                                        { label: 'Insurance Member', value: user.is_insurance_member },
                                                        { label: 'Indigenous?', value: user.is_indigenous },
                                                        { label: 'LRN', value: user.lrn },
                                                        { label: 'Last School Attended', value: user.last_school_attended },
                                                        { label: 'Remarks', value: user.remarks || 'None' },
                                                        {
                                                            label: 'Status',
                                                            value: (
                                                                <span className={`font-semibold capitalize ${user.status === 'approved' ? 'text-green-600' : 'text-yellow-600'}`}>
                                                                    {user.status}
                                                                </span>
                                                            )
                                                        }
                                                    ].map(({ label, value }) => (
                                                        <div key={label} className="w-full md:w-[45%]">
                                                            <p className="text-muted-foreground mb-1">{label}</p>
                                                            <p className="font-medium break-words">{value}</p>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* ACTION BUTTONS */}
                                                <DrawerFooter className="flex flex-col gap-2 px-0 mt-6">
                                                    <Button
                                                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                                                        onClick={() => handleApprove(user.id)}
                                                        disabled={loadingId === user.id}
                                                    >
                                                        {loadingId === user.id ? (
                                                            <>Processing...</>
                                                        ) : (
                                                            <>
                                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                                Accept Applicant
                                                            </>
                                                        )}
                                                    </Button>

                                                    <Button
                                                        className="w-full bg-red-600 hover:bg-red-700 text-white"
                                                        onClick={() => handleApprove(user.id)}
                                                        disabled={loadingId === user.id}
                                                    >
                                                        {loadingId === user.id ? (
                                                            <>Processing...</>
                                                        ) : (
                                                            <>
                                                                <XCircle className="mr-2 h-4 w-4" />
                                                                Decline Applicant
                                                            </>
                                                        )}
                                                    </Button>

                                                </DrawerFooter>
                                            </div>

                                            {/* ACTION BUTTONS */}

                                        </DrawerContent>

                                    </Drawer>
                                ))}

                            </tbody>
                        </table>

                        {/* Pagination */}
                        <Pagination className="mt-4">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious className={"hover:cursor-pointer hover:bg-neutral-300"} onClick={() => setPage(prev => Math.max(prev - 1, 1))} />
                                </PaginationItem>
                                <PaginationItem>
                                    Page {page} of {totalPages}
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext className={"hover:cursor-pointer hover:bg-neutral-300"} onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default AdmittedAccounts
