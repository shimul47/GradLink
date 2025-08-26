import React, { use, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router"; // <-- use react-router-dom
import { Eye, EyeOff, Mail, Lock, ArrowRight, GraduationCap } from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../Contexts/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { signInUser } = use(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError(""); // clear error on typing
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await signInUser(email, password);
      toast.success("Login Successfully.");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error signing in:", error.code, error.message);
      if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (userType) => {
    setLoading(true);
    setError("");

    const demoCredentials = {
      student: { email: "student@bracu.ac.bd", password: "demo123" },
      alumni: { email: "alumni@bracu.ac.bd", password: "demo123" },
      admin: { email: "admin@bracu.ac.bd", password: "demo123" }
    };

    setFormData(demoCredentials[userType]);

    setTimeout(() => {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userType", userType);
      navigate("/dashboard", { replace: true });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16 bg-gradient-to-br from-blue-950">
      <div className="card w-full max-w-md shadow-2xl bg-base-100 bg-opacity-90 backdrop-blur-sm z-10">
        <div className="card-body p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to your GradLink account</p>
          </div>

          {/* Error */}
          {error && (
            <div className="alert alert-error bg-red-50 text-red-700 p-3 rounded-lg mb-4">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email Address</span>
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

            {/* Password */}
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
                  className="absolute  right-3 top-3 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

            </div>

            {/* Submit */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn w-full btn-primary bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white hover:from-blue-600 hover:to-emerald-500 transition-all duration-300 group"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="divider my-3">OR</div>

          {/* Demo Logins */}
          <div className="space-y-2">
            <p className="text-sm text-gray-600 text-center">Quick demo access:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <button
                onClick={() => handleDemoLogin("student")}
                className="btn btn-outline btn-sm text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                disabled={loading}
              >
                Student Demo
              </button>
              <button
                onClick={() => handleDemoLogin("alumni")}
                className="btn btn-outline btn-sm text-emerald-600 border-emerald-600 hover:bg-emerald-600 hover:text-white"
                disabled={loading}
              >
                Alumni Demo
              </button>
              <button
                onClick={() => handleDemoLogin("admin")}
                className="btn btn-outline btn-sm text-purple-600 border-purple-600 hover:bg-purple-600 hover:text-white"
                disabled={loading}
              >
                Admin Demo
              </button>
            </div>
          </div>

          {/* Sign Up */}
          <div className="text-center mt-3">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="link link-primary font-semibold">
                Sign up now
              </Link>
            </p>
          </div>

          {/* University Notice */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700 text-center">
              <strong>Note:</strong> This platform is exclusively for BRAC University students, alumni, and faculty.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Error Icon
const AlertCircle = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" />
    <line x1="12" y1="16" x2="12" y2="16" strokeWidth="2" />
  </svg>
);

export default Login;
