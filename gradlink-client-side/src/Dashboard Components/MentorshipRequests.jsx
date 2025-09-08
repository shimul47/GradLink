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
  BookOpen,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const MentorshipRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedRequest, setExpandedRequest] = useState(null);

  // Sample mentorship requests data
  const mentorshipRequests = [
    {
      id: 1,
      studentName: "Alex Johnson",
      studentId: "STU-2024-001",
      studentEmail: "alex.johnson@student.edu",
      requestedMentorship: "Web Development Career Guidance",
      message: "I'm a second-year computer science student looking to specialize in frontend development. I've learned HTML, CSS, and JavaScript basics but need guidance on what to focus on next and how to build a portfolio that stands out.",
      skills: ["HTML", "CSS", "JavaScript", "React Basics"],
      goals: "Get a frontend internship, Build a portfolio, Learn industry best practices",
      status: "pending",
      date: "2024-03-15",
      availability: "Weekends",
      commitment: "5-10 hours per week"
    },
    {
      id: 2,
      studentName: "Maria Garcia",
      studentId: "STU-2024-002",
      studentEmail: "maria.garcia@student.edu",
      requestedMentorship: "Data Science Fundamentals",
      message: "I'm transitioning from biology to data science and feel overwhelmed by all the learning resources available. I need help creating a structured learning path and understanding which skills are most important for entry-level positions.",
      skills: ["Python", "Pandas", "Statistics", "Biology background"],
      goals: "Career transition to data science, Build practical projects, Prepare for job applications",
      status: "pending",
      date: "2024-03-12",
      availability: "Weekdays after 6PM",
      commitment: "8-12 hours per week"
    },
    {
      id: 3,
      studentName: "James Wilson",
      studentId: "STU-2024-003",
      studentEmail: "james.wilson@student.edu",
      requestedMentorship: "UX/Design Portfolio Review",
      message: "I've completed several design projects during my studies but struggling to present them effectively in my portfolio. I'd appreciate feedback on my current portfolio and advice on how to improve it for job applications.",
      skills: ["Figma", "UI Design", "User Research", "Wireframing"],
      goals: "Improve portfolio, Get design internship, Learn industry standards",
      status: "accepted",
      date: "2024-03-05",
      availability: "Flexible",
      commitment: "3-5 hours per week"
    }
  ];

  const filteredRequests = mentorshipRequests.filter(request => {
    const matchesSearch = request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requestedMentorship.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      'pending': { color: 'badge-warning', text: 'Pending', icon: Clock },
      'accepted': { color: 'badge-success', text: 'Accepted', icon: CheckCircle },
      'rejected': { color: 'badge-error', text: 'Rejected', icon: XCircle }
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
      day: 'numeric'
    });
  };

  const handleAccept = (requestId) => {
    console.log(`Accepting mentorship request ${requestId}`);
    // API call to accept request
  };

  const handleReject = (requestId) => {
    console.log(`Rejecting mentorship request ${requestId}`);
    // API call to reject request
  };

  const toggleExpandRequest = (requestId) => {
    setExpandedRequest(expandedRequest === requestId ? null : requestId);
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-screen-xl mx-auto px-5 lg:px-0 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Mentorship Requests</h1>
            <p className="text-gray-400 mt-2">Manage requests from students seeking guidance</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card bg-[#1E293B] border border-[#334155]">
            <div className="card-body p-4 text-center">
              <div className="text-2xl font-bold text-white">{mentorshipRequests.length}</div>
              <p className="text-gray-400 text-sm">Total Requests</p>
            </div>
          </div>
          <div className="card bg-[#1E293B] border border-[#334155]">
            <div className="card-body p-4 text-center">
              <div className="text-2xl font-bold text-amber-400">
                {mentorshipRequests.filter(r => r.status === 'pending').length}
              </div>
              <p className="text-gray-400 text-sm">Pending</p>
            </div>
          </div>
          <div className="card bg-[#1E293B] border border-[#334155]">
            <div className="card-body p-4 text-center">
              <div className="text-2xl font-bold text-emerald-400">
                {mentorshipRequests.filter(r => r.status === 'accepted').length}
              </div>
              <p className="text-gray-400 text-sm">Accepted</p>
            </div>
          </div>
          <div className="card bg-[#1E293B] border border-[#334155]">
            <div className="card-body p-4 text-center">
              <div className="text-2xl font-bold text-red-400">
                {mentorshipRequests.filter(r => r.status === 'rejected').length}
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
              placeholder="Search requests by student name or mentorship topic..."
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
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">Requested Mentorship</p>
                    <p className="text-white font-medium">{request.requestedMentorship}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Submitted</p>
                    <p className="text-white">{formatDate(request.date)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Availability</p>
                    <p className="text-white">{request.availability}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Time Commitment</p>
                    <p className="text-white">{request.commitment}</p>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedRequest === request.id && (
                  <div className="space-y-4 pt-4 border-t border-[#334155]">
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Message</p>
                      <p className="text-white bg-[#0F172A] p-4 rounded-lg">
                        {request.message}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400 text-sm mb-2">Current Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {request.skills.map((skill, index) => (
                          <span key={index} className="badge badge-outline badge-primary">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-400 text-sm mb-2">Learning Goals</p>
                      <p className="text-white">{request.goals}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm mb-2">Email</p>
                        <a
                          href={`mailto:${request.studentEmail}`}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          {request.studentEmail}
                        </a>
                      </div>
                    </div>

                    {request.status === 'pending' && (
                      <div className="flex gap-2 pt-4">
                        <button
                          onClick={() => handleAccept(request.id)}
                          className="btn btn-success btn-sm"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" /> Accept Request
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

                {expandedRequest !== request.id && request.status === 'pending' && (
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
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              {searchTerm || statusFilter !== 'all'
                ? 'No matching requests found'
                : 'No mentorship requests yet'
              }
            </h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Students will appear here when they request your mentorship'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorshipRequests;