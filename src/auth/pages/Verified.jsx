import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Verified = () => {
    const [verificationInput, setVerificationInput] = useState('');
    const navigate = useNavigate();

    const handleVerification = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://server.laravel.bpc-bsis4d.com/public/api/verifyaccount', {
                verification_code: verificationInput
            }, {
                headers: { 'Accept': 'application/json' },
            });

            const data = response.data;
            console.log(data);

            if (data.isSuccess) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                await Swal.fire({
                    title: "Account Verified!",
                    icon: "success",
                    confirmButtonColor: '#3085d6',
                });
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Verification Failed',
                text: 'Please check your OTP code.',
                icon: 'error',
            });
        }
    }

    return (
        <section className='flex flex-col items-center justify-center min-h-screen px-4'>
            <Card className="w-full max-w-md p-6">
                <CardHeader>
                    <CardTitle className="text-center text-xl">Verify Your Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleVerification} className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Enter verification code"
                            value={verificationInput || ''}  // fallback to '' just in case
                            onChange={e => setVerificationInput(e.target.value)}
                        />
                        <Button type="submit" className="w-full">Submit</Button>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
};

export default Verified;
