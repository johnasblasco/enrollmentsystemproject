import { useAdmission } from '../globalContexts/AdmissionContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { admissionData } = useAdmission();

    // Just a basic check, you can expand this logic
    if (!admissionData || !admissionData.school_campus) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
