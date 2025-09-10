import React, { useState, useEffect, useContext } from "react";
import {
  Search,
  User,
  Clock,
  CheckCircle,
  XCircle,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import { AuthContext } from "../Contexts/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const MentorshipRequests = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedRequest, setExpandedRequest] = useState(null);

  // Fetch mentorship requests for current mentor
  useEffect(() => {
    if (!user) return;

    const fetchRequests = async () => {
      try {
        const res = await axiosSecure.get("/api/mentorship-requests");
        // Filter by current mentor
        const myRequests = res.data.requests.filter(
          (req) => req.mentorId === user.uid
        );

        // Fetch full names for each sender
        const requestsWithNames = await Promise.all(
          myRequests.map(async (req) => {
            try {
              // First try student
              const studentRes = await axiosSecure.get(
                `/studentlist/${req.senderId}`
              );
              if (studentRes.data && studentRes.data.fullName) {
                return { ...req, senderName: studentRes.data.fullName };
              }
              // If not found, try alumni
              const alumniRes = await axiosSecure.get(
                `/alumnilist/${req.senderId}`
              );
              if (alumniRes.data && alumniRes.data.fullName) {
                return { ...req, senderName: alumniRes.data.fullName };
              }
              return { ...req, senderName: req.senderId }; // fallback
            } catch {
              return { ...req, senderName: req.senderId };
            }
          })
        );

        setRequests(requestsWithNames);
      } catch (err) {
        console.error("Error fetching mentorship requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user, axiosSecure]);

  const handleAccept = async (id) => {
    try {
      await axiosSecure.put(`/api/mentorship-request/${id}/status`, {
        status: "accepted",
      });
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "accepted" } : r))
      );
    } catch (err) {
      console.error("Error accepting request:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosSecure.put(`/api/mentorship-request/${id}/status`, {
        status: "rejected",
      });
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "rejected" } : r))
      );
    } catch (err) {
      console.error("Error rejecting request:", err);
    }
  };

  const toggleExpandRequest = (id) =>
    setExpandedRequest(expandedRequest === id ? null : id);

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.senderName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.mentorshipTitle
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.message?.toLowerCase().includes(searchTerm.toLowerCase());
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
    const Icon = config.icon;

    return (
      <span className={`badge ${config.color} gap-1`}>
        <Icon className="w-3 h-3" /> {config.text}
      </span>
    );
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (loading)
    return <div className="text-white text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen">
      <div className="max-w-screen-xl mx-auto px-5 lg:px-0 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Mentorship Requests
            </h1>
            <p className="text-gray-400 mt-2">
              Manage requests from students seeking guidance
            </p>
          </div>
        </div>

        {/* Requests List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="card bg-[#1E293B] border border-[#334155]"
            >
              <div className="card-body">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {request.senderName}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Mentorship: {request.mentorshipTitle}
                      </p>
                    </div>
                  </div>
                  <div>{getStatusBadge(request.status)}</div>
                </div>

                {expandedRequest === request.id && (
                  <div className="pt-4 border-t border-[#334155] space-y-2">
                    <p className="text-gray-400">Message:</p>
                    <p className="text-white bg-[#0F172A] p-2 rounded">
                      {request.message}
                    </p>
                    <p className="text-gray-400">Goals: {request.goals}</p>
                    <p className="text-gray-400">
                      Availability: {request.availability}
                    </p>
                    <p className="text-gray-400">
                      Skills: {request.skills.join(", ")}
                    </p>
                    {request.status === "pending" && (
                      <div className="flex gap-2 mt-2">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleAccept(request.id)}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-error btn-sm"
                          onClick={() => handleReject(request.id)}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {expandedRequest !== request.id &&
                  request.status === "pending" && (
                    <button
                      className="btn btn-ghost btn-sm mt-2"
                      onClick={() => toggleExpandRequest(request.id)}
                    >
                      <ChevronDown className="w-4 h-4 mr-1" /> View Details
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">No mentorship requests found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorshipRequests;
