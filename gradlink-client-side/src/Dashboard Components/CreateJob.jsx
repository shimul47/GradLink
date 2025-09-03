import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import {
  ArrowLeft,
  Briefcase,
  DollarSign,
  MapPin,
  Calendar,
  Clock,
  BookOpen,
  Save,
  Plus,
  X,
  Building,
} from "lucide-react";
import { AuthContext } from "../Contexts/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const CreateJob = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // current user info
  const axiosSecure = useAxiosSecure();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    jobType: "full-time",
    location: "",
    salary: "",
    applicationDeadline: "",
    experienceLevel: "entry",
    description: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
    contactEmail: "",
    applicationLink: "",
    isRemote: false,
    image: null,
  });

  const jobTypes = [
    "full-time",
    "part-time",
    "contract",
    "internship",
    "freelance",
  ];

  const experienceLevels = [
    "entry",
    "junior",
    "mid",
    "senior",
    "lead",
    "executive",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills((prev) => [...prev, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
  };

  const formatLabel = (text) => {
    return text
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare backend payload
      const payload = {
        alumniUserId: user?.uid,
        title: formData.jobTitle,
        company: formData.company,
        location: formData.location,
        type: formData.jobType,
        salary: formData.salary,
        deadline: formData.applicationDeadline,
        experience: formData.experienceLevel,
        description: formData.description,
        //
        responsibilities: formData.responsibilities,
        //
        requirements: formData.requirements,
        //
        benifits: formData.benefits,
        skills: skills,
        isRemote: formData.isRemote,
        //
        contactEmail: formData.contactEmail,
        //
        applicationLink: formData.applicationLink,
        status: "active",
      };

      const response = await axiosSecure.post("/jobs", payload);
      console.log("Job created:", response.data);

      setIsSubmitting(false);
      alert("Job posted successfully!");
      navigate("/dashboard/jobs");
    } catch (error) {
      console.error("Error creating job:", error);
      setIsSubmitting(false);
      alert("Failed to post job. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/jobs">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Post a Job</h1>
            <p className="text-gray-400 mt-1">
              Share job opportunities with BRAC University students and alumni
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Details Card */}
        <div className="card bg-[#1E293B] border border-[#334155]">
          <div className="card-body">
            <h2 className="card-title text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Job Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Job Title *</span>
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="input input-bordered bg-[#0F172A] border-[#334155] text-white"
                  placeholder="e.g., Frontend Developer"
                  required
                />
              </div>

              {/* Company */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Company *</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="input input-bordered bg-[#0F172A] border-[#334155] text-white"
                  placeholder="Company name"
                  required
                />
              </div>

              {/* Job Type */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Job Type *</span>
                </label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleInputChange}
                  className="select select-bordered bg-[#0F172A] border-[#334155] text-white"
                  required
                >
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>
                      {formatLabel(type)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience Level */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">
                    Experience Level *
                  </span>
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  className="select select-bordered bg-[#0F172A] border-[#334155] text-white"
                  required
                >
                  {experienceLevels.map((level) => (
                    <option key={level} value={level}>
                      {formatLabel(level)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location *
                  </span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="input input-bordered bg-[#0F172A] border-[#334155] text-white"
                  placeholder="e.g., Dhaka, Bangladesh"
                  required
                />
              </div>

              {/* Salary */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Salary
                  </span>
                </label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="input input-bordered bg-[#0F172A] border-[#334155] text-white"
                  placeholder="e.g., $50,000 - $70,000"
                />
              </div>

              {/* Remote */}
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    name="isRemote"
                    checked={formData.isRemote}
                    onChange={handleInputChange}
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text text-white">
                    Remote work available
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Description Card */}
        <div className="card bg-[#1E293B] border border-[#334155]">
          <div className="card-body">
            <h2 className="card-title text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Job Description
            </h2>

            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">
                    Job Description *
                  </span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered bg-[#0F172A] border-[#334155] text-white h-32"
                  placeholder="Describe the role, team, and company culture..."
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">
                    Key Responsibilities *
                  </span>
                </label>
                <textarea
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered bg-[#0F172A] border-[#334155] text-white h-24"
                  placeholder="List the main responsibilities of this role..."
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">
                    Requirements & Qualifications *
                  </span>
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered bg-[#0F172A] border-[#334155] text-white h-24"
                  placeholder="List the required skills, education, and experience..."
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">
                    Benefits & Perks
                  </span>
                </label>
                <textarea
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered bg-[#0F172A] border-[#334155] text-white h-20"
                  placeholder="List the benefits and perks offered..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Skills Card */}
        <div className="card bg-[#1E293B] border border-[#334155]">
          <div className="card-body">
            <h2 className="card-title text-white flex items-center gap-2">
              Required Skills
            </h2>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Technical Skills</span>
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="input input-bordered bg-[#0F172A] border-[#334155] text-white flex-1"
                  placeholder="Add skill (e.g., React, Python)"
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddSkill())
                  }
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="btn btn-primary bg-gradient-to-r from-blue-500 to-emerald-400 border-none"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>

              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="badge badge-primary badge-lg gap-1"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="hover:text-error"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Application Details Card */}
        <div className="card bg-[#1E293B] border border-[#334155]">
          <div className="card-body">
            <h2 className="card-title text-white flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Application Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Application Deadline *
                  </span>
                </label>
                <input
                  type="date"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleInputChange}
                  className="input input-bordered bg-[#0F172A] border-[#334155] text-white"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Contact Email *
                  </span>
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  className="input input-bordered bg-[#0F172A] border-[#334155] text-white"
                  placeholder="hr@company.com"
                  required
                />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text text-white">
                    Application Link *
                  </span>
                </label>
                <input
                  type="url"
                  name="applicationLink"
                  value={formData.applicationLink}
                  onChange={handleInputChange}
                  className="input input-bordered bg-[#0F172A] border-[#334155] text-white"
                  placeholder="https://company.com/careers/apply"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 justify-end">
          <Link
            to="/dashboard/jobs"
            className="btn btn-ghost border border-[#334155] text-gray-400 hover:text-white"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="btn btn-primary bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white hover:from-blue-600 hover:to-emerald-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner"></span>
                Posting Job...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Post Job
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJob;
