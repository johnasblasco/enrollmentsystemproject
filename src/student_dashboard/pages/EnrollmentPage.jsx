import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { CalendarClock } from 'lucide-react';

const EnrollmentPage = () => {
    return (
        <DashboardLayout>
            <div className="flex flex-col items-center justify-center h-full py-20 text-center space-y-6">
                <CalendarClock className="text-blue-500 w-16 h-16" />
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Enrollment Period Not Yet Started
                </h1>
                <p className="text-gray-600 max-w-md">
                    Please check back later. The enrollment schedule will be announced soon.
                </p>
            </div>
        </DashboardLayout>
    );
};

export default EnrollmentPage;
