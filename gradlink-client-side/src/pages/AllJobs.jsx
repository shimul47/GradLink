import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Briefcase,
  Building,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [expandedJob, setExpandedJob] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axiosSecure.get("/jobs");
        setJobs(res.data.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, [axiosSecure]);

  const toggleExpandJob = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 md:p-6">
      <div className="max-w-screen-xl mx-auto py-10 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">
            All Job Opportunities
          </h1>
          <p className="text-gray-400 mt-2">
            Find your next career opportunity
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="card bg-[#1E293B] border border-[#334155] hover:border-blue-400 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="card-body">
                {/* Job Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="card-title text-white text-xl">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-gray-400">
                      <Building className="w-4 h-4" />
                      <span>{job.company}</span>
                      <span className="text-gray-500">•</span>
                      <span>{job.location}</span>
                      {job.isRemote && (
                        <span className="badge badge-info badge-sm">
                          Remote
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span
                      className={`badge ${
                        job.status === "closed"
                          ? "badge-error"
                          : "badge-success"
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>
                </div>

                {/* Job Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-gray-400">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span>{job.salary || "Not specified"}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Deadline: {formatDate(job.deadline)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{job.experience || "Any experience"}</span>
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-gray-400 mb-4 line-clamp-2">
                  {job.description}
                </p>

                {/* Requirements Preview */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.requirements.slice(0, 3).map((req, index) => (
                    <span
                      key={index}
                      className="badge badge-outline badge-primary badge-sm"
                    >
                      {req}
                    </span>
                  ))}
                  {job.requirements.length > 3 && (
                    <span className="badge badge-outline badge-primary badge-sm">
                      +{job.requirements.length - 3} more
                    </span>
                  )}
                </div>

                {/* Expanded Section */}
                {expandedJob === job.id && (
                  <div className="space-y-4 pt-4 border-t border-[#334155]">
                    {/* Full Description */}
                    <div>
                      <p className="text-gray-300 font-medium mb-2">
                        Job Description
                      </p>
                      <p className="text-gray-400">{job.description}</p>
                    </div>

                    {/* Responsibilities */}
                    {job.responsibilities && (
                      <div>
                        <p className="text-gray-300 font-medium mb-2">
                          Responsibilities
                        </p>
                        <p className="text-gray-400">{job.responsibilities}</p>
                      </div>
                    )}

                    {/* Requirements */}
                    {job.requirements.length > 0 && (
                      <div>
                        <p className="text-gray-300 font-medium mb-2">
                          Requirements
                        </p>
                        <ul className="list-disc list-inside text-gray-400">
                          {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Benefits */}
                    {job.benefits && (
                      <div>
                        <p className="text-gray-300 font-medium mb-2">
                          Benefits
                        </p>
                        <span className="badge badge-success badge-sm">
                          {job.benefits}
                        </span>
                      </div>
                    )}

                    {/* Skills */}
                    {job.skills.length > 0 && (
                      <div>
                        <p className="text-gray-300 font-medium mb-2">Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="badge badge-outline badge-warning badge-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Contact Info */}
                    <div>
                      <p className="text-gray-300 font-medium mb-2">
                        Contact Information
                      </p>
                      <p className="text-gray-400">
                        Email:{" "}
                        <a
                          href={`mailto:${job.contactEmail}`}
                          className="text-blue-400 hover:underline"
                        >
                          {job.contactEmail}
                        </a>
                      </p>
                    </div>

                    {/* Apply Link */}
                    {job.applicationLink && job.status !== "closed" && (
                      <div>
                        <a
                          href={job.applicationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white shadow-md hover:shadow-lg"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Apply Now
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    className="btn btn-sm bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white"
                    onClick={() => toggleExpandJob(job.id)}
                  >
                    {expandedJob === job.id ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" /> Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" /> View Details
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {jobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No job opportunities available yet
            </h3>
            <p className="text-gray-500">Check back later for new postings</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllJobs;
