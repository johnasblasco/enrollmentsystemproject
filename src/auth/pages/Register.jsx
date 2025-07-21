import React from 'react'
import { Link } from 'react-router-dom'
import SchoolCampus from '../components/register/dropdowns/SchoolCampus'
import ApplicationType from '../components/register/dropdowns/ApplicationType'
import AcademicYear from '../components/register/dropdowns/AcademicYear'
import AcademicProgram from '../components/register/dropdowns/AcademicProgram'
import SeparatorOne from '../components/separator/SeparatorOne'
import Classifications from '../components/register/dropdowns/Classifications'
const Register = () => {
  return (
    <div>
      <section className='flex flex-col gap-4 justify-center items-center h-screen'>

        <form className='flex flex-col gap-8 justify-center items-center border-2 w-fit py-10 md:p-20 '>

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
            <Link to={"/"} className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400">Previous</Link>
            <Link to={"/register/personal-information"} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Next</Link>
          </div>
        </form>

      </section>
    </div>
  )
}

export default Register
