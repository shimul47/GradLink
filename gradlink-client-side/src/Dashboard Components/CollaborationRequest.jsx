import React, { useState } from 'react';
import {
  Search,
  Filter,
  User,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Mail,
  Calendar,
  BookOpen,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const CollaborationRequest = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedRequest, setExpandedRequest] = useState(null);

  // Sample collaboration requests data
  const collaborationRequests = [
    {
      id: 1,
      studentName: "John Doe",
      studentId: "20341025",
      studentEmail: "john.doe@g.bracu.ac.bd",
      projectTitle: "AI-Powered Learning Platform",
      projectId: "proj_001",
      message: "I have 2 years of experience with React and machine learning. I've worked on similar educational technology projects and would love to contribute to this initiative. I'm particularly interested in the frontend development and AI integration aspects.",
      status: "pending",
      date: "2024-03-15T14:30:00Z",
      skills: ["React", "JavaScript", "Python", "Machine Learning"],
      requestedRole: "Frontend Developer",
      availability: "15-20 hours per week",
      portfolioLink: "https://portfolio.johndoe.com"
    },
    {
      id: 2,
      studentName: "Sarah Ahmed",
      studentId: "20341026",
      studentEmail: "sarah.ahmed@g.bracu.ac.bd",
      projectTitle: "Community Health App",
      projectId: "proj_002",
      message: "I'm a Flutter developer with healthcare app experience. I've built two healthcare applications during my internship and I'm passionate about using technology to improve community health outcomes.",
      status: "accepted",
      date: "2024-03-14T10:15:00Z",
      skills: ["Flutter", "Dart", "Firebase", "Healthcare"],
      requestedRole: "Mobile Developer",
      availability: "10-15 hours per week",
      portfolioLink: "https://github.com/sarahahmed"
    },
    {
      id: 3,
      studentName: "Mike Chen",
      studentId: "20341027",
      studentEmail: "mike.chen@g.bracu.ac.bd",
      projectTitle: "E-commerce Website Redesign",
      projectId: "proj_003",
      message: "I have 2 years of experience with Vue.js and backend development. I've completed several e-commerce projects and I'm familiar with payment integration and inventory management systems.",
      status: "rejected",
      date: "2024-03-13T16:45:00Z",
      skills: ["Vue.js", "Node.js", "MongoDB", "E-commerce"],
      requestedRole: "Full-stack Developer",
      availability: "20-25 hours per week",
      portfolioLink: "https://mikechen.dev"
    },
    {
      id: 4,
      studentName: "Aisha Khan",
      studentId: "20341028",
      studentEmail: "aisha.khan@g.bracu.ac.bd",
      projectTitle: "Renewable Energy Research",
      projectId: "proj_004",
      message: "I'm passionate about renewable energy and have background in electrical engineering. I've conducted research on solar panel efficiency and would love to contribute to data analysis and research paper writing.",
      status: "pending",
      date: "2024-03-12T09:20:00Z",
      skills: ["MATLAB", "Python", "Data Analysis", "Research"],
      requestedRole: "Research Assistant",
      availability: "12-18 hours per week",
      portfolioLink: "https://linkedin.com/in/aishakhan"
    }
  ];

  const filteredRequests = collaborationRequests.filter(request => {
    const matchesSearch = request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'badge-warning', text: 'Pending', icon: Clock },
      accepted: { color: 'badge-success', text: 'Accepted', icon: CheckCircle },
      rejected: { color: 'badge-error', text: 'Rejected', icon: XCircle }
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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAccept = (requestId) => {
    console.log(`Accepting request ${requestId}`);
    // API call to accept request
    alert(`Request ${requestId} accepted!`);
  };

  const handleReject = (requestId) => {
    console.log(`Rejecting request ${requestId}`);
    // API call to reject request
    alert(`Request ${requestId} rejected.`);
  };

  const toggleExpand = (requestId) => {
    setExpandedRequest(expandedRequest === requestId ? null : requestId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Collaboration Requests</h1>
          <p className="text-gray-400 mt-2">Manage incoming project collaboration requests</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-[#1E293B] border border-[#334155]">
          <div className="card-body p-4 text-center">
            <div className="text-2xl font-bold text-white">{collaborationRequests.length}</div>
            <p className="text-gray-400 text-sm">Total Requests</p>
          </div>
        </div>
        <div className="card bg-[#1E293B] border border-[#334155]">
          <div className="card-body p-4 text-center">
            <div className="text-2xl font-bold text-amber-400">
              {collaborationRequests.filter(r => r.status === 'pending').length}
            </div>
            <p className="text-gray-400 text-sm">Pending</p>
          </div>
        </div>
        <div className="card bg-[#1E293B] border border-[#334155]">
          <div className="card-body p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">
              {collaborationRequests.filter(r => r.status === 'accepted').length}
            </div>
            <p className="text-gray-400 text-sm">Accepted</p>
          </div>
        </div>
        <div className="card bg-[#1E293B] border border-[#334155]">
          <div className="card-body p-4 text-center">
            <div className="text-2xl font-bold text-red-400">
              {collaborationRequests.filter(r => r.status === 'rejected').length}
            </div>
            <p className="text-gray-400 text-sm">Rejected</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
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
        {filteredRequests.map((request) => (
          <div key={request.id} className="card bg-[#1E293B] border border-[#334155]">
            <div className="card-body">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{request.studentName}</h3>
                    <p className="text-gray-400 text-sm">ID: {request.studentId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(request.status)}
                  <button
                    onClick={() => toggleExpand(request.id)}
                    className="btn btn-ghost btn-sm"
                  >
                    {expandedRequest === request.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-sm">Project</p>
                  <p className="text-white font-medium">{request.projectTitle}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Requested Role</p>
                  <p className="text-white font-medium">{request.requestedRole}</p>
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
                  {/* Message */}
                  <div>
                    <p className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Message
                    </p>
                    <p className="text-white bg-[#0F172A] p-4 rounded-lg">
                      {request.message}
                    </p>
                  </div>

                  {/* Skills */}
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Skills & Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {request.skills.map((skill, index) => (
                        <span key={index} className="badge badge-outline badge-primary">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </p>
                      <a
                        href={`mailto:${request.studentEmail}`}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        {request.studentEmail}
                      </a>
                    </div>
                    {request.portfolioLink && (
                      <div>
                        <p className="text-gray-400 text-sm mb-2">Portfolio</p>
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

                  {/* Action Buttons for Pending Requests */}
                  {request.status === 'pending' && (
                    <div className="flex gap-2 pt-4">
                      <button
                        onClick={() => handleAccept(request.id)}
                        className="btn btn-success btn-sm"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Accept Request
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="btn btn-error btn-sm"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject Request
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Quick Actions (Collapsed) */}
              {expandedRequest !== request.id && request.status === 'pending' && (
                <div className="flex gap-2 pt-4">
                  <button
                    onClick={() => handleAccept(request.id)}
                    className="btn btn-success btn-sm"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="btn btn-error btn-sm"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
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
        ))}

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-400">No collaboration requests found</h3>
            <p className="text-gray-500 mt-2">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'You currently have no collaboration requests'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaborationRequest;