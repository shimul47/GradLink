import React, { useState, useEffect, useContext } from "react";
import {
  Search,
  User,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Mail,
  BookOpen,
} from "lucide-react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Contexts/AuthContext";

const CollaborationRequest = () => {
  const { user } = useContext(AuthContext);
  const userId = user?.uid;
  const axiosSecure = useAxiosSecure();

  const [collaborationRequests, setCollaborationRequests] = useState([]);
  const [senderCache, setSenderCache] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedRequest, setExpandedRequest] = useState(null);

  // Fetch collaboration requests
  useEffect(() => {
    if (!userId) return;
    const fetchCollaborationRequests = async () => {
      try {
        const { data } = await axiosSecure.get(
          `/collaboration-requests?userId=${userId}`
        );
        setCollaborationRequests(data.collaborations || []);
      } catch (err) {
        console.error("Error fetching collaboration requests:", err);
      }
    };
    fetchCollaborationRequests();
  }, [userId, axiosSecure]);

  // Fetch sender details
  const getSenderDetails = async (senderUserId) => {
    if (!senderUserId) return { name: "-", email: "-", id: "-" };
    if (senderCache[senderUserId]) return senderCache[senderUserId];

    try {
      const studentRes = await axiosSecure.get(`/studentlist/${senderUserId}`);
      const student = studentRes.data;
      const sender = {
        name: student.fullName,
        email: student.officialEmail,
        id: student.studentId,
      };
      setSenderCache((prev) => ({ ...prev, [senderUserId]: sender }));
      return sender;
    } catch {
      try {
        const alumniRes = await axiosSecure.get(`/alumnilist/${senderUserId}`);
        const alumni = alumniRes.data;
        const sender = {
          name: alumni.fullName,
          email: alumni.officialEmail,
          id: alumni.studentId,
        };
        setSenderCache((prev) => ({ ...prev, [senderUserId]: sender }));
        return sender;
      } catch {
        const unknownSender = { name: "Unknown", email: "-", id: "-" };
        setSenderCache((prev) => ({ ...prev, [senderUserId]: unknownSender }));
        return unknownSender;
      }
    }
  };

  // Apply filters and attach sender info
  const [filteredRequests, setFilteredRequests] = useState([]);
  useEffect(() => {
    const applyFilter = async () => {
      const requestsWithSender = await Promise.all(
        collaborationRequests.map(async (req) => {
          const sender = await getSenderDetails(req.senderUserId);
          return { ...req, sender };
        })
      );

      const filtered = requestsWithSender.filter((request) => {
        const sender = request.sender || { name: "-", email: "-", id: "-" };
        const projectTitle = request.projectTitle || "";
        const message = request.message || "";

        const matchesSearch =
          sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
          statusFilter === "all" || request.status === statusFilter;

        return matchesSearch && matchesStatus;
      });

      setFilteredRequests(filtered);
    };

    applyFilter();
  }, [collaborationRequests, searchTerm, statusFilter]);

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

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleAccept = async (requestId) => {
    try {
      await axiosSecure.put(`/collaboration-requests/${requestId}/status`, {
        status: "accepted",
      });
      setCollaborationRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, status: "accepted" } : r))
      );
    } catch (err) {
      console.error("Error accepting request:", err);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axiosSecure.put(`/collaboration-requests/${requestId}/status`, {
        status: "rejected",
      });
      setCollaborationRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, status: "rejected" } : r))
      );
    } catch (err) {
      console.error("Error rejecting request:", err);
    }
  };

  const toggleExpand = (requestId) => {
    setExpandedRequest(expandedRequest === requestId ? null : requestId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Collaboration Requests
          </h1>
          <p className="text-gray-400 mt-2">
            Manage incoming project collaboration requests
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search requests by name, project, or message..."
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
      <div className="space-y-4">
        {filteredRequests.map((request) => {
          const sender = request.sender || { name: "-", email: "-", id: "-" };

          return (
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
                        {sender.name}
                      </h3>
                      <p className="text-gray-400 text-sm">ID: {sender.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(request.status)}
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">Project</p>
                    <p className="text-white font-medium">
                      {request.projectTitle}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Requested Role</p>
                    <p className="text-white font-medium">
                      {request.requestedRole}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Submitted</p>
                    <p className="text-white">{formatDate(request.date)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Availability</p>
                    <p className="text-white">{request.availability}</p>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedRequest === request.id && (
                  <div className="space-y-4 pt-4 border-t border-[#334155]">
                    <div>
                      <p className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" /> Message
                      </p>
                      <p className="text-white bg-[#0F172A] p-4 rounded-lg">
                        {request.message}
                      </p>
                    </div>

                    {/* Skills & Technologies */}
                    <div>
                      <p className="text-gray-400 text-sm mb-2">
                        Skills & Technologies
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(request.skills || []).map((skill, index) => (
                          <span
                            key={index}
                            className="badge badge-outline badge-primary"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                          <Mail className="w-4 h-4" /> Email
                        </p>
                        <a
                          href={`mailto:${sender.email}`}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          {sender.email}
                        </a>
                      </div>
                      {request.portfolioLink && (
                        <div>
                          <p className="text-gray-400 text-sm mb-2">
                            Portfolio
                          </p>
                          <a
                            href={request.portfolioLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300"
                          >
                            View Portfolio
                          </a>
                        </div>
                      )}
                    </div>

                    {request.status === "pending" && (
                      <div className="flex gap-2 pt-4">
                        <button
                          onClick={() => handleAccept(request.id)}
                          className="btn btn-success btn-sm"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" /> Accept
                          Request
                        </button>
                        <button
                          onClick={() => handleReject(request.id)}
                          className="btn btn-error btn-sm"
                        >
                          <XCircle className="w-4 h-4 mr-1" /> Reject Request
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {expandedRequest !== request.id &&
                  request.status === "pending" && (
                    <div className="flex gap-2 pt-4">
                      <button
                        onClick={() => toggleExpand(request.id)}
                        className="btn btn-ghost btn-sm ml-auto"
                      >
                        View Details
                      </button>
                    </div>
                  )}
              </div>
            </div>
          );
        })}

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-400">
              No collaboration requests found
            </h3>
            <p className="text-gray-500 mt-2">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "You currently have no collaboration requests"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaborationRequest;
