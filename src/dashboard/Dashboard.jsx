import DashboardLayout from "./components/DashboardLayout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const DashboardHome = () => {
    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold mb-6">📊 Dashboard Overview</h1>
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Students</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">1,230</p>
                        <p className="text-sm text-muted-foreground">+12 this week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Enrolled Today</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">58</p>
                        <p className="text-sm text-muted-foreground">+8 from yesterday</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Pending Admissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">24</p>
                        <p className="text-sm text-muted-foreground">Review required</p>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}

export default DashboardHome
