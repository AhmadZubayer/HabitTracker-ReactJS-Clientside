import React, { use, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const { signInUser, signInWithGoogle, user } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/my-habits');
    }
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);
    signInUser(email, password)
      .then(() => {
        toast.success('Sign in successful!');
        navigate(location?.state ? location.state : '/');
      })
      .catch(() => {
        toast.error('Sign in failed. Please check your credentials.');
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    signInWithGoogle()
      .then(() => {
        toast.success('Sign in successful!');
        navigate(location?.state ? location.state : '/');
      })
      .catch(() => {
        toast.error('Google sign in failed');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1085F1]/10 to-[#8129F1]/10 overflow-x-hidden" style={{ paddingTop: '48px', paddingBottom: '48px', paddingLeft: '12px', paddingRight: '12px' }}>
      <div className="card-bg w-full shrink-0 shadow-2xl rounded-2xl" style={{ maxWidth: '448px', margin: '0 auto' }}>
        <div className="card-body p-8">
          <h1 className="text-4xl font-bold text-[#1085F1] mb-2 text-center">Sign In</h1>
          <p className="text-gray-600 text-center mb-6">Welcome back! Please login to your account</p>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="label font-semibold text-gray-700">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1085F1] transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <label className="label font-semibold text-gray-700">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1085F1] transition-all pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>
            
            <button type="submit" className="btn-primary w-full rounded-xl py-3 font-semibold text-lg mt-6" disabled={loading}>
              {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Sign In'}
            </button>
          </form>

          <div className="divider my-6 text-gray-500">OR</div>

          <button
            onClick={handleGoogleLogin}
            className="btn-secondary w-full flex items-center justify-center gap-3 rounded-xl py-3 font-semibold"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner loading-sm"></span> : <><FcGoogle className="text-2xl" />Sign in with Google</>}
          </button>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" state={location?.state} className="text-[#1085F1] hover:text-[#0d6ec4] font-semibold transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
