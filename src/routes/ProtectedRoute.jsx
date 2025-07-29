import { useAdmission } from '../globalContexts/AdmissionContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {


    return children;
};

export default ProtectedRoute;
