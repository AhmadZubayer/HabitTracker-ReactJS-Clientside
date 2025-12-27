import React, { use, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
  const { createUser, signInWithGoogle, updateUserProfile, user } = use(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate('/my-habits');
    }
  }, [user, navigate]);

  const validatePassword = (password) => {
    const minLength = password.length >= 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    if (!minLength) {
      return 'Password must be at least 6 characters long';
    }
    if (!hasUppercase) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!hasLowercase) {
      return 'Password must contain at least one lowercase letter';
    }
    return null;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    setLoading(true);
    createUser(email, password)
      .then((result) => {
        const profile = {
          displayName: name,
          photoURL: photoURL
        };
        
        updateProfile(result.user, profile)
          .then(() => {
            result.user.reload().then(() => {
              updateUserProfile(); // Force context update
              toast.success('Account created successfully!');
              form.reset();
              navigate(location?.state ? location.state : '/');
            });
          })
          .catch((err) => {
            console.error(err);
            toast.error('Error updating profile');
          });
      })
      .catch((err) => {
        console.error('ERROR OCCURRED! ', err.message);
        toast.error('Sign up failed');
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleSignup = () => {
    setLoading(true);
    signInWithGoogle()
      .then(() => {
        toast.success('Signed up with Google successfully!');
        navigate(location?.state ? location.state : '/');
      })
      .catch(() => {
        toast.error('Google sign-up failed');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1085F1]/10 to-[#8129F1]/10 overflow-x-hidden" style={{ paddingTop: '48px', paddingBottom: '48px', paddingLeft: '12px', paddingRight: '12px' }}>
      <div className="card-bg w-full shrink-0 shadow-2xl rounded-2xl" style={{ maxWidth: '448px', margin: '0 auto' }}>
        <div className="card-body p-8">
          <h1 className="text-4xl font-bold text-[#1085F1] mb-2 text-center">Sign Up</h1>
          <p className="text-gray-600 text-center mb-6">Create your account to start building habits</p>
          
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="label font-semibold text-gray-700">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1085F1] transition-all"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <label className="label font-semibold text-gray-700">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="photoURL"
                className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1085F1] transition-all"
                placeholder="Enter photo URL"
                required
              />
            </div>
            
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
              {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Create Account'}
            </button>
          </form>

          <div className="divider my-6 text-gray-500">OR</div>

          <button
            onClick={handleGoogleSignup}
            className="btn-secondary w-full flex items-center justify-center gap-3 rounded-xl py-3 font-semibold"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner loading-sm"></span> : <><FcGoogle className="text-2xl" />Sign up with Google</>}
          </button>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <Link to="/login" state={location?.state} className="text-[#1085F1] hover:text-[#0d6ec4] font-semibold transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
