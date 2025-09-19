import React, { useState, useEffect, use } from "react";
import {
  Search,
  Filter,
  User,
  Mail,
  Briefcase,
  GraduationCap,
  Building,
  MapPin,
  Star,
  Send,
  X,
  Github,
  Globe,
  Calendar,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Contexts/AuthContext";

const RecommendationsList = () => {
  const [alumniList, setAlumniList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [recommendationModal, setRecommendationModal] = useState(null);
  const [recommendationForm, setRecommendationForm] = useState({
    message: "",
    requestType: "",
    company: "",
    position: "",
    university: "",
    program: "",
    deadline: "",
    githubLink: "",
    portfolioLink: "",
    additionalInfo: "",
  });
  const [expandedProfile, setExpandedProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  const userId = user?.uid;

  // Fetch alumni list
  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await axiosSecure.get("/alumnilist");
        setAlumniList(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching alumni list:", err);
        setAlumniList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, [axiosSecure]);

  // Get unique departments and companies for filters
  const departments = [
    ...new Set(alumniList.map((alumni) => alumni.department).filter(Boolean)),
  ];
  const companies = [
    ...new Set(alumniList.map((alumni) => alumni.company).filter(Boolean)),
  ];

  const filteredAlumni = alumniList.filter((alumni) => {
    const matchesSearch =
      alumni.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (alumni.company &&
        alumni.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (alumni.currentPosition &&
        alumni.currentPosition
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));
    const matchesDepartment =
      departmentFilter === "all" || alumni.department === departmentFilter;
    const matchesCompany =
      companyFilter === "all" || alumni.company === companyFilter;
    return matchesSearch && matchesDepartment && matchesCompany;
  });

  const handleRecommendationClick = (alumni) => {
    setRecommendationModal(alumni);
    setRecommendationForm({
      message: "",
      requestType: "",
      company: "",
      position: "",
      university: "",
      program: "",
      deadline: "",
      githubLink: "",
      portfolioLink: "",
      additionalInfo: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecommendationForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitRecommendation = async (e) => {
    e.preventDefault();

    if (!recommendationForm.message || !recommendationForm.requestType) {
      return alert("Please fill in all required fields");
    }

    try {
      await axiosSecure.post("/recommendation-requests", {
        alumniId: recommendationModal.userId,
        alumniName: recommendationModal.fullName,
        studentId: recommendationForm.studentId,
        studentName: recommendationForm.studentName,
        requesterId: userId,
        ...recommendationForm,
        submittedDate: new Date().toISOString(),
        status: "pending",
      });

      alert("Recommendation request sent successfully!");
      setRecommendationModal(null);
    } catch (err) {
      console.error("Error sending recommendation request:", err);
      alert("Failed to send recommendation request.");
    }
  };

  const toggleExpandProfile = (userId) => {
    setExpandedProfile(expandedProfile === userId ? null : userId);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getExperienceLevel = (graduationYear) => {
    if (!graduationYear) return "Experience not specified";
    const currentYear = new Date().getFullYear();
    const yearsSinceGraduation = currentYear - parseInt(graduationYear);

    if (yearsSinceGraduation <= 2) return "Entry-level (0-2 years)";
    if (yearsSinceGraduation <= 5) return "Mid-level (3-5 years)";
    if (yearsSinceGraduation <= 10) return "Senior (6-10 years)";
    return "Executive (10+ years)";
  };

  const stats = {
    totalAlumni: alumniList.length,
    verifiedAlumni: alumniList.filter((a) => a.status === "verified").length,
    hasCompany: alumniList.filter((a) => a.company).length,
    recentGrads: alumniList.filter((a) => {
      if (!a.graduationYear) return false;
      return new Date().getFullYear() - parseInt(a.graduationYear) <= 5;
    }).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="loading loading-spinner loading-lg mb-4"></div>
          <p>Loading alumni profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Alumni Network</h1>
            <p className="text-gray-400 mt-2">
              Connect with alumni for recommendations and guidance
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              value: stats.totalAlumni,
              label: "Total Alumni",
              color: "text-white",
              icon: <User className="w-5 h-5" />,
            },
            {
              value: stats.verifiedAlumni,
              label: "Verified",
              color: "text-emerald-400",
              icon: <Star className="w-5 h-5" />,
            },
            {
              value: stats.hasCompany,
              label: "Industry Professionals",
              color: "text-blue-400",
              icon: <Building className="w-5 h-5" />,
            },
            {
              value: stats.recentGrads,
              label: "Recent Graduates",
              color: "text-amber-400",
              icon: <GraduationCap className="w-5 h-5" />,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="card bg-[#1E293B] border border-[#334155] shadow-lg"
            >
              <div className="card-body p-4 flex flex-row items-center">
                <div className={`rounded-lg p-2 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="ml-3">
                  <div className={`text-xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <p className="text-gray-400 text-xs">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search alumni by name, department, company, or position..."
              className="input input-bordered bg-[#1E293B] border-[#334155] text-white pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="select select-bordered bg-[#1E293B] border-[#334155] text-white"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <select
            className="select select-bordered bg-[#1E293B] border-[#334155] text-white"
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
          >
            <option value="all">All Companies</option>
            {companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>

        {/* Alumni Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                {searchTerm ||
                departmentFilter !== "all" ||
                companyFilter !== "all"
                  ? "No matching alumni found"
                  : "No alumni profiles available yet"}
              </h3>
              <p className="text-gray-500">
                {searchTerm ||
                departmentFilter !== "all" ||
                companyFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Check back later for alumni profiles"}
              </p>
            </div>
          ) : (
            filteredAlumni.map((alumni) => (
              <div
                key={alumni.userId}
                className="card bg-[#1E293B] border border-[#334155] hover:border-blue-400 transition-all duration-300"
              >
                <div className="card-body">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">
                        {alumni.fullName}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {alumni.currentPosition || "Professional"}
                      </p>
                    </div>
                    {alumni.status === "verified" && (
                      <div className="badge badge-success badge-sm">
                        <Star className="w-3 h-3" /> Verified
                      </div>
                    )}
                  </div>

                  {/* Basic Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-400">
                      <Building className="w-4 h-4 mr-2" />
                      <span>{alumni.company || "Not specified"}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      <span>{alumni.department}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Class of {alumni.graduationYear || "N/A"}</span>
                    </div>
                  </div>

                  {/* Experience Level */}
                  <div className="mb-4">
                    <div className="badge badge-info">
                      {getExperienceLevel(alumni.graduationYear)}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedProfile === alumni.userId && (
                    <div className="space-y-3 pt-4 border-t border-[#334155]">
                      <div>
                        <p className="text-gray-300 text-sm font-medium">
                          Email
                        </p>
                        <p className="text-gray-400">{alumni.officialEmail}</p>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm font-medium">
                          Student ID
                        </p>
                        <p className="text-gray-400">{alumni.studentId}</p>
                      </div>
                      {alumni.verifiedAt && (
                        <div>
                          <p className="text-gray-300 text-sm font-medium">
                            Verified Since
                          </p>
                          <p className="text-gray-400">
                            {formatDate(alumni.verifiedAt)}
                          </p>
                        </div>
                      )}
                      {alumni.batchYear && (
                        <div>
                          <p className="text-gray-300 text-sm font-medium">
                            Batch Year
                          </p>
                          <p className="text-gray-400">{alumni.batchYear}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-between items-center">
                    <button
                      className="btn btn-outline shadow-none text-white btn-sm"
                      onClick={() => toggleExpandProfile(alumni.userId)}
                    >
                      {expandedProfile === alumni.userId ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-1" />
                          Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-1" />
                          More
                        </>
                      )}
                    </button>
                    <button
                      className="btn bg-gradient-to-r from-blue-500 to-emerald-400 border-none shadow-none text-white"
                      onClick={() => handleRecommendationClick(alumni)}
                    >
                      <Send className="w-4 h-4 mr-1" />
                      Ask Recommendation
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Recommendation Modal */}
        {recommendationModal && (
          <div className="modal modal-open">
            <div className="modal-box bg-[#1E293B] border border-[#334155] max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-white">
                  Request Recommendation from {recommendationModal.fullName}
                </h3>
                <button
                  className="btn btn-ghost btn-circle btn-sm"
                  onClick={() => setRecommendationModal(null)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6 p-4 bg-slate-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">
                      {recommendationModal.fullName}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {recommendationModal.currentPosition} at{" "}
                      {recommendationModal.company}
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmitRecommendation} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">
                      Student ID *
                    </span>
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    value={recommendationForm.studentId}
                    onChange={handleInputChange}
                    placeholder="Enter your Student ID"
                    className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">
                      Student Name *
                    </span>
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={recommendationForm.studentName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">
                      Request Type *
                    </span>
                  </label>
                  <select
                    name="requestType"
                    value={recommendationForm.requestType}
                    onChange={handleInputChange}
                    className="select select-bordered bg-[#1E293B] border-[#334155] text-white"
                    required
                  >
                    <option value="">Select request type</option>
                    <option value="job">Job Application</option>
                    <option value="internship">Internship Application</option>
                    <option value="graduate-school">Graduate School</option>
                    <option value="scholarship">Scholarship</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {recommendationForm.requestType === "job" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-gray-300">
                          Company *
                        </span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={recommendationForm.company}
                        onChange={handleInputChange}
                        placeholder="Company name"
                        className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-gray-300">
                          Position *
                        </span>
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={recommendationForm.position}
                        onChange={handleInputChange}
                        placeholder="Position title"
                        className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                        required
                      />
                    </div>
                  </div>
                )}

                {recommendationForm.requestType === "graduate-school" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-gray-300">
                          University *
                        </span>
                      </label>
                      <input
                        type="text"
                        name="university"
                        value={recommendationForm.university}
                        onChange={handleInputChange}
                        placeholder="University name"
                        className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-gray-300">
                          Program *
                        </span>
                      </label>
                      <input
                        type="text"
                        name="program"
                        value={recommendationForm.program}
                        onChange={handleInputChange}
                        placeholder="Program name"
                        className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">Deadline</span>
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={recommendationForm.deadline}
                    onChange={handleInputChange}
                    className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300 flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      GitHub Link (Optional)
                    </span>
                  </label>
                  <input
                    type="url"
                    name="githubLink"
                    value={recommendationForm.githubLink}
                    onChange={handleInputChange}
                    placeholder="https://github.com/yourusername"
                    className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Portfolio Link (Optional)
                    </span>
                  </label>
                  <input
                    type="url"
                    name="portfolioLink"
                    value={recommendationForm.portfolioLink}
                    onChange={handleInputChange}
                    placeholder="https://yourportfolio.com"
                    className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">
                      Your Message *
                    </span>
                  </label>
                  <textarea
                    name="message"
                    value={recommendationForm.message}
                    onChange={handleInputChange}
                    placeholder="Explain why you're requesting a recommendation and provide any relevant context..."
                    rows={4}
                    className="textarea textarea-bordered bg-[#1E293B] border-[#334155] text-white"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">
                      Additional Information (Optional)
                    </span>
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={recommendationForm.additionalInfo}
                    onChange={handleInputChange}
                    placeholder="Any other information that might be helpful..."
                    rows={2}
                    className="textarea textarea-bordered bg-[#1E293B] border-[#334155] text-white"
                  />
                </div>

                <div className="modal-action">
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setRecommendationModal(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white"
                  >
                    <Send className="w-4 h-4 mr-1" />
                    Send Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationsList;
