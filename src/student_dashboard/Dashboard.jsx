import DashboardLayout from "./components/DashboardLayout"
import Admission from "./features/admission/pages/Admission"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useEffect, useState, useContext } from "react"

const DashboardHome = () => {

    return (
        <DashboardLayout>
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
