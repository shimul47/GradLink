import { useState, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { use } from "react";
import { useNavigate } from "react-router";
import {
  UserCheck,
  Clock,
  CheckCircle,
  XCircle,
  Mail,
  BookOpen,
  Briefcase,
  GraduationCap,
  User
} from "lucide-react";

const VerifyUser = () => {
  const { user } = use(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    officialEmail: "",
    department: "",
    batchYear: "",
    graduationYear: "",
    company: "",
    userType: "",
    agreed: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null); // null, 'pending', 'verified'

  // Check verification status 
  useEffect(() => {
    const checkVerificationStatus = async () => {
      try {
        const response = await axiosPublic.get(`/verification-status/${user.uid}`);
        setVerificationStatus(response.data.status);
        if (response.data.status === 'verified') {
          navigate("/");
        } else if (response.data.status === 'pending') {
          setIsSubmitted(true);
        }
      } catch (error) {
        console.error("Error checking verification status:", error);
      }
    };

    checkVerificationStatus();
  }, [user.uid, axiosPublic, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreed) return alert("Please confirm your information.");
    if (!formData.userType) return alert("Please select user type.");

    setIsSubmitting(true);

    try {
      const response = await axiosPublic.post("/verify-user", {
        userId: user.uid,
        userType: formData.userType,
        fullName: formData.fullName,
        studentId: formData.studentId,
        officialEmail: formData.officialEmail,
        department: formData.department,
        batchYear: formData.batchYear,
        graduationYear: formData.graduationYear,
        company: formData.company,
      });

      alert(response.data.message);
      setIsSubmitted(true);
      setVerificationStatus('pending');

      // Redirect to home 
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show pending verification message
  if (verificationStatus === 'pending') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#1E293B] border border-[#334155] rounded-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Clock className="w-8 h-8 text-amber-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Verification in Progress</h2>
          <p className="text-gray-400 mb-6">
            Your account verification is currently under review. This process usually takes
            <span className="text-amber-400 font-medium"> 24 to 48 hours</span>.
            You'll receive a notification once your verification is complete.
          </p>
          <button
            onClick={() => navigate("/")}
            className="btn bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white w-full"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // Show verification form
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
              <UserCheck className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Verify Your Account</h1>
          <p className="text-gray-400">
            Complete your profile to access all platform features
          </p>
        </div>

        {/* Verification Form */}
        <div className="card bg-[#1E293B] border border-[#334155] shadow-lg">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Type Selection */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-300 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    User Type *
                  </span>
                </label>
                <select
                  className="select select-bordered bg-[#1E293B] border-[#334155] text-white"
                  value={formData.userType}
                  onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                  required
                  disabled={isSubmitted}
                >
                  <option value="">Select User Type</option>
                  <option value="student">Student</option>
                  <option value="alumni">Alumni</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">Full Name *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    disabled={isSubmitted}
                  />
                </div>

                {/* ID Field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      {formData.userType === "student" ? "Student ID *" : "Alumni ID *"}
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder={formData.userType === "student" ? "Student ID" : "Alumni ID"}
                    className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    required
                    disabled={isSubmitted}
                  />
                </div>
              </div>

              {/* Official Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-300 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Official Email *
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="official@institution.edu"
                  className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                  value={formData.officialEmail}
                  onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                  required
                  disabled={isSubmitted}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Department */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">Department *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Computer Science"
                    className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    required
                    disabled={isSubmitted}
                  />
                </div>

                {/* Year Fields */}
                {formData.userType === "student" && (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-300">Batch Year *</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g., 2023"
                      className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                      value={formData.batchYear}
                      onChange={(e) => setFormData({ ...formData, batchYear: e.target.value })}
                      required
                      disabled={isSubmitted}
                    />
                  </div>
                )}

                {formData.userType === "alumni" && (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-300 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        Graduation Year *
                      </span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g., 2020"
                      className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                      value={formData.graduationYear}
                      onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                      required
                      disabled={isSubmitted}
                    />
                  </div>
                )}
              </div>

              {/* Company Field for Alumni */}
              {formData.userType === "alumni" && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Current Company (Optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Google, Microsoft"
                    className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    disabled={isSubmitted}
                  />
                </div>
              )}

              {/* Agreement Checkbox */}
              <div className="form-control">
                <label className="label cursor-pointer justify-start">
                  <input
                    type="checkbox"
                    checked={formData.agreed}
                    onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                    required
                    disabled={isSubmitted}
                    className="checkbox checkbox-primary mr-3"
                  />
                  <span className="label-text text-gray-300">
                    I confirm that the information provided is accurate and complete
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="form-control pt-4">
                <button
                  type="submit"
                  className="btn bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white w-full"
                  disabled={isSubmitting || isSubmitted}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Verifying...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-1" />
                      Verification Submitted
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-5 h-5 mr-1" />
                      Verify Account
                    </>
                  )}
                </button>
              </div>

              {/* Help Text */}
              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  Verification typically takes 24-48 hours. Your data will be checked against official university database. Once data is matched your verification request will be approved.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;