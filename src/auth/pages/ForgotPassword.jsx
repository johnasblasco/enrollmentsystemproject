import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ForgotPassword = ({ setShowForgotPassword }) => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://server.laravel.bpc-bsis4d.com/public/api/forgot-password', {
                email: email,
            }, {
                headers: {
                    'Accept': 'application/json',
                }
            });

            const data = response.data;

            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Reset Link Sent!',
                    text: 'Please check your email.',
                });
                navigate('/login');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message || 'Something went wrong.',
                });
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: 'Unable to send reset link.',
            });
        }
    };

    return (
        <section data-aos="fade-down" className='flex flex-col items-center gap-24 min-h-screen px-4'>

            <div className='flex flex-col items-center gap-2'>

                <h1 className="text-2xl font-bold sm:text-3xl">SNL Virtual Partner</h1>
                <img src="/logo.png" alt="" className='size-20' />
                <p className="mt-4 text-center">
                    Forgot your password? Enter your email to receive a reset link below.
                </p>
            </div>
            <Card className='w-full max-w-md p-6'>
                <CardHeader>
                    <CardTitle className="text-center text-xl">Forgot Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}

                        />
                        <Button type="submit" className="w-full">Send Reset Link</Button>
                    </form>
                    <div className="mt-4 text-center">
                        <Button
                            variant="ghost"
                            type="button"
                            onClick={() => setShowForgotPassword(false)}
                        >
                            Back to Login
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};

export default ForgotPassword;
