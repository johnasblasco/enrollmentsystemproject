import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OauthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const user = JSON.parse(decodeURIComponent(params.get('user')));

        if (token && user) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/dashboard'); // Redirect after storing
        } else {
            navigate('/'); // Fallback
        }
    }, []);

    return <p className="text-center mt-10">Redirecting, please wait...</p>;
};

export default OauthCallback;
