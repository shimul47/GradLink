import React, { useState } from 'react';
import {
  Search,
  User,
  GraduationCap,
  Briefcase,
  FileText,
  Plus,
  X,
  Mail,
  Clock,
  Calendar,
  MapPin,
  Star,
  Send,
  BookOpen,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const AskRecommendations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedRequest, setExpandedRequest] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState(null);

  // Sample alumni data that students can request recommendations from
  const alumniList = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Senior Frontend Developer at TechCorp",
      expertise: "Web Development, React, JavaScript",
      graduationYear: "2018",
      program: "Computer Science",
      currentCompany: "TechCorp",
      email: "sarah.johnson@alumni.edu",
      connection: "Former Professor",
      courses: ["Web Development", "Advanced JavaScript"],
      rating: 4.8,
      responseRate: "95%",
      averageResponseTime: "2 days"
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      title: "Data Scientist at AnalyticsCo",
      expertise: "Data Science, Machine Learning, Python",
      graduationYear: "2016",
      program: "Data Science",
      currentCompany: "AnalyticsCo",
      email: "michael.chen@alumni.edu",
      connection: "Thesis Advisor",
      courses: ["Data Structures", "Machine Learning"],
      rating: 4.9,
      responseRate: "98%",
      averageResponseTime: "1 day"
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      title: "Lead UX Designer at CreativeStudio",
      expertise: "UI/UX Design, User Research, Figma",
      graduationYear: "2019",
      program: "Design",
      currentCompany: "CreativeStudio",
      email: "maria.rodriguez@alumni.edu",
      connection: "Project Mentor",
      courses: ["Design Thinking", "User Experience"],
      rating: 4.7,
      responseRate: "90%",
      averageResponseTime: "3 days"
    },
    {
      id: 4,
      name: "David Wilson",
      title: "Software Engineering Manager at CodeCrafters",
      expertise: "Software Architecture, Node.js, Team Leadership",
      graduationYear: "2015",
      program: "Software Engineering",
      currentCompany: "CodeCrafters",
      email: "david.wilson@alumni.edu",
      connection: "Career Advisor",
      courses: ["Software Engineering", "System Design"],
      rating: 4.6,
      responseRate: "85%",
      averageResponseTime: "4 days"
    }
  ];

  // Sample recommendation requests made by the student
  const myRecommendationRequests = [
    {
      id: 1,
      alumniName: "Dr. Sarah Johnson",
      alumniTitle: "Senior Frontend Developer at TechCorp",
      requestType: "Internship Application",
      company: "Tech Innovations Inc",
      position: "Frontend Developer Intern",
      deadline: "2024-04-15",
      status: "pending",
      date: "2024-03-15",
      message: "I'm applying for a frontend developer internship at Tech Innovations and would greatly appreciate your recommendation. I've taken your Web Development course last semester and really enjoyed your teaching style."
    },
    {
      id: 2,
      alumniName: "Prof. Michael Chen",
      alumniTitle: "Data Scientist at AnalyticsCo",
      requestType: "Graduate School Application",
      university: "Stanford University",
      programName: "MS in Computer Science",
      deadline: "2024-03-30",
      status: "accepted",
      date: "2024-03-12",
      message: "I'm applying to Stanford's MS in Computer Science program and would be honored if you could write me a recommendation letter. I was your teaching assistant for the Data Structures course last year."
    },
    {
      id: 3,
      alumniName: "Maria Rodriguez",
      alumniTitle: "Lead UX Designer at CreativeStudio",
      requestType: "Job Application",
      company: "Global Analytics Corp",
      position: "Junior Data Analyst",
      deadline: "2024-04-05",
      status: "rejected",
      date: "2024-03-05",
      message: "I'm applying for a data analyst position at Global Analytics Corp and would appreciate your recommendation. I particularly enjoyed your Business Intelligence course and applied those concepts in my capstone project."
    }
  ];

  // New recommendation request form state
  const [requestForm, setRequestForm] = useState({
    alumniId: '',
    requestType: '',
    company: '',
    position: '',
    university: '',
    programName: '',
    scholarship: '',
    organization: '',
    deadline: '',
    message: '',
    documents: []
  });

  const filteredAlumni = alumniList.filter(alumni => {
    return alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.expertise.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.program.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredRequests = myRecommendationRequests.filter(request => {
    const matchesSearch = request.alumniName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requestType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      'pending': { color: 'badge-warning', text: 'Pending' },
      'accepted': { color: 'badge-success', text: 'Accepted' },
      'rejected': { color: 'badge-error', text: 'Rejected' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return <span className={`badge ${config.color}`}>{config.text}</span>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequestForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAlumniSelect = (alumni) => {
    setSelectedAlumni(alumni);
    setRequestForm(prev => ({ ...prev, alumniId: alumni.id }));
    setShowRequestForm(true);
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    console.log('Submitting recommendation request:', requestForm);
    // API call to submit request
    alert('Recommendation request sent successfully!');
    setShowRequestForm(false);
    setSelectedAlumni(null);
    setRequestForm({
      alumniId: '',
      requestType: '',
      company: '',
      position: '',
      university: '',
      programName: '',
      scholarship: '',
      organization: '',
      deadline: '',
      message: '',
      documents: []
    });
  };

  const stats = {
    totalRequests: myRecommendationRequests.length,
    pendingRequests: myRecommendationRequests.filter(r => r.status === 'pending').length,
    acceptedRequests: myRecommendationRequests.filter(r => r.status === 'accepted').length,
    rejectedRequests: myRecommendationRequests.filter(r => r.status === 'rejected').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Request Recommendations</h1>
            <p className="text-gray-400 mt-2">Ask alumni for recommendation letters</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: stats.totalRequests, label: 'Total Requests', color: 'text-white', icon: <FileText className="w-5 h-5" /> },
            { value: stats.pendingRequests, label: 'Pending', color: 'text-amber-400', icon: <Clock className="w-5 h-5" /> },
            { value: stats.acceptedRequests, label: 'Accepted', color: 'text-emerald-400', icon: <Star className="w-5 h-5" /> },
            { value: stats.rejectedRequests, label: 'Rejected', color: 'text-red-400', icon: <X className="w-5 h-5" /> }
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
              placeholder="Search alumni by name, expertise, or program..."
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

        {/* Alumni List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAlumni.map((alumni) => (
            <div key={alumni.id} className="card bg-[#1E293B] border border-[#334155] hover:border-blue-400 transition-all duration-300">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{alumni.name}</h3>
                    <p className="text-gray-400 text-sm">{alumni.title}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-400">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    <span>{alumni.program} ({alumni.graduationYear})</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <span>{alumni.currentCompany}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Star className="w-4 h-4 mr-2 text-amber-400" />
                    <span>{alumni.rating}/5.0 • {alumni.responseRate} response rate</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Avg. response: {alumni.averageResponseTime}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-300 font-medium mb-2">Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {alumni.expertise.split(', ').map((skill, index) => (
                      <span key={index} className="badge badge-outline badge-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-300 font-medium mb-2">Connection</p>
                  <p className="text-gray-400">{alumni.connection}</p>
                  {alumni.courses && (
                    <p className="text-gray-400 text-sm mt-1">
                      Courses: {alumni.courses.join(', ')}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => handleAlumniSelect(alumni)}
                  className="btn bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white w-full"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Request Recommendation
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* My Requests Section */}
        <div className="divider text-gray-400">My Recommendation Requests</div>

        <div className="grid grid-cols-1 gap-6">
          {filteredRequests.map((request) => (
            <div key={request.id} className="card bg-[#1E293B] border border-[#334155]">
              <div className="card-body">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-white">{request.alumniName}</h3>
                    <p className="text-gray-400 text-sm">{request.alumniTitle}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(request.status)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">Request Type</p>
                    <p className="text-white font-medium">{request.requestType}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Deadline</p>
                    <p className="text-white">{formatDate(request.deadline)}</p>
                  </div>
                  {request.company && (
                    <div>
                      <p className="text-gray-400 text-sm">Company</p>
                      <p className="text-white">{request.company} - {request.position}</p>
                    </div>
                  )}
                  {request.university && (
                    <div>
                      <p className="text-gray-400 text-sm">University</p>
                      <p className="text-white">{request.university} - {request.programName}</p>
                    </div>
                  )}
                </div>

                {expandedRequest === request.id && (
                  <div className="space-y-4 pt-4 border-t border-[#334155]">
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Your Message</p>
                      <p className="text-white bg-[#0F172A] p-4 rounded-lg">
                        {request.message}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <button
                    onClick={() => setExpandedRequest(expandedRequest === request.id ? null : request.id)}
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

        {filteredAlumni.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              {searchTerm
                ? 'No matching alumni found'
                : 'No alumni available'
              }
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? 'Try adjusting your search criteria'
                : 'Check back later for alumni connections'
              }
            </p>
          </div>
        )}

        {/* Recommendation Request Modal */}
        {showRequestForm && selectedAlumni && (
          <div className="modal modal-open">
            <div className="modal-box bg-[#1E293B] border border-[#334155] max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-white">
                  Request Recommendation from {selectedAlumni.name}
                </h3>
                <button
                  className="btn btn-ghost btn-circle btn-sm"
                  onClick={() => setShowRequestForm(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">Request Type *</span>
                  </label>
                  <select
                    name="requestType"
                    value={requestForm.requestType}
                    onChange={handleInputChange}
                    className="select select-bordered bg-[#1E293B] border-[#334155] text-white"
                    required
                  >
                    <option value="">Select request type</option>
                    <option value="Internship Application">Internship Application</option>
                    <option value="Job Application">Job Application</option>
                    <option value="Graduate School Application">Graduate School Application</option>
                    <option value="Scholarship Application">Scholarship Application</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {requestForm.requestType === 'Internship Application' || requestForm.requestType === 'Job Application' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-gray-300">Company *</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={requestForm.company}
                        onChange={handleInputChange}
                        placeholder="Company name"
                        className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-gray-300">Position *</span>
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={requestForm.position}
                        onChange={handleInputChange}
                        placeholder="Position title"
                        className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                        required
                      />
                    </div>
                  </div>
                ) : requestForm.requestType === 'Graduate School Application' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-gray-300">University *</span>
                      </label>
                      <input
                        type="text"
                        name="university"
                        value={requestForm.university}
                        onChange={handleInputChange}
                        placeholder="University name"
                        className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-gray-300">Program *</span>
                      </label>
                      <input
                        type="text"
                        name="programName"
                        value={requestForm.programName}
                        onChange={handleInputChange}
                        placeholder="Program name"
                        className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                        required
                      />
                    </div>
                  </div>
                ) : requestForm.requestType === 'Scholarship Application' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-gray-300">Scholarship *</span>
                      </label>
                      <input
                        type="text"
                        name="scholarship"
                        value={requestForm.scholarship}
                        onChange={handleInputChange}
                        placeholder="Scholarship name"
                        className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-gray-300">Organization *</span>
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={requestForm.organization}
                        onChange={handleInputChange}
                        placeholder="Organization name"
                        className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                        required
                      />
                    </div>
                  </div>
                ) : null}

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">Deadline *</span>
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={requestForm.deadline}
                    onChange={handleInputChange}
                    className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">Your Message *</span>
                  </label>
                  <textarea
                    name="message"
                    value={requestForm.message}
                    onChange={handleInputChange}
                    placeholder="Explain why you're requesting a recommendation and provide any relevant context..."
                    rows={4}
                    className="textarea textarea-bordered bg-[#1E293B] border-[#334155] text-white"
                    required
                  />
                </div>

                <div className="modal-action">
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setShowRequestForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white"
                  >
                    <Send className="w-4 h-4 mr-1" />
                    Send Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AskRecommendations;