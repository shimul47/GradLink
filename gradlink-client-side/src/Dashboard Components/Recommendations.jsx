import React, { useState, useEffect, use } from "react";
import {
  Search,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  User,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Briefcase,
  Download,
  Star,
  Mail,
} from "lucide-react";

import useUserType from "../Hooks/useUserType";
import { AuthContext } from "../Contexts/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Recommendations = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  const { userType } = useUserType();

  const [recommendationRequests, setRecommendationRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedRequest, setExpandedRequest] = useState(null);

  // Fetch recommendation requests
  useEffect(() => {
    if (!user?.uid || !userType) return;

    let queryParam = "";
    if (userType === "student") {
      queryParam = `requesterId=${user.uid}`;
    } else if (userType === "alumni") {
      queryParam = `alumniId=${user.uid}`;
    }

    axiosSecure
      .get(`/recommendation-requests/user?${queryParam}`)
      .then((res) => {
        setRecommendationRequests(res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching recommendation requests:", err);
      });
  }, [axiosSecure, user, userType]);

  // Filtering
  const filteredRequests = recommendationRequests.filter((request) => {
    const matchesSearch =
      request.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requestType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.university?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "badge-warning", text: "Pending", icon: Clock },
      accepted: { color: "badge-success", text: "Accepted", icon: CheckCircle },
      rejected: { color: "badge-error", text: "Rejected", icon: XCircle },
    };
    const config = statusConfig[status] || statusConfig.pending;
    const IconComponent = config.icon;

    return (
      <span className={`badge ${config.color} gap-1`}>
        <IconComponent className="w-3 h-3" />
        {config.text}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const toggleExpandRequest = (requestId) => {
    setExpandedRequest(expandedRequest === requestId ? null : requestId);
  };

  const stats = {
    totalRequests: recommendationRequests.length,
    pendingRequests: recommendationRequests.filter(
      (r) => r.status === "pending"
    ).length,
    acceptedRequests: recommendationRequests.filter(
      (r) => r.status === "accepted"
    ).length,
    rejectedRequests: recommendationRequests.filter(
      (r) => r.status === "rejected"
    ).length,
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-screen-xl px-5 lg:px-0 mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Recommendation Requests
            </h1>
            <p className="text-gray-400 mt-2">
              Manage requests{" "}
              {userType === "student" ? "you sent" : "you received"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              value: stats.totalRequests,
              label: "Total Requests",
              color: "text-white",
              icon: <FileText className="w-5 h-5" />,
            },
            {
              value: stats.pendingRequests,
              label: "Pending",
              color: "text-amber-400",
              icon: <Clock className="w-5 h-5" />,
            },
            {
              value: stats.acceptedRequests,
              label: "Accepted",
              color: "text-emerald-400",
              icon: <CheckCircle className="w-5 h-5" />,
            },
            {
              value: stats.rejectedRequests,
              label: "Rejected",
              color: "text-red-400",
              icon: <XCircle className="w-5 h-5" />,
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
              placeholder="Search requests by student name, company, or university..."
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
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Requests List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="card bg-[#1E293B] border border-[#334155]"
            >
              <div className="card-body">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {request.studentName}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        ID: {request.studentId}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(request.status)}
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">Request Type</p>
                    <p className="text-white font-medium">
                      {request.requestType}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Deadline</p>
                    <p className="text-white">{formatDate(request.deadline)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Program</p>
                    <p className="text-white">{request.program || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Submitted</p>
                    <p className="text-white">
                      {formatDate(request.submittedDate)}
                    </p>
                  </div>
                </div>

                {/* Expand/Collapse */}
                <div className="flex gap-2 pt-4">
                  <button
                    onClick={() => toggleExpandRequest(request.id)}
                    className="btn btn-ghost btn-sm ml-auto"
                  >
                    {expandedRequest === request.id ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        View Details
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              {searchTerm || statusFilter !== "all"
                ? "No matching requests found"
                : "No recommendation requests yet"}
            </h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Students will appear here when they request recommendations"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
