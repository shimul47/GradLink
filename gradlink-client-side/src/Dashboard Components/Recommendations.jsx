import React, { useState } from 'react';
import {
  Search,
  Filter,
  User,
  Clock,
  CheckCircle,
  XCircle,
  Mail,
  BookOpen,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Briefcase,
  FileText,
  Download,
  Star,
  MapPin
} from 'lucide-react';

const Recommendations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedRequest, setExpandedRequest] = useState(null);

  // Sample recommendation requests data
  const recommendationRequests = [
    {
      id: 1,
      studentName: "Alex Johnson",
      studentId: "STU-2024-001",
      studentEmail: "alex.johnson@student.edu",
      program: "Computer Science",
      graduationYear: "2025",
      requestType: "Internship Application",
      company: "Tech Innovations Inc",
      position: "Frontend Developer Intern",
      deadline: "2024-04-15",
      message: "I'm applying for a frontend developer internship at Tech Innovations and would greatly appreciate your recommendation. I've taken your Web Development course last semester and really enjoyed your teaching style.",
      status: "pending",
      date: "2024-03-15",
      documents: ["Resume.pdf", "Transcript.pdf"],
      skills: ["React", "JavaScript", "HTML/CSS", "Git"],
      projects: ["E-commerce Website", "Weather App", "Task Management System"]
    },
    {
      id: 2,
      studentName: "Maria Garcia",
      studentId: "STU-2024-002",
      studentEmail: "maria.garcia@student.edu",
      program: "Data Science",
      graduationYear: "2024",
      requestType: "Graduate School Application",
      university: "Stanford University",
      programName: "MS in Computer Science",
      deadline: "2024-03-30",
      message: "I'm applying to Stanford's MS in Computer Science program and would be honored if you could write me a recommendation letter. I was your teaching assistant for the Data Structures course last year.",
      status: "pending",
      date: "2024-03-12",
      documents: ["Statement_of_Purpose.pdf", "Resume.pdf", "Transcript.pdf"],
      skills: ["Python", "Machine Learning", "Data Analysis", "SQL"],
      projects: ["Predictive Analytics Model", "Data Visualization Tool"]
    },
    {
      id: 3,
      studentName: "James Wilson",
      studentId: "STU-2024-003",
      studentEmail: "james.wilson@student.edu",
      program: "Business Analytics",
      graduationYear: "2024",
      requestType: "Job Application",
      company: "Global Analytics Corp",
      position: "Junior Data Analyst",
      deadline: "2024-04-05",
      message: "I'm applying for a data analyst position at Global Analytics Corp and would appreciate your recommendation. I particularly enjoyed your Business Intelligence course and applied those concepts in my capstone project.",
      status: "accepted",
      date: "2024-03-05",
      documents: ["Resume.pdf", "Cover_Letter.pdf"],
      skills: ["Excel", "Tableau", "SQL", "Statistics"],
      projects: ["Sales Performance Dashboard", "Customer Segmentation Analysis"]
    },
    {
      id: 4,
      studentName: "Sarah Chen",
      studentId: "STU-2024-004",
      studentEmail: "sarah.chen@student.edu",
      program: "UX Design",
      graduationYear: "2026",
      requestType: "Scholarship Application",
      scholarship: "Design Excellence Award",
      organization: "Creative Design Foundation",
      deadline: "2024-05-10",
      message: "I'm applying for the Design Excellence Scholarship and would be grateful for your recommendation. Your feedback on my portfolio during office hours was incredibly helpful in refining my design approach.",
      status: "rejected",
      date: "2024-03-08",
      documents: ["Portfolio.pdf", "Essay.pdf"],
      skills: ["Figma", "User Research", "Wireframing", "Prototyping"],
      projects: ["Mobile App Redesign", "Accessibility Audit", "Design System"]
    }
  ];

  const filteredRequests = recommendationRequests.filter(request => {
    const matchesSearch = request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requestType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.company && request.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (request.university && request.university.toLowerCase().includes(searchTerm.toLowerCase()));
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
    console.log(`Accepting recommendation request ${requestId}`);
    // API call to accept request
    // Update the status in the UI
    const updatedRequests = recommendationRequests.map(request =>
      request.id === requestId ? { ...request, status: 'accepted' } : request
    );
    // In a real app, you would set state with updatedRequests
  };

  const handleReject = (requestId) => {
    console.log(`Rejecting recommendation request ${requestId}`);
    // API call to reject request
    // Update the status in the UI
    const updatedRequests = recommendationRequests.map(request =>
      request.id === requestId ? { ...request, status: 'rejected' } : request
    );
    // In a real app, you would set state with updatedRequests
  };

  const toggleExpandRequest = (requestId) => {
    setExpandedRequest(expandedRequest === requestId ? null : requestId);
  };

  const downloadDocument = (documentName) => {
    console.log(`Downloading ${documentName}`);
    // API call to download document
  };

  const stats = {
    totalRequests: recommendationRequests.length,
    pendingRequests: recommendationRequests.filter(r => r.status === 'pending').length,
    acceptedRequests: recommendationRequests.filter(r => r.status === 'accepted').length,
    rejectedRequests: recommendationRequests.filter(r => r.status === 'rejected').length
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-screen-xl px-5 lg:px-0 mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Recommendation Requests</h1>
            <p className="text-gray-400 mt-2">Manage requests from students for recommendations</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: stats.totalRequests, label: 'Total Requests', color: 'text-white', icon: <FileText className="w-5 h-5" /> },
            { value: stats.pendingRequests, label: 'Pending', color: 'text-amber-400', icon: <Clock className="w-5 h-5" /> },
            { value: stats.acceptedRequests, label: 'Accepted', color: 'text-emerald-400', icon: <CheckCircle className="w-5 h-5" /> },
            { value: stats.rejectedRequests, label: 'Rejected', color: 'text-red-400', icon: <XCircle className="w-5 h-5" /> }
          ].map((stat, index) => (
            <div key={index} className="card bg-[#1E293B] border border-[#334155] shadow-lg">
              <div className="card-body p-4 flex flex-row items-center">
                <div className={`rounded-lg p-2 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="ml-3">
                  <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
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
                    <p className="text-gray-400 text-sm">Request Type</p>
                    <p className="text-white font-medium">{request.requestType}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Deadline</p>
                    <p className="text-white">{formatDate(request.deadline)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Program</p>
                    <p className="text-white">{request.program} ({request.graduationYear})</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Submitted</p>
                    <p className="text-white">{formatDate(request.date)}</p>
                  </div>
                </div>

                {/* Application Details */}
                <div className="mb-4">
                  {request.company && (
                    <div className="flex items-center text-gray-400 mb-2">
                      <Briefcase className="w-4 h-4 mr-2" />
                      <span>{request.company} - {request.position}</span>
                    </div>
                  )}
                  {request.university && (
                    <div className="flex items-center text-gray-400 mb-2">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      <span>{request.university} - {request.programName}</span>
                    </div>
                  )}
                  {request.scholarship && (
                    <div className="flex items-center text-gray-400">
                      <Star className="w-4 h-4 mr-2" />
                      <span>{request.scholarship} - {request.organization}</span>
                    </div>
                  )}
                </div>

                {/* Expanded Details */}
                {expandedRequest === request.id && (
                  <div className="space-y-4 pt-4 border-t border-[#334155]">
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Student Message</p>
                      <p className="text-white bg-[#0F172A] p-4 rounded-lg">
                        {request.message}
                      </p>
                    </div>

                    {/* Documents */}
                    {request.documents && request.documents.length > 0 && (
                      <div>
                        <p className="text-gray-400 text-sm mb-2">Attached Documents</p>
                        <div className="flex flex-wrap gap-2">
                          {request.documents.map((doc, index) => (
                            <button
                              key={index}
                              onClick={() => downloadDocument(doc)}
                              className="badge badge-outline badge-primary gap-1 hover:badge-primary hover:text-white cursor-pointer"
                            >
                              <Download className="w-3 h-3" />
                              {doc}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    {request.skills && request.skills.length > 0 && (
                      <div>
                        <p className="text-gray-400 text-sm mb-2">Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {request.skills.map((skill, index) => (
                            <span key={index} className="badge badge-outline badge-info">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Projects */}
                    {request.projects && request.projects.length > 0 && (
                      <div>
                        <p className="text-gray-400 text-sm mb-2">Relevant Projects</p>
                        <ul className="list-disc list-inside text-gray-400">
                          {request.projects.map((project, index) => (
                            <li key={index}>{project}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                          <Mail className="w-4 h-4" /> Email
                        </p>
                        <a
                          href={`mailto:${request.studentEmail}`}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          {request.studentEmail}
                        </a>
                      </div>
                    </div>

                    {/* Action Buttons */}
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

                {/* Expand/Collapse Button */}
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

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              {searchTerm || statusFilter !== 'all'
                ? 'No matching requests found'
                : 'No recommendation requests yet'
              }
            </h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Students will appear here when they request recommendations'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;