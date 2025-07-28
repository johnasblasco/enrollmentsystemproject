import React from 'react';
import { MessageCircleQuestion } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const HelpPage = () => {
    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center mb-10">
                    <MessageCircleQuestion className="mx-auto w-12 h-12 text-purple-600" />
                    <h1 className="text-3xl font-bold mt-4">Need Help?</h1>
                    <p className="text-gray-600 mt-2">Below are answers to common questions and ways to get support.</p>
                </div>

                <div className="space-y-6">
                    <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
                        <h2 className="font-semibold text-lg text-gray-800">📌 How do I submit my admission form?</h2>
                        <p className="text-gray-600 mt-2">
                            Go to the Registration page and fill out the required personal and academic information.
                        </p>
                    </div>

                    <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
                        <h2 className="font-semibold text-lg text-gray-800">📌 When does enrollment start?</h2>
                        <p className="text-gray-600 mt-2">
                            Enrollment dates will be posted on the dashboard and announced via email.
                        </p>
                    </div>

                    <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
                        <h2 className="font-semibold text-lg text-gray-800">📌 Who can I contact for support?</h2>
                        <p className="text-gray-600 mt-2">
                            You can reach out to the registrar's office at <a href="mailto:support@snl.edu.ph" className="text-purple-600 underline">support@snl.edu.ph</a>.
                        </p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default HelpPage;
