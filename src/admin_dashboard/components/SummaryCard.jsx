import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Briefcase, BookOpen } from "lucide-react"

const SummaryCard = ({ title, icon, total, breakdown }) => (
    <Card className="w-full max-w-sm shadow-sm rounded-xl border mb-10">
        <CardContent className="p-4">
            <div className="flex justify-evenly items-start mb-3">
                <div>
                    <h3 className="text-base font-medium text-gray-800">{title}</h3>
                    <p className="text-xl font-bold mt-1 tracking-wider">{total}</p>
                </div>
                <div className="text-blue-500">{icon}</div>
            </div>
            <div className="flex justify-around gap-4 text-xs text-neutral-600 ">
                {breakdown.map((item, idx) => (
                    <div key={idx}>
                        <span className="font-medium">{item.label}</span>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
)

export default function DashboardSummary() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SummaryCard
                title="Total Students"
                icon={<GraduationCap size={102} />}
                total="---"
                breakdown={[
                    { label: "1st Year" },
                    { label: "2nd Year" },
                    { label: "3rd Year" },
                    { label: "4th Year" },
                ]}
            />
            <SummaryCard
                title="Total Employees"
                icon={<Briefcase size={96} />}
                total="---"
                breakdown={[
                    { label: "Faculty" },
                    { label: "Administrator" },
                    { label: "Dean" },
                    { label: "Others" },
                ]}
            />
            <SummaryCard
                title="Total Programs"
                icon={<BookOpen size={96} />}
                total="---"
                breakdown={[
                    { label: "Active" },
                    { label: "Suspended" },
                    { label: "Abolished" },
                ]}
            />
        </div>
    )
}
