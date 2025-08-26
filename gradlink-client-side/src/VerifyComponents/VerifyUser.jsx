import { useState, useEffect, useContext } from "react";
import { Lock, Upload, Mail } from "lucide-react";
import { AuthContext } from "../Contexts/AuthContext";
import useUserType from "../Hooks/useUserType";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const VerifyUser = () => {
  const [verificationMethod, setVerificationMethod] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { userType } = useUserType();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    officialEmail: "",
    department: "",
    batchYear: "",
    graduationYear: "",
    company: "",
    agreed: false,
  });

  // initial verification method based on user type
  useEffect(() => {
    if (userType) {
      setVerificationMethod(userType);
    }
  }, [userType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreed) {
      alert("Please confirm that the information provided is correct.");
      return;
    }

    setIsSubmitting(true);

    try {
      const verificationData = {
        userId: user?.uid, // from Firebase
        userType,
        officialEmail: formData.officialEmail,
        studentId: formData.studentId,
        department: formData.department,
        fullName: formData.fullName,
        ...(userType === "student" && { batchYear: formData.batchYear }),
        ...(userType === "alumni" && {
          graduationYear: formData.graduationYear,
          company: formData.company || "",
        }),
      };

      const { data } = await axiosPublic.post("/verify-user", verificationData);

      if (data.success) {
        alert(data.message);
        // navigate("/dashboard"); // redirect if needed
      } else {
        alert(data.message || "Verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-5 lg:px-0 py-16">
      {/* Verification Methods */}
      {!verificationMethod && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Student option */}
          <div
            className={`card cursor-pointer transition-all duration-300 hover:shadow-xl ${
              verificationMethod === "student"
                ? "ring-2 ring-blue-500 shadow-lg"
                : ""
            }`}
            onClick={() => setVerificationMethod("student")}
          >
            <div className="card-body">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="card-title text-white">
                    Student Email Verification
                  </h3>
                  <p className="text-gray-400">
                    Verify with your BRACU Email (@g.bracu.ac.bd)
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                Quick verification for current students using their official
                BRACU email address.
              </p>
            </div>
          </div>

          {/* Alumni option */}
          <div
            className={`card cursor-pointer transition-all duration-300 hover:shadow-xl ${
              verificationMethod === "alumni"
                ? "ring-2 ring-blue-500 shadow-lg"
                : ""
            }`}
            onClick={() => setVerificationMethod("alumni")}
          >
            <div className="card-body">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="card-title text-white">Alumni Verification</h3>
                  <p className="text-gray-400">
                    Upload documents or provide graduation details
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                For alumni without active BRACU email. Requires admin approval
                (24-48 hours).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Verification Form */}
      {verificationMethod && (
        <div className="card bg-[#1E293B] border border-[#334155]">
          <div className="card-body">
            <div className="flex items-center justify-between mb-6">
              <h2 className="card-title text-white flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Verification Form
              </h2>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setVerificationMethod(null)}
              >
                Change Method
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name & ID */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white">Full Name *</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white">
                      {userType === "student" ? "Student ID *" : "Alumni ID *"}
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                    value={formData.studentId}
                    onChange={(e) =>
                      setFormData({ ...formData, studentId: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">
                    Official Email *
                  </span>
                </label>
                <input
                  type="email"
                  className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                  value={formData.officialEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, officialEmail: e.target.value })
                  }
                  required
                />
              </div>

              {/* Department */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Department *</span>
                </label>
                <select
                  className="select select-bordered bg-[#1E293B] border-[#334155] text-white"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  required
                >
                  <option value="">Select your department</option>
                  <option value="CSE">Computer Science & Engineering</option>
                  <option value="EEE">
                    Electrical & Electronic Engineering
                  </option>
                  <option value="BBA">Business Administration</option>
                  <option value="Law">Law</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Student fields */}
              {userType === "student" && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white">Batch Year *</span>
                  </label>
                  <select
                    className="select select-bordered bg-[#1E293B] border-[#334155] text-white"
                    value={formData.batchYear}
                    onChange={(e) =>
                      setFormData({ ...formData, batchYear: e.target.value })
                    }
                    required
                  >
                    <option value="">Select year</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}

              {/* Alumni fields */}
              {userType === "alumni" && (
                <>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">
                        Graduation Year *
                      </span>
                    </label>
                    <select
                      className="select select-bordered bg-[#1E293B] border-[#334155] text-white"
                      value={formData.graduationYear}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          graduationYear: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Select year</option>
                      {Array.from({ length: 20 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">
                        Current Company (Optional)
                      </span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                    />
                  </div>
                </>
              )}

              {/* Agreement */}
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={formData.agreed}
                    onChange={(e) =>
                      setFormData({ ...formData, agreed: e.target.checked })
                    }
                    required
                  />
                  <span className="label-text text-white">
                    I confirm that the information is correct and belongs to me.
                  </span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-full bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Verify Me"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyUser;
