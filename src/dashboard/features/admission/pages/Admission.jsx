import React from 'react'
import DashboardLayout from '@/dashboard/components/DashboardLayout'
import FormField from '../components/Form/FormFields'
import SchoolCampus from '../components/dropdowns/SchoolCampus'
import AcademicYear from '../components/dropdowns/AcademicYear'
import ApplicationType from '../components/dropdowns/ApplicationType'
import Classifications from '../components/dropdowns/Classifications'
import AcademicProgram from '../components/dropdowns/AcademicProgram'
import SeparatorOne from '../components/separator/SeparatorOne'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const Admission = () => {
    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold mb-2 text-gray-800">📝 Admission Form</h1>

            <section className="flex justify-start w-full">
                <div className="bg-white rounded-xl shadow-lg p-8 w-full  border border-gray-200">

                    <form className="flex flex-col gap-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField label="School Campus">
                                <SchoolCampus />
                            </FormField>

                            <FormField label="Academic Year">
                                <AcademicYear />
                            </FormField>

                            <FormField label="Application Type">
                                <ApplicationType />
                            </FormField>

                            <FormField label="Classifications">
                                <Classifications />
                            </FormField>

                            <div className="md:col-span-2">
                                <SeparatorOne />
                            </div>

                            <FormField label="Academic Program">
                                <AcademicProgram />
                            </FormField>
                        </div>

                        <div className="flex justify-between pt-4">
                            <Link
                                to="/dashboard"
                                className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Previous
                            </Link>
                            <Link
                                to="/dashboard/enrollment"
                                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Next
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </form>
                </div>
            </section>
        </DashboardLayout>
    )
}

export default Admission
