import React from 'react'
import FormField from '../components/Form/FormFields'
import SchoolCampus from '../components/dropdowns/SchoolCampus'
import AcademicYear from '../components/dropdowns/AcademicYear'
import ApplicationType from '../components/dropdowns/ApplicationType'
import Classifications from '../components/dropdowns/Classifications'
import AcademicProgram from '../components/dropdowns/AcademicProgram'
import SeparatorOne from '../components/separator/SeparatorOne'
import { Link } from 'react-router-dom'

const RegisterOne = () => {
  return (
    <section className="flex flex-col gap-4 justify-center items-center py-16">
      <form className="w-full max-w-4xl border border-gray-200 rounded-lg p-10 bg-white shadow-md space-y-6">
        <h1 className="text-3xl font-semibold text-center my-4 text-purple-600">
          Enrollment Application
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        {/* Buttons */}
        <div className="flex justify-between pt-4 w-full">
          <Link
            to="/"
            className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Previous
          </Link>
          <Link
            to="/register/personal-information"
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Next
          </Link>
        </div>
      </form>
    </section>
  )
}

export default RegisterOne
