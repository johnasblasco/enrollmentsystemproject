import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import FormField from '../components/Form/FormFields';
import SchoolCampus from '../components/dropdowns/SchoolCampus';
import AcademicYear from '../components/dropdowns/AcademicYear';
import ApplicationType from '../components/dropdowns/ApplicationType';
import Classifications from '../components/dropdowns/Classifications';
import AcademicProgram from '../components/dropdowns/AcademicProgram';
import SeparatorOne from '../components/separator/SeparatorOne';
import { Link } from 'react-router-dom';
import { AdmissionContext } from '@/globalContexts/AdmissionContext';
import swal from 'sweetalert2'
const Admission = ({ onAdmit }) => {
    const { admissionData, setAdmissionData } = useContext(AdmissionContext);
    const [nextPage, setNextPage] = useState(false);

    const testData = () => {
        console.log("Admission Data:", admissionData);
        setNextPage(true);
    };



    return (
        <div className="fixed top-[-50px]">
            <h1 className="text-3xl font-bold">📋 Admission Management</h1>

            {!nextPage && (
                <section className="flex flex-col gap-4 justify-center items-center py-16">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setNextPage(true); // go to second page
                        }}
                        className="w-full md:max-w-5xl border border-gray-200 rounded-lg p-10 bg-white shadow-md space-y-6">

                        <h2 className="text-2xl font-bold">📄 Admission Form</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="School Campus">
                                <SchoolCampus
                                    value={admissionData.school_campus}
                                    onChange={(value) => setAdmissionData({ ...admissionData, school_campus: value })}
                                />
                            </FormField>
                            <FormField label="Academic Year">
                                <AcademicYear
                                    value={admissionData.academic_year}
                                    onChange={(value) => setAdmissionData({ ...admissionData, academic_year: value })}
                                />
                            </FormField>
                            <FormField label="Application Type">
                                <ApplicationType
                                    value={admissionData.application_type}
                                    onChange={(value) => setAdmissionData({ ...admissionData, application_type: value })}
                                />
                            </FormField>
                            <FormField label="Classifications">
                                <Classifications
                                    value={admissionData.classification}
                                    onChange={(value) =>
                                        setAdmissionData({ ...admissionData, classification: value })
                                    }
                                    gradeLevel={admissionData.grade_level}
                                    onGradeChange={(value) =>
                                        setAdmissionData({ ...admissionData, grade_level: value })
                                    }
                                />
                            </FormField>
                            <div className="md:col-span-2">
                                <SeparatorOne />
                            </div>
                            <FormField label="Academic Program">
                                <AcademicProgram
                                    value={admissionData.academic_program}
                                    onChange={(value) => setAdmissionData({ ...admissionData, academic_program: value })}
                                />
                            </FormField>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between pt-4 w-full">
                            <Link
                                to="/dashboard"
                                className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Previous
                            </Link>
                            <button
                                type="button"
                                onClick={testData}
                                className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                            >
                                Next
                            </button>
                        </div>
                    </form>
                </section>
            )}

            {/* ➤ Displayed only after "Next" is clicked */}
            {nextPage && (
                <section className="max-h-[108vh] overflow-y-auto rounded-3xl p-4 flex flex-col gap-4 justify-center items-center py-16 ">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            console.log("Submitting data:", admissionData);

                            const token = localStorage.getItem("token");

                            axios.post(
                                'https://server.laravel.bpc-bsis4d.com/public/api/applyadmission',
                                admissionData,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                        'Content-Type': 'multipart/form-data', // if sending files!
                                    },
                                }
                            )
                                .then(() => {
                                    swal.fire({
                                        title: "Success!",
                                        text: "Your admission data has been submitted.",
                                        icon: "success",
                                        confirmButtonText: "OK"
                                    });

                                })
                                .catch((error) => {
                                    console.error("Submission failed:", error.response?.data || error.message);
                                });
                        }}
                        className="w-full md:min-w-5xl border border-gray-200 rounded-lg p-10 bg-white shadow-md space-y-6 overflow-y-auto">
                        <h2 className="text-2xl font-bold">📄 Last School & Requirements</h2>

                        <div className="space-y-4 ">
                            <div>
                                <input
                                    type="text"
                                    placeholder='Last School Attended'
                                    className="w-full border border-gray-300 rounded p-2 mt-1"
                                    value={admissionData.last_school_attended || ''}
                                    onChange={(e) =>
                                        setAdmissionData({ ...admissionData, last_school_attended: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <label className="font-medium">Remarks</label>
                                <textarea
                                    className="w-full border border-gray-300 rounded p-2 mt-1"
                                    value={admissionData.remarks || ''}
                                    onChange={(e) =>
                                        setAdmissionData({ ...admissionData, remarks: e.target.value })
                                    }
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Form 137">
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.png"
                                        onChange={(e) => setAdmissionData({ ...admissionData, form137: e.target.files[0] })}
                                        className="border border-gray-300 p-2 rounded w-full"
                                    />
                                </FormField>

                                <FormField label="Form 138">
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.png"
                                        onChange={(e) => setAdmissionData({ ...admissionData, form138: e.target.files[0] })}
                                        className="border border-gray-300 p-2 rounded w-full"
                                    />
                                </FormField>

                                <FormField label="Birth Certificate">
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.png"
                                        onChange={(e) => setAdmissionData({ ...admissionData, birth_certificate: e.target.files[0] })}
                                        className="border border-gray-300 p-2 rounded w-full"
                                    />
                                </FormField>

                                <FormField label="Good Moral Certificate">
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.png"
                                        onChange={(e) => setAdmissionData({ ...admissionData, good_moral: e.target.files[0] })}
                                        className="border border-gray-300 p-2 rounded w-full"
                                    />
                                </FormField>

                                <FormField label="Certificate of Completion">
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.png"
                                        onChange={(e) => setAdmissionData({ ...admissionData, certificate_of_completion: e.target.files[0] })}
                                        className="border border-gray-300 p-2 rounded w-full"
                                    />
                                </FormField>
                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between pt-4">
                            <button
                                type="button"
                                onClick={() => setNextPage(false)}
                                className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Back
                            </button>
                            <button
                                onClick={() => onAdmit()}
                                type="submit"
                                className="hover: cursor-pointer px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </section>
            )}
        </div>
    );
};

export default Admission;
