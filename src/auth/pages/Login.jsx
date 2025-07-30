
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { RegisterContext } from "@/auth/contexts/RegisterContext"
import ForgotPassword from './ForgotPassword'
const Login = () => {

    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);

    const { registerData, setRegisterData } = useContext(RegisterContext);

    const navigate = useNavigate()


    const checkUser = async () => {

        console.log(login, password)
    }


    useEffect(() => {
        console.log(login, password)
    }, [login, password])


    const handleButton = async (e) => {
        e.preventDefault(); // Prevent htmlForm submission reload
        setLoading(true);

        try {
            const response = await axios.post('https://server.laravel.bpc-bsis4d.com/public/api/login', {
                login: login,
                password: password,
            }, {
                headers: {
                    'Accept': 'application/json',

                },
            });

            //set data to context   
            const data = response.data



            if (data.isSuccess) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))

                await Swal.fire({
                    title: "Account Matched!",
                    icon: "success",
                    draggable: true
                });

                console.log("WHAWAHAWH: ", data.user);
                setRegisterData(data.user)

                if (data.user.user_type === "admin") {
                    navigate('/admin_dashboard')

                    Swal.fire({
                        title: "Welcome Admin!",
                        text: "You have successfully logged in as an admin.",
                        icon: "warning",
                        confirmButtonText: "OK"
                    });


                } else if (data.user.user_type === "student") {
                    navigate('/student_dashboard')

                    //change this modal
                    Swal.fire({
                        title: "Welcome Student!",
                        text: "You have successfully logged in as a student.",
                        icon: "success",
                        confirmButtonText: "OK"
                    });
                }
                else {
                    navigate('/')
                    Swal.fire({
                        title: "Access Denied!",
                        text: "You do not have permission to access this area.",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                }


            } else {
                await Swal.fire({
                    title: "Invalid Credentials!",
                    icon: "error",
                    draggable: true
                });
            }

        } catch (err) {
            await Swal.fire({
                title: "Incorrect Credentials!",
                icon: "error",
                draggable: true
            });
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };
    return (

        <div className='grid h-screen md:grid-cols-2'>
            {showForgotPassword ? (<ForgotPassword setShowForgotPassword={setShowForgotPassword} />) : (
                <div data-aos="fade-down" className="shadow-lg mx-auto max-w-screen-xl px-4 mt-2 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-lg text-center flex flex-col items-center">
                        <h1 className="text-2xl font-bold sm:text-3xl">SNL Virtual Partner</h1>
                        <img src="/logo.png" alt="" className='size-20' />
                        <p className="mt-4 ">
                            Welcome to our enrollment system. Please log in to access your account.
                        </p>
                    </div>

                    <form className="mx-auto mb-0 mt-8 max-w-md space-y-4" action="#">
                        <div>
                            <label className="sr-only" htmlFor="username">username or email</label>
                            <div className="relative">
                                <input
                                    onChange={(e) => setLogin(e.target.value)}
                                    placeholder="Enter your username"
                                    className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                                    id="username"
                                    type="text"
                                />
                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="h-6 w-6 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                            strokeWidth="2"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                        ></path>
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="sr-only" htmlFor="password">Password</label>
                            <div className="relative">
                                <input
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                                    id="password"
                                    type="password"
                                />
                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="h-6 w-6 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            strokeWidth="2"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                        ></path>
                                        <path
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            strokeWidth="2"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                        ></path>
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col items-center space-y-3">
                            <button
                                type="button"
                                onClick={() => {
                                    window.location.href = 'https://server.laravel.bpc-bsis4d.com/public/api/login/google';
                                }}
                                className="hover:cursor-pointer w-full max-w-md flex items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                            >
                                <img src="/google.png" alt="Google" className="h-5 w-5" />
                                <span>Continue with Google</span>
                            </button>


                            <button
                                onClick={() => window.open(
                                    'https://server.laravel.bpc-bsis4d.com/public/api/auth/github/redirect',
                                    '_self'
                                )}
                                className="hover:cursor-pointer w-full max-w-md flex items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                            >
                                <img src="/github.png" alt="github" className="  h-5 w-5" />
                                <span>Continue with Github</span>

                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                No account yet?
                                <Link to={"/register"} className="underline text-blue-500"><br />New Applicant(Freshman, transferee)</Link>
                            </p>

                            <p className="text-sm text-gray-600">
                                Get your Account here
                                <Link onClick={() => setShowForgotPassword(!showForgotPassword)} className="underline text-blue-500"><br />forgot password?</Link>
                            </p>

                        </div>
                        <button onClick={handleButton}
                            className="inline-block rounded-lg hover:cursor-pointer hover:scale-95 bg-purple-600 px-5 mt-4 py-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            )}

            {/* right */}
            <img src="/bg.jpg" alt="boy" className='md:h-screen hidden md:block' />

        </div>


    )
}

export default Login
