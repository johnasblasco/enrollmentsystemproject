import { createContext, useContext, useState } from 'react';

export const AdmissionContext = createContext();

export const AdmissionProvider = ({ children }) => {
    const [admissionData, setAdmissionData] = useState({

        form137: null,
        form138: null,
        birth_certificate: null,
        good_moral: null,
        certificate_of_completion: null,
    });

    return (
        <AdmissionContext.Provider value={{ admissionData, setAdmissionData }}>
            {children}
        </AdmissionContext.Provider>
    );
};

export const useAdmission = () => useContext(AdmissionContext);
