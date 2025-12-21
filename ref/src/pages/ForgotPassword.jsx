import React, { useState } from 'react';
import { Link } from 'react-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../authentication/firebase.init';
import toast, { Toaster } from 'react-hot-toast';
import bgImage from '../assets/register-page/room-interior-design.jpg';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = (e) => {
        e.preventDefault();

        setLoading(true);
        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success('Password reset email sent! Check your inbox.');
                setEmail('');
            })
            .catch((err) => {
                toast.error(err.message);
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
                    <h1 className="text-3xl font-bold text-green-700">Forgot Password</h1>
                    <p className="text-gray-600 mb-4">Enter your email to receive a password reset link</p>

                    <form onSubmit={handleResetPassword}>
                        <fieldset className="fieldset">
                            <label className="label">
                                <span className="label-text font-semibold">Email</span>
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                                required
                            />
                        </fieldset>

                        <div className="form-control mt-6 flex items-center">
                            <button type="submit" className="btn-primary mx-auto" disabled={loading}>
                                {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Reset Password'}
                            </button>
                        </div>
                    </form>

                    <p className="text-center mt-4">
                        Remember your password?{' '}
                        <Link to="/login" className="link text-green-700 font-semibold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
