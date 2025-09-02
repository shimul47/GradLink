import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import {
  Search,
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Eye,
  Edit,
  Plus,
  Building,
  Users,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { AuthContext } from "../Contexts/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Job = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const res = await axiosSecure.get("/jobs");

        const jobsArray = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.jobs)
          ? res.data.jobs
          : [];

        const myJobs = jobsArray.filter(
          (job) => job.alumniUserId === user?.uid
        );

        setJobs(myJobs);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user]);

  const filteredJobs = jobs.filter((job) => {
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

  const getStatusBadge = (status) =>
    status === "active" ? (
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

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const stats = {
    totalJobs: jobs.length,
    activeJobs: jobs.filter((job) => job.status === "active").length,
    closedJobs: jobs.filter((job) => job.status === "closed").length,
    totalApplicants: jobs.reduce((sum, job) => sum + (job.applicants || 0), 0),
    totalViews: jobs.reduce((sum, job) => sum + (job.views || 0), 0),
  };

  const handleEditJob = async (job) => {
    try {
      const newStatus = job.status === "active" ? "closed" : "active";
      await axiosSecure.put(`/jobs/${job.id}`, { status: newStatus });

      setJobs((prev) =>
        prev.map((j) => (j.id === job.id ? { ...j, status: newStatus } : j))
      );
    } catch (err) {
      console.error("Failed to update job status:", err);
      alert("Failed to update job. Try again.");
    }
  };

  if (loading)
    return <div className="text-center text-white mt-12">Loading jobs...</div>;

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

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="card bg-[#1E293B] border border-[#334155]">
            <div className="card-body p-4 text-center">
              <div className="text-2xl font-bold text-white">{value}</div>
              <p className="text-gray-400 text-sm">
                {key.replace(/([A-Z])/g, " $1")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
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
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Briefcase className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">
              {searchTerm || statusFilter !== "all"
                ? "No matching jobs found"
                : "You haven't posted any jobs yet"}
            </h3>
            <p className="mt-2">
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
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="card bg-[#1E293B] border border-[#334155] hover:border-blue-400 transition-colors"
            >
              <div className="card-body">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="card-title text-white text-lg">
                      {job.title}
                    </h3>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {job.location}{" "}
                    {job.isRemote && (
                      <span className="badge badge-sm badge-info">Remote</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" /> {job.salary}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" /> {job.experience}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> Apply by{" "}
                    {formatDate(job.deadline)}
                  </div>
                </div>

                {/* Requirements */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {(job.requirements || []).slice(0, 4).map((req, idx) => (
                    <span key={idx} className="badge badge-outline badge-sm">
                      {req}
                    </span>
                  ))}
                  {(job.requirements || []).length > 4 && (
                    <span className="badge badge-outline badge-sm">
                      +{job.requirements.length - 4} more
                    </span>
                  )}
                </div>

                {/* Stats & Actions */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" /> {job.applicants || 0}{" "}
                      applicants
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" /> {job.views || 0} views
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-1"
                    style={{ color: "red" }}
                  >
                    <Link to={job.applicationLink}>Apply now</Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="btn btn-outline btn-sm btn-secondary"
                      onClick={() => handleEditJob(job)}
                    >
                      <Edit className="w-4 h-4 mr-1" /> Toggle Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Job;
