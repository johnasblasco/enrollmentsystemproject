import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterContext } from '@/auth/contexts/RegisterContext';

const OauthCallback = () => {
    const navigate = useNavigate();
    const { setRegisterData } = useContext(RegisterContext); // ✅ Access context

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const user = JSON.parse(decodeURIComponent(params.get('user')));

        if (token && user) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            setRegisterData(user); // ✅ Store in global context
            console.log("User data set in context:", user);
            navigate('/dashboard');
        } else {
            navigate('/');
        }
    }, []);

    return <p className="text-center mt-10">Redirecting, please wait...</p>;
};

export default OauthCallback;
