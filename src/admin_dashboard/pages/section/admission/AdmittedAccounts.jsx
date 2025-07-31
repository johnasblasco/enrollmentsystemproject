
import DashboardLayout from '../../../components/DashboardLayout';
import { useEffect, useState } from "react"
import axios from "axios"
import { Mail, Trash2, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Swal from "sweetalert2"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogHeader,
    DialogFooter,
} from "@/components/ui/dialog"


const AdmittedAccounts = () => {

    const [emailModalOpen, setEmailModalOpen] = useState(false)
    const [customMessage, setCustomMessage] = useState("Please click the link below to begin your examination.")

    const [subject, setSubject] = useState("Entrance Exam Invitation");


    //dropdown menu state
    const [position, setPosition] = useState("bottom");



    const handleSendEmail = () => {
        if (selectedUsers.length === 0) {
            alert("No users selected.")
            return
        }
        setEmailModalOpen(true)
    }
    const sendCustomizedEmails = async () => {
        const recipients = users.filter(user => selectedUsers.includes(user.id));
        const emailList = recipients.map(user => user.email);
        const token = localStorage.getItem("token"); // or however you're storing the auth token

        try {
            const response = await axios.post("https://server.laravel.bpc-bsis4d.com/public/api/sendemail", {
                emails: emailList,
                custom_message: customMessage,
                subject: subject,
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );

            if (response.data.isSuccess) {
                alert("✅ Emails sent successfully!");
            } else {
                alert("⚠️ Some emails failed: " + response.data.failed.join(", "));
            }

            setEmailModalOpen(false);
        } catch (err) {
            console.error("Error sending emails:", err);
            alert("❌ Failed to send emails.");
        }
    };



    const [users, setUsers] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    const [selectAll, setSelectAll] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('https://server.laravel.bpc-bsis4d.com/public/api/getadmissions')
                console.log("API COLLECTION : ", res.data)
                if (res.data.isSuccess) {
                    setUsers(res.data.admissions)
                }
            } catch (err) {
                console.error("Failed to fetch users:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    // Handle checkbox changes
    const handleSelectUser = (id) => {
        if (selectedUsers.includes(id)) {
            setSelectedUsers(selectedUsers.filter(userId => userId !== id))
        } else {
            setSelectedUsers([...selectedUsers, id])
        }
    }

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedUsers([])
        } else {
            const allIds = users.map(user => user.id)
            setSelectedUsers(allIds)
        }
        setSelectAll(!selectAll)
    }

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this user?")) return
        try {
            // await axios.delete(`https://your-api-url.com/api/admissions/${id}`) // Uncomment if real
            setUsers(users.filter(user => user.id !== id))
            setSelectedUsers(selectedUsers.filter(userId => userId !== id))
        } catch (error) {
            console.error("Delete failed:", error)
        }
    }

    return (
        <DashboardLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold">Admitted Accounts</h1>
                <div className="flex items-center justify-between my-10">
                    <div className="w-full flex items-center gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Filter</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="start">
                                <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                                <DropdownMenuGroup>


                                    {/* STATUS */}
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <DropdownMenuItem>Approved</DropdownMenuItem>
                                                <DropdownMenuItem>Pending</DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>


                                    {/* College Campus  */}
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>College Campus</DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <DropdownMenuItem>Main Campus</DropdownMenuItem>
                                                <DropdownMenuItem>Hagonoy Campus</DropdownMenuItem>
                                                <DropdownMenuItem>Calumpit Campus</DropdownMenuItem>
                                                <DropdownMenuItem>Hagonoy Campus</DropdownMenuItem>
                                                <DropdownMenuItem>Paombong Campus</DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>

                                    {/* Academic Program    */}
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>Academic Program</DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <DropdownMenuItem>BSIT</DropdownMenuItem>
                                                <DropdownMenuItem>BSIS</DropdownMenuItem>
                                                <DropdownMenuItem>BSCS</DropdownMenuItem>
                                                <DropdownMenuItem>BSN</DropdownMenuItem>
                                                <DropdownMenuItem>BTS YOTBA</DropdownMenuItem>
                                                <DropdownMenuItem>BEED</DropdownMenuItem>
                                                <DropdownMenuItem>BSBA</DropdownMenuItem>
                                                <DropdownMenuItem>BSC</DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>


                                </DropdownMenuGroup>

                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Input type="text" placeholder="Search users..." className="w-1/3" />
                    </div>
                    <button
                        onClick={handleSendEmail}
                        className="md:w-36 flex hover:cursor-pointer items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                    >
                        <Mail size={16} /> Send Email
                    </button>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded shadow">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="p-2">
                                        <input
                                            type="checkbox"
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                        />
                                    </th>
                                    <th className='p-2'>Applicant Number</th>
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Email</th>
                                    <th className="p-2">Status</th>
                                    <th className="p-2">Campus</th>
                                    <th className="p-2">Program</th>
                                    <th className="p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id} className="border-b hover:bg-gray-50">

                                        <td className="p-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.includes(user.id)}
                                                onChange={() => handleSelectUser(user.id)}
                                            />
                                        </td>
                                        <td className="p-2">
                                            {user.applicant_number}
                                        </td>
                                        <td className="p-2">
                                            {user.first_name} {user.middle_name} {user.last_name}
                                        </td>
                                        <td className="p-2">{user.email}</td>
                                        <td className="p-2 capitalize">
                                            <span className={`font-semibold ${user.status === 'approved' ? 'text-green-600' : 'text-yellow-600'}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="p-2">{user.school_campus}</td>
                                        <td className="p-2">
                                            {user.academic_program ? user.academic_program : 'N/A'}
                                        </td>
                                        <td className="p-2 flex gap-2">
                                            <button className="text-blue-600 hover:underline" title="View">
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                className="text-red-600 hover:underline"
                                                onClick={() => handleDelete(user.id)}
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {/* DIALOG IF SEND EMAIL */}
                <Dialog open={emailModalOpen} onOpenChange={setEmailModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Customize Email Content</DialogTitle>
                        </DialogHeader>

                        <div className="flex flex-col gap-4">

                            <div className="mt-2">
                                <label htmlFor="subject">Subject</label>
                                <Input
                                    id="subject"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="e.g., Entrance Exam Schedule"
                                />
                            </div>
                            <label>
                                Message Body:
                                <textarea
                                    className="w-full p-2 border rounded"
                                    rows="5"
                                    value={customMessage}
                                    onChange={(e) => setCustomMessage(e.target.value)}
                                />
                            </label>
                        </div>

                        <DialogFooter>
                            <Button onClick={sendCustomizedEmails}>Send Now</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
        </DashboardLayout>
    )
}

export default AdmittedAccounts
