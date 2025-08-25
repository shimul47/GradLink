import React, { use, useState } from 'react';
import { Link } from 'react-router';
import { Eye, EyeOff, Mail, User, Lock, ArrowRight, GraduationCap } from 'lucide-react';
import { AuthContext } from '../Contexts/AuthContext';
import { toast } from 'react-toastify';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const SignUp = () => {
  const { setUser, updateUser, createUser } = use(AuthContext);

  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const axiosSecure = useAxiosSecure()


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Password validation
    const passwordValidation = /(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordValidation.test(formData.password)) {
      setErrorMessage("Password must contain at least one uppercase, one lowercase letter and be at least 6 characters long.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      // Firebase sign up
      const result = await createUser(formData.email, formData.password);
      const user = result.user;

      //  Update Firebase profile
      await updateUser({ displayName: formData.name });

      // Prepare user data for backend
      const userData = {
        uid: user.uid,
        name: formData.name,
        email: formData.email,
        userType: formData.userType,
        createdAt: new Date().toISOString(),
      };

      //. Save user in backend
      const res = await axiosSecure.post('/users', userData);

      if (res.data.insertedId || res.data.acknowledged) {
        console.log("User saved successfully");
      }

      // Update Context
      setUser({ ...user, displayName: formData.name, userType: formData.userType });
      toast.success("Account created & saved successfully!");
    } catch (error) {
      console.error("Signup Error:", error.message);
      setErrorMessage(error.message);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-950 to-slate-800">
      <div className="card w-full max-w-md shadow-2xl bg-base-100 bg-opacity-90 backdrop-blur-sm z-10">
        <div className="card-body p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Sign Up Now!</h1>
            <p className="text-gray-600 mt-2">
              Join the BRAC University community
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="input input-bordered w-full pl-10"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@bracu.ac.bd"
                  className="input input-bordered w-full pl-10"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>


            {/* User Type */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">I am a</span>
              </label>
              <select
                name="userType"
                className="select select-bordered w-full"
                value={formData.userType}
                onChange={handleChange}
                required
              >
                <option value="student">Current Student</option>
                <option value="alumni">Alumni</option>
              </select>
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-10 pr-10"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-10 pr-10"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {errorMessage && <p className='text-red-500 text-sm'>{errorMessage}</p>}

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white hover:from-blue-600 hover:to-emerald-500 transition-all duration-300 group"
              >
                Sign Up
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Divider */}
            <div className="divider text-gray-400 my-2">Or</div>

            {/* Google Sign In Button */}
            <button
              type="button"

              className="btn btn-outline w-full bg-white hover:bg-gray-50"
            >
              <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="mr-2">
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                  <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                  <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                  <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                </g>
              </svg>
              Sign up with Google
            </button>

            {/* Login Link */}
            <p className='text-center mt-4'>
              Already have an account?{' '}
              <Link to='/login' className='text-blue-500 hover:underline font-semibold'>
                Login Now
              </Link>
            </p>
          </form>

          {/* University Notice */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700 text-center">
              <strong>Note:</strong> This platform is exclusively for BRAC University students and alumni.
              Your account will be verified against official university records.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;