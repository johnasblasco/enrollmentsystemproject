import DashboardLayout from "./components/DashboardLayout"
import Admission from "./features/admission/pages/Admission"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useEffect, useState, useContext } from "react"

import { RegisterContext } from "@/auth/contexts/RegisterContext"
const DashboardHome = () => {

    const { registerData } = useContext(RegisterContext);
    const [isAdmitted, setIsAdmitted] = useState(registerData.isAdmitted || false);



    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold mb-6">📊 Dashboard Overview</h1>
            {!isAdmitted && (
                <div className="fixed z-100  bottom-0 left-0 right-0 w-full h-screen flex items-center justify-center bg-neutral-500/50">
                    <Admission onAdmit={() => setIsAdmitted(true)} />

                </div>
            )}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Enrolled Units</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">1,230</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>GWA This Semester</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">58</p>
                        <p className="text-sm text-muted-foreground">+8 from yesterday</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Outstanding Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">11,224</p>
                        <p className="text-sm text-muted-foreground">+12 this week</p>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}

export default DashboardHome
