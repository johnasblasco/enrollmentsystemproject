
import axios from 'axios'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
const Verified = () => {

    const [verificationInput, setVerificationInput] = useState('');
    const navigate = useNavigate();

    const handleVerification = async (e) => {
        e.preventDefault();

        const response = await axios.post('https://server.laravel.bpc-bsis4d.com/public/api/verifyaccount', {
            verification_code: verificationInput
        }, {
            headers: {
                'Accept': 'application/json',

            },
        });

        const data = response.data;
        console.log(data);

        if (data.isSuccess) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            await Swal.fire({
                title: "Account Verified!",
                icon: "success",
                draggable: true
            });
            navigate('/');
        }
    }

    return (
        <section className='flex flex-col items-center justify-center h-screen'>

            <form className='bg-neutral-100 p-6 rounded-lg shadow-md w-full max-w-md space-y-4'>
                <h1>Input Verification here</h1>
                <input onChange={e => setVerificationInput(e.target.value)} type="text" className='border-2 rounded-md w-full mx-4' />

                <button onClick={handleVerification}>SUBMIT</button>
            </form>

        </section>
    )
}

export default Verified
