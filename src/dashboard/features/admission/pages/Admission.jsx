import React from 'react'
import DashboardLayout from '@/dashboard/components/DashboardLayout'
import SchoolCampus from '../components/dropdowns/SchoolCampus'
import AcademicYear from '../components/dropdowns/AcademicYear'
import ApplicationType from '../components/dropdowns/ApplicationType'
import Classifications from '../components/dropdowns/Classifications'
import AcademicProgram from '../components/dropdowns/AcademicProgram'
import SeparatorOne from '../components/separator/SeparatorOne'
import { Link } from 'react-router-dom'

const Admission = () => {
    return (
        <DashboardLayout>
            <section className="flex flex-col gap-4 justify-center items-center">
                <form className="flex flex-col gap-8 justify-center items-center border-2 w-fit py-10 md:p-20">
                    <div className="grid grid-cols-1 gap-4">
                        <SchoolCampus />
                        <AcademicYear />
                        <ApplicationType />
                        <Classifications />
                        <SeparatorOne />
                        <AcademicProgram />
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between pt-4 w-full">
                        <Link
                            to="/dashboard/admission"
                            className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Previous
                        </Link>
                        <Link
                            to="/dashboard/admission"
                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Next
                        </Link>
                    </div>
                </form>
            </section>
        </DashboardLayout>
    )
}

export default Admission
