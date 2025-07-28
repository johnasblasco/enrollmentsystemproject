import React, { useContext } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { AlertTriangle } from 'lucide-react';
import { RegisterContext } from '@/auth/contexts/RegisterContext'; // adjust path if needed

const AdmissionPage = () => {
    const { registerData } = useContext(RegisterContext);

    const fullName = `${registerData?.given_name || ''} ${registerData?.middle_name || ''} ${registerData?.surname || ''} ${registerData?.suffix || ''}`;

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto px-6 py-12">
                {registerData?.is_admitted === 'false' ? (
                    <div className="flex flex-col items-center text-center space-y-6">
                        <AlertTriangle className="text-yellow-500 w-16 h-16" />
                        <h1 className="text-2xl font-bold text-gray-800">Admission Not Yet Accepted</h1>
                        <p className="text-gray-600 max-w-md">
                            We haven’t accepted your admission form yet. Below is your submitted information. Kindly wait for approval.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left bg-white p-6 rounded-xl shadow-md mt-6 border border-gray-200">
                            <div><span className="font-semibold">Full Name:</span> {fullName}</div>
                            <div><span className="font-semibold">Date of Birth:</span> {registerData.date_of_birth}</div>
                            <div><span className="font-semibold">Gender:</span> {registerData.gender}</div>
                            <div><span className="font-semibold">Civil Status:</span> {registerData.civil_status}</div>
                            <div><span className="font-semibold">Address:</span> {registerData.street_address}, {registerData.barangay}, {registerData.city}, {registerData.province}</div>
                            <div><span className="font-semibold">Nationality:</span> {registerData.nationality}</div>
                            <div><span className="font-semibold">Religion:</span> {registerData.religion}</div>
                            <div><span className="font-semibold">Mobile:</span> {registerData.mobile_number}</div>
                            <div><span className="font-semibold">Email:</span> {registerData.email}</div>
                            <div><span className="font-semibold">4Ps Member:</span> {registerData.is_4ps_member === '1' ? 'Yes' : 'No'}</div>
                            <div><span className="font-semibold">Vaccinated:</span> {registerData.is_vaccinated === '1' ? 'Yes' : 'No'}</div>
                        </div>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 mt-8">
                            Update My Admission
                        </button>
                    </div>
                ) : (
                    <p className="text-center text-green-600 font-semibold">Your admission has been accepted!</p>
                )}
            </div>
        </DashboardLayout>
    );
};

export default AdmissionPage;
