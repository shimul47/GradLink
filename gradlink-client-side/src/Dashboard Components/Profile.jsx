import React, { useEffect, useState } from "react";
import {
  Edit,
  Save,
  X,
  Mail,
  User,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { use } from "react";
import { AuthContext } from "../Contexts/AuthContext";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchUser = async () => {
      try {
        const userId = user?.uid;

        //student
        try {
          const { data } = await axiosSecure.get(`/studentlist/${userId}`);
          setUserData(data);
        } catch (errStudent) {
          //alumni
          const { data } = await axiosSecure.get(`/alumnilist/${userId}`);
          setUserData(data);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user, axiosSecure]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const route =
        userData.userType === "student"
          ? `/student/${userData.userId}`
          : `/alumni/${userData.userId}`;
      await axiosSecure.put(route, userData);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating user data:", err);
      alert("Failed to update profile.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return <p className="text-white">Loading profile...</p>;
  if (!userData) return <p className="text-red-500">User not found!</p>;

  return (
    <div className="max-w-screen-xl mx-auto px-5 lg:px-0 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Profile Information
        </h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-primary bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white hover:from-blue-600 hover:to-emerald-500"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleSave} className="btn btn-success text-white">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
            <button onClick={handleCancel} className="btn btn-error text-white">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 p-4 bg-[#1E293B] rounded-lg">
        {userData.status === "verified" ? (
          <CheckCircle className="w-5 h-5 text-emerald-400" />
        ) : (
          <Clock className="w-5 h-5 text-amber-400" />
        )}
        <span
          className={`font-semibold ${
            userData.status === "verified"
              ? "text-emerald-400"
              : "text-amber-400"
          }`}
        >
          {userData.status === "verified"
            ? "Verified Account"
            : "Pending Verification"}
        </span>
        {userData.verifiedAt && (
          <span className="text-gray-400 text-sm ml-2">
            Verified on {formatDate(userData.verifiedAt)}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-[#1E293B] border border-[#334155]">
          <div className="card-body">
            <h2 className="card-title text-white flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </h2>

            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Full Name</span>
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={userData.fullName}
                    onChange={handleInputChange}
                    className="input input-bordered bg-[#0F172A] border-[#334155] text-white"
                  />
                ) : (
                  <p className="text-gray-300">{userData.fullName}</p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Official Email
                  </span>
                </label>
                <p className="text-gray-300">{userData.officialEmail}</p>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Student ID</span>
                </label>
                <p className="text-gray-300">{userData.studentId}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-[#1E293B] border border-[#334155]">
          <div className="card-body">
            <h2 className="card-title text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Academic Information
            </h2>

            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Department</span>
                </label>
                {isEditing ? (
                  <select
                    name="department"
                    value={userData.department}
                    onChange={handleInputChange}
                    className="select select-bordered bg-[#0F172A] border-[#334155] text-white"
                  >
                    <option value="CSE">Computer Science & Engineering</option>
                    <option value="EEE">
                      Electrical & Electronic Engineering
                    </option>
                    <option value="BBA">Business Administration</option>
                    <option value="Economics">Economics</option>
                    <option value="Architecture">Architecture</option>
                  </select>
                ) : (
                  <p className="text-gray-300">{userData.department}</p>
                )}
              </div>

              {userData.userType === "student" && (
                <>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">Batch Year</span>
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        name="batchYear"
                        value={userData.batchYear}
                        onChange={handleInputChange}
                        className="input input-bordered bg-[#0F172A] border-[#334155] text-white"
                      />
                    ) : (
                      <p className="text-gray-300">{userData.batchYear}</p>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">
                        Enrollment Status
                      </span>
                    </label>
                    {isEditing ? (
                      <select
                        name="enrollmentStatus"
                        value={userData.enrollmentStatus}
                        onChange={handleInputChange}
                        className="select select-bordered bg-[#0F172A] border-[#334155] text-white"
                      >
                        <option value="current">Current</option>
                        <option value="on_leave">On Leave</option>
                        <option value="graduated">Graduated</option>
                      </select>
                    ) : (
                      <p className="text-gray-300 capitalize">
                        {userData.enrollmentStatus}
                      </p>
                    )}
                  </div>
                </>
              )}

              {userData.userType === "alumni" && (
                <>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">
                        Graduation Year
                      </span>
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        name="graduationYear"
                        value={userData.graduationYear}
                        onChange={handleInputChange}
                        className="input input-bordered bg-[#0F172A] border-[#334155] text-white"
                      />
                    ) : (
                      <p className="text-gray-300">{userData.graduationYear}</p>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        Company
                      </span>
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="company"
                        value={userData.company}
                        onChange={handleInputChange}
                        className="input input-bordered bg-[#0F172A] border-[#334155] text-white"
                      />
                    ) : (
                      <p className="text-gray-300">
                        {userData.company || "Not specified"}
                      </p>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">
                        Current Position
                      </span>
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="currentPosition"
                        value={userData.currentPosition}
                        onChange={handleInputChange}
                        className="input input-bordered bg-[#0F172A] border-[#334155] text-white"
                      />
                    ) : (
                      <p className="text-gray-300">
                        {userData.currentPosition || "Not specified"}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {userData.userType === "student" && (
        <div className="card bg-[#1E293B] border border-[#334155]">
          <div className="card-body">
            <h2 className="card-title text-white flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Student Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text text-white">Enrollment Date</span>
                </label>
                <p className="text-gray-300">September 2023</p>
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-white">
                    Expected Graduation
                  </span>
                </label>
                <p className="text-gray-300">June 2027</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
