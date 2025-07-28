// src/pages/OAuthCallback.jsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OAuthCallback2 = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');
        const user = searchParams.get('user');

        if (token && user) {
            // Save token and user in localStorage or context
            localStorage.setItem('token', token);
            localStorage.setItem('user', user);

            navigate('/dashboard'); // or whatever your route is
        } else {
            navigate('/login'); // fallback if something went wrong
        }
    }, [navigate, searchParams]);

    return <div className="text-center p-10">Logging in via GitHub...</div>;
};

export default OAuthCallback2;
