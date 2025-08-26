import { useState, useEffect, useContext } from "react";
import { Lock, Upload, Mail } from "lucide-react";
import { AuthContext } from "../Contexts/AuthContext";
import useUserType from "../Hooks/useUserType";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const VerifyUser = () => {
  const [verificationMethod, setVerificationMethod] = useState(null);
  // const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { userType } = useUserType();
  const axiosPublic = useAxiosPublic();
  // const userType = "student";
  const { user } = use(AuthContext);

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
      // Prepare verification data
      const verificationData = {
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

      // submit verification request
      const verificationResponse = await axiosPublic.post(
        "/verify-user",
        verificationData
      );
      if (verificationResponse.data.success) {
        if (verificationResponse.data.autoVerified) {
          const userData = {
            userId: user.uid, // from firebase
            userType,
            officialEmail: formData.officialEmail,
            studentId: formData.studentId,
            department: formData.department,
            fullName: formData.fullName,
            status: "verified",
            verifiedAt: new Date().toISOString(),
            ...(userType === "student" && {
              batchYear: formData.batchYear,
              enrollmentStatus: "current",
            }),
            ...(userType === "alumni" && {
              graduationYear: formData.graduationYear,
              company: formData.company || "",
              currentPosition: "",
            }),
          };

          try {
            // Post to the db collection based on userType
            let createResponse;
            if (userType === "student") {
              createResponse = await axiosSecure.post("/students", userData);
            } else if (userType === "alumni") {
              createResponse = await axiosSecure.post("/alumni", userData);
            }

            if (createResponse.data.success) {
              alert(
                `Your ${userType} account has been verified and created successfully!`
              );

              // navigate('/dashboard');
            } else {
              alert("Account creation failed. Please contact support.");
            }
          } catch (createError) {
            console.error("Error creating user record:", createError);
            alert("Account creation failed. Please contact support.");
          }
        } else {
          // Manual verification required
          alert(
            "Your verification request is pending admin approval. You'll be notified once verified."
          );
        }
      } else {
        alert(data.message || "Verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Verification error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" max-w-screen-xl mx-auto px-5 lg:px-0 py-16">
      {/* Verification Methods */}
      {!verificationMethod && (
        <div className="grid md:grid-cols-2 gap-6">
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

            <p className="text-gray-400 mb-6">
              Please provide accurate information to verify your BRACU
              affiliation.
            </p>

            {/* User Type Indicator */}
            {userType && (
              <div className="alert alert-info mb-6 bg-blue-500/10 border-blue-500/20">
                <div className="flex items-center">
                  <span className="text-blue-400">
                    You are registering as a{" "}
                    <strong className="text-white capitalize">
                      {userType}
                    </strong>
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white">Full Name *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
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
                    placeholder={
                      userType === "student"
                        ? "e.g., 20341001"
                        : "e.g., 20101234"
                    }
                    className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                    value={formData.studentId}
                    onChange={(e) =>
                      setFormData({ ...formData, studentId: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">
                    Official Email *
                  </span>
                </label>
                <input
                  type="email"
                  placeholder={
                    verificationMethod === "student"
                      ? "your.name@g.bracu.ac.bd"
                      : "your.email@example.com"
                  }
                  className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                  value={formData.officialEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, officialEmail: e.target.value })
                  }
                  required
                />
                {verificationMethod === "student" && (
                  <label className="label-text-alt text-blue-400 mt-1">
                    Please use your official BRACU student email
                  </label>
                )}
              </div>

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
                  <option value="CSE">
                    Computer Science & Engineering (CSE)
                  </option>
                  <option value="EEE">
                    Electrical & Electronic Engineering (EEE)
                  </option>
                  <option value="ECE">
                    Electronics & Communication Engineering (ECE)
                  </option>
                  <option value="BBA">Business Administration (BBA)</option>
                  <option value="Economics">Economics</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Microbiology">Microbiology</option>
                  <option value="English">English</option>
                  <option value="Law">Law</option>
                  <option value="PH">Public Health</option>
                  <option value="DS">Development Studies</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Student-specific fields */}
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
                    <option value="">Select your batch year</option>
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

              {/* Alumni-specific fields */}
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
                      <option value="">Select your graduation year</option>
                      {Array.from({ length: 22 }, (_, i) => {
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
                      placeholder="e.g., Google, Microsoft, etc."
                      className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                    />
                  </div>
                </>
              )}

              {/* Student-specific note */}
              {verificationMethod === "student" && (
                <div className="alert alert-info bg-blue-500/10 border-blue-500/20">
                  <div className="flex items-center">
                    <span className="text-blue-400 text-sm">
                      Student verification is instant using your BRACU student
                      ID.
                    </span>
                  </div>
                </div>
              )}

              {/* Alumni-specific note */}
              {verificationMethod === "alumni" && (
                <div className="alert alert-warning bg-yellow-500/10 border-yellow-500/20">
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-sm">
                      Alumni verification may take 24-48 hours for manual
                      review.
                    </span>
                  </div>
                </div>
              )}

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary bg-[#1E293B] border-[#334155] checked:bg-blue-500 checked:border-blue-500"
                    checked={formData.agreed}
                    onChange={(e) =>
                      setFormData({ ...formData, agreed: e.target.checked })
                    }
                    required
                  />
                  <span className="label-text text-white flex-1 ">
                    I confirm that the information provided{" "}
                    <br className="md:hidden" /> is correct and belongs to me.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white hover:from-blue-600 hover:to-emerald-500 transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Submitting...
                  </>
                ) : (
                  "Verify Me"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyUser;
