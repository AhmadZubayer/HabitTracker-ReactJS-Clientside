import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { use } from 'react';
import { AuthContext } from '../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import bgImage from '../assets/register-page/room-interior-design.jpg';

const Signup = () => {
    const { createUser, signInWithGoogle, updateUserProfile } = use(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSignup = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;
        const terms = form.terms.checked;

     
        if (!terms) {
            toast.error('Please accept our terms & conditions');
            return;
        }


        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
        if (!passwordPattern.test(password)) {
            toast.error('Password must be at least 6 characters and include uppercase, lowercase, and a special character');
            return;
        }

        setLoading(true);
        createUser(email, password)
            .then(result => {
                const profile = {
                    displayName: name,
                    photoURL: photoURL
                };
                
                updateProfile(result.user, profile)
                    .then(() => {
                        //console.log('Profile updated');
                     
                        result.user.reload().then(() => {
                            updateUserProfile(); // Force context update
                            toast.success('Account created successfully!');
                            form.reset();
                            navigate(location?.state ? location.state : '/');
                        });
                    })
                    .catch(err => {
                        console.error(err);
                        toast.error('Error updating profile');
                    });
            })
            .catch(err => {
                console.error('ERROR OCCURRED! ', err.message);
                toast.error('Sign up failed');
            })
            .finally(() => setLoading(false));
    };

    const handleGoogleSignIn = () => {
        setLoading(true);
        signInWithGoogle()
            .then(result => {
                //console.log(result.user);
                toast.success('Signed up with Google successfully!');
                navigate(location?.state ? location.state : '/');
            })
            .catch(() => {
                toast.error('Google sign-up failed');
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
                    <h1 className="text-3xl font-bold text-green-700">Sign Up</h1>
                    
                    <form onSubmit={handleSignup}>
                        <fieldset className="fieldset">
                            <label className="label">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="input input-bordered w-full"
                                placeholder="Your Name"
                                required
                            />
                            
                            <label className="label mt-4">Photo URL</label>
                            <input
                                type="text"
                                name="photoURL"
                                className="input input-bordered w-full"
                                placeholder="Photo URL"
                                required
                            />
                            
                            <label className="label mt-4">Email</label>
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
                            
                            <div className="mt-4">
                                <label className="label cursor-pointer justify-start gap-2">
                                    <input
                                        type="checkbox"
                                        name="terms"
                                        className="checkbox checkbox-sm"
                                    />
                                    <span className="label-text">Accept Our Terms and Conditions</span>
                                </label>
                            </div>
                            
                            <button type="submit" className="btn-primary mt-4 w-full" disabled={loading}>
                                {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Sign Up'}
                            </button>
                        </fieldset>
                    </form>

                    <div className="divider">OR</div>

                    <button
                        onClick={handleGoogleSignIn}
                        className="btn-secondary w-full flex items-center justify-center gap-2"
                        disabled={loading}
                    >
                        {loading ? <span className="loading loading-spinner loading-sm"></span> : <><FcGoogle className="text-xl" />Sign up with Google</>}
                    </button>

                    <p className="text-center mt-4">
                        Already have an account?{' '}
                        <Link to="/login" state={location?.state} className="text-blue-400 underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
