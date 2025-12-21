import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import bgImage from '../assets/register-page/room-interior-design.jpg';

const Login = () => {
    const { signInUser, signInWithGoogle } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        setLoading(true);
        signInUser(email, password)
            .then(result => {
                //console.log(result.user);
                toast.success('Sign in successful!');
                navigate(location?.state ? location.state : '/');
            })
            .catch(() => {
                toast.error('Sign in failed. Please check your credentials.');
            })
            .finally(() => setLoading(false));
    };

    const handleGoogleSignIn = () => {
        setLoading(true);
        signInWithGoogle()
            .then(result => {
                //console.log(result.user);
                navigate(location?.state ? location.state : '/');
            })
            .catch(() => {
                toast.error('Google sign in failed');
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Toaster 
                position="top-center"
                toastOptions={{
                    error: {
                        style: {
                            background: '#fee2e2',
                            color: '#991b1b',
                        },
                    },
                }}
            />
            <div className="card-bg w-full mx-auto max-w-sm shrink-0 shadow-lg">
                <div className="card-body">
                    <h1 className="text-3xl font-bold text-green-700">Sign In</h1>
                    
                    <form onSubmit={handleLogin}>
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="input input-bordered w-full"
                                placeholder="Email"
                                required
                            />
                            
                            <label className="label mt-4">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="input input-bordered w-full"
                                    placeholder="Password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="btn btn-xs absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            
                            <div className="mt-2">
                                <Link to="/forgot-password" className="link link-hover text-green-600">
                                    Forgot password?
                                </Link>
                            </div>
                            
                            <button type="submit" className="btn-primary mt-4 w-full" disabled={loading}>
                                {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Sign In'}
                            </button>
                        </fieldset>
                    </form>

                    <div className="divider">OR</div>

                    <button
                        onClick={handleGoogleSignIn}
                        className="btn-secondary w-full flex items-center justify-center gap-2"
                        disabled={loading}
                    >
                        {loading ? <span className="loading loading-spinner loading-sm"></span> : <><FcGoogle className="text-xl" />Sign in with Google</>}
                    </button>

                    <p className="text-center mt-4">
                        Don't have an account?{' '}
                        <Link to="/signup" state={location?.state} className="text-blue-500 hover:text-blue-800">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
