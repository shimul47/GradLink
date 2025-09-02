import React, { useState } from "react";
import { Link } from "react-router";
import {
  Search,
  Filter,
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Plus,
  Building,
  Users,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const Job = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Sample job data - only jobs posted by the current user
  const myJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Solutions Ltd",
      location: "Dhaka, Bangladesh",
      type: "full-time",
      salary: "৳80,000 - ৳120,000",
      postedDate: "2024-03-15",
      deadline: "2024-04-15",
      experience: "Mid-level",
      description:
        "We're looking for a skilled Frontend Developer to join our dynamic team. You'll work on cutting-edge web applications using modern frameworks.",
      requirements: ["React", "JavaScript", "CSS", "3+ years experience"],
      isRemote: true,
      status: "active",
      applicants: 24,
      views: 156,
    },
    {
      id: 2,
      title: "Data Science Intern",
      company: "Data Insights BD",
      location: "Remote",
      type: "internship",
      salary: "৳25,000 - ৳35,000",
      postedDate: "2024-03-12",
      deadline: "2024-03-31",
      experience: "Entry-level",
      description:
        "Join our data science team as an intern and gain hands-on experience with real-world data analysis projects.",
      requirements: [
        "Python",
        "Machine Learning",
        "Statistics",
        "Students welcome",
      ],
      isRemote: true,
      status: "active",
      applicants: 18,
      views: 89,
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Creative Minds",
      location: "Remote",
      type: "part-time",
      salary: "৳45,000 - ৳65,000",
      postedDate: "2024-03-08",
      deadline: "2024-03-25",
      experience: "Mid-level",
      description:
        "Create beautiful and intuitive user interfaces for our digital products.",
      requirements: [
        "Figma",
        "UI Design",
        "User Research",
        "2+ years experience",
      ],
      isRemote: true,
      status: "closed",
      applicants: 15,
      views: 97,
    },
  ];

  const filteredJobs = myJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getTypeBadge = (type) => {
    const typeConfig = {
      "full-time": { color: "badge-primary", text: "Full-time" },
      "part-time": { color: "badge-secondary", text: "Part-time" },
      internship: { color: "badge-accent", text: "Internship" },
      contract: { color: "badge-info", text: "Contract" },
    };
    const config = typeConfig[type] || typeConfig["full-time"];
    return <span className={`badge ${config.color}`}>{config.text}</span>;
  };

  const getStatusBadge = (status) => {
    return status === "active" ? (
      <span className="badge badge-success gap-1">
        <CheckCircle className="w-3 h-3" />
        Active
      </span>
    ) : (
      <span className="badge badge-error gap-1">
        <XCircle className="w-3 h-3" />
        Closed
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const stats = {
    totalJobs: myJobs.length,
    activeJobs: myJobs.filter((job) => job.status === "active").length,
    closedJobs: myJobs.filter((job) => job.status === "closed").length,
    totalApplicants: myJobs.reduce((sum, job) => sum + job.applicants, 0),
    totalViews: myJobs.reduce((sum, job) => sum + job.views, 0),
  };

  const handleEditJob = (jobId) => {
    console.log(`Editing job ${jobId}`);
    // Navigate to edit page or open edit modal
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      console.log(`Deleting job ${jobId}`);
      // API call to delete job
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">My Job Posts</h1>
          <p className="text-gray-400 mt-2">Manage your job postings</p>
        </div>
        <Link
          to="/dashboard/jobs/create"
          className="btn btn-primary bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white hover:from-blue-600 hover:to-emerald-500 mt-4 md:mt-0"
        >
          <Plus className="w-5 h-5 mr-2" />
          Post New Job
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="card bg-[#1E293B] border border-[#334155]">
          <div className="card-body p-4 text-center">
            <div className="text-2xl font-bold text-white">
              {stats.totalJobs}
            </div>
            <p className="text-gray-400 text-sm">Total Jobs</p>
          </div>
        </div>
        <div className="card bg-[#1E293B] border border-[#334155]">
          <div className="card-body p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">
              {stats.activeJobs}
            </div>
            <p className="text-gray-400 text-sm">Active</p>
          </div>
        </div>
        <div className="card bg-[#1E293B] border border-[#334155]">
          <div className="card-body p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {stats.closedJobs}
            </div>
            <p className="text-gray-400 text-sm">Closed</p>
          </div>
        </div>
        <div className="card bg-[#1E293B] border border-[#334155]">
          <div className="card-body p-4 text-center">
            <div className="text-2xl font-bold text-white">
              {stats.totalApplicants}
            </div>
            <p className="text-gray-400 text-sm">Applicants</p>
          </div>
        </div>
        <div className="card bg-[#1E293B] border border-[#334155]">
          <div className="card-body p-4 text-center">
            <div className="text-2xl font-bold text-amber-400">
              {stats.totalViews}
            </div>
            <p className="text-gray-400 text-sm">Total Views</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search your jobs..."
            className="input input-bordered bg-[#1E293B] border-[#334155] text-white pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="select select-bordered bg-[#1E293B] border-[#334155] text-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="card bg-[#1E293B] border border-[#334155] hover:border-blue-400 transition-colors"
          >
            <div className="card-body">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="card-title text-white text-lg">{job.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Building className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{job.company}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(job.status)}
                  {getTypeBadge(job.type)}
                </div>
              </div>

              {/* Job Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center text-gray-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{job.location}</span>
                  {job.isRemote && (
                    <span className="badge badge-sm badge-info ml-2">
                      Remote
                    </span>
                  )}
                </div>
                <div className="flex items-center text-gray-400">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span>{job.experience}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Apply by {formatDate(job.deadline)}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {job.description}
              </p>

              {/* Requirements */}
              <div className="flex flex-wrap gap-2 mb-4">
                {job.requirements.slice(0, 4).map((req, index) => (
                  <span key={index} className="badge badge-outline badge-sm">
                    {req}
                  </span>
                ))}
                {job.requirements.length > 4 && (
                  <span className="badge badge-outline badge-sm">
                    +{job.requirements.length - 4} more
                  </span>
                )}
              </div>

              {/* Stats and Actions */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {job.applicants} applicants
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {job.views} views
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Posted {formatDate(job.postedDate)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="btn btn-outline btn-sm btn-secondary"
                    onClick={() => handleEditJob(job.id)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button
                    className="btn btn-outline btn-sm btn-error"
                    onClick={() => handleDeleteJob(job.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-400">
              {searchTerm || statusFilter !== "all"
                ? "No matching jobs found"
                : "You haven't posted any jobs yet"}
            </h3>
            <p className="text-gray-500 mt-2">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Get started by posting your first job opportunity"}
            </p>
            {searchTerm === "" && statusFilter === "all" && (
              <Link
                to="/dashboard/jobs/create"
                className="btn btn-primary mt-4 bg-gradient-to-r from-blue-500 to-emerald-400 border-none"
              >
                <Plus className="w-4 h-4 mr-2" />
                Post Your First Job
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// export default Job;
