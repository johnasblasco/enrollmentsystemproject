import DashboardLayout from "./components/DashboardLayout"
import Admission from "./features/admission/pages/Admission"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useEffect, useState, useContext } from "react"
import { DashboardChart } from "./components/DashboardChart"
import DashboardSummary from "./components/SummaryCard"
const DashboardHome = () => {

    return (
        <DashboardLayout>
            <DashboardSummary />
            <DashboardChart />
        </DashboardLayout>
    )
}

export default DashboardHome
