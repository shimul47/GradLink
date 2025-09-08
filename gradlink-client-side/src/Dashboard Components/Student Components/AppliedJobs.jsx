import React, { useState } from 'react';
import {
  Search,
  Filter,
  Building,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Star,
  User,
  Mail,
  Phone,
  ExternalLink
} from 'lucide-react';

const AppliedJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedJob, setExpandedJob] = useState(null);

  // Sample applied jobs data
  const appliedJobs = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA (Remote)",
      type: "Internship",
      salary: "$25 - $35/hour",
      appliedDate: "2024-03-15",
      status: "under-review",
      applicationStatus: "Application under review",
      description: "Join our dynamic frontend team to build responsive web applications using modern frameworks.",
      requirements: ["React", "JavaScript", "CSS", "Git"],
      applicationMaterials: {
        resume: "resume_tech_innovations.pdf",
        coverLetter: "cover_letter_tech_innovations.pdf",
        portfolio: "portfolio_tech_innovations.pdf"
      },
      contact: {
        name: "Sarah Johnson",
        title: "HR Manager",
        email: "sarah.johnson@techinnovations.com",
        phone: "(555) 123-4567"
      },
      interviewDate: "2024-03-25",
      notes: "Mentioned my React project during application"
    },
    {
      id: 2,
      title: "Junior Data Analyst",
      company: "Data Insights Corp",
      location: "New York, NY",
      type: "Full-time",
      salary: "$65,000 - $75,000",
      appliedDate: "2024-03-10",
      status: "interview",
      applicationStatus: "Interview scheduled",
      description: "Analyze large datasets to extract business insights and support data-driven decision making.",
      requirements: ["Python", "SQL", "Excel", "Tableau", "Statistics"],
      applicationMaterials: {
        resume: "resume_data_insights.pdf",
        coverLetter: "cover_letter_data_insights.pdf"
      },
      contact: {
        name: "Michael Chen",
        title: "Data Team Lead",
        email: "michael.chen@datainsights.com",
        phone: "(555) 987-6543"
      },
      interviewDate: "2024-03-20",
      notes: "Prepare for SQL technical questions"
    },
    {
      id: 3,
      title: "UX Design Intern",
      company: "Creative Solutions LLC",
      location: "Austin, TX (Hybrid)",
      type: "Internship",
      salary: "$20 - $30/hour",
      appliedDate: "2024-03-05",
      status: "rejected",
      applicationStatus: "Not selected",
      description: "Design user interfaces and experiences for our digital products across web and mobile platforms.",
      requirements: ["Figma", "UI Design", "User Research", "Wireframing"],
      applicationMaterials: {
        resume: "resume_creative_solutions.pdf",
        coverLetter: "cover_letter_creative_solutions.pdf",
        portfolio: "portfolio_creative_solutions.pdf"
      },
      contact: {
        name: "Emily Rodriguez",
        title: "Design Director",
        email: "emily.rodriguez@creativesolutions.com",
        phone: "(555) 456-7890"
      },
      feedback: "While your portfolio shows promise, we're looking for candidates with more experience in user testing methodologies."
    },
    {
      id: 4,
      title: "Software Engineering Apprentice",
      company: "CodeCrafters",
      location: "Remote",
      type: "Apprenticeship",
      salary: "$50,000 - $60,000",
      appliedDate: "2024-03-18",
      status: "accepted",
      applicationStatus: "Offer extended",
      description: "12-month apprenticeship program with training and hands-on experience in software development.",
      requirements: ["JavaScript", "Node.js", "Git", "Problem Solving"],
      applicationMaterials: {
        resume: "resume_codecrafters.pdf",
        coverLetter: "cover_letter_codecrafters.pdf"
      },
      contact: {
        name: "David Wilson",
        title: "Apprenticeship Program Manager",
        email: "david.wilson@codecrafters.com",
        phone: "(555) 234-5678"
      },
      offerDetails: {
        salary: "$55,000",
        startDate: "2024-04-15",
        benefits: ["Health insurance", "Flexible hours", "Learning budget"]
      },
      notes: "Need to respond by March 30th"
    }
  ];

  const filteredJobs = appliedJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      'under-review': { color: 'badge-warning', text: 'Under Review', icon: Clock },
      'interview': { color: 'badge-info', text: 'Interview', icon: Calendar },
      'accepted': { color: 'badge-success', text: 'Accepted', icon: CheckCircle },
      'rejected': { color: 'badge-error', text: 'Rejected', icon: XCircle }
    };
    const config = statusConfig[status] || statusConfig['under-review'];
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

  const getStatusCounts = () => {
    return {
      total: appliedJobs.length,
      underReview: appliedJobs.filter(job => job.status === 'under-review').length,
      interview: appliedJobs.filter(job => job.status === 'interview').length,
      accepted: appliedJobs.filter(job => job.status === 'accepted').length,
      rejected: appliedJobs.filter(job => job.status === 'rejected').length
    };
  };

  const statusCounts = getStatusCounts();

  const toggleExpandJob = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const downloadDocument = (documentName) => {
    console.log(`Downloading ${documentName}`);
    // API call to download document
  };

  const viewJobDetails = (jobId) => {
    console.log(`Viewing details for job ${jobId}`);
    // Navigate to job details page
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-screen-xl px-5 lg:px-5 mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Applied Jobs</h1>
            <p className="text-gray-400 mt-2">Track your job applications and status</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { value: statusCounts.total, label: 'Total Applications', color: 'text-white', icon: <FileText className="w-5 h-5" /> },
            { value: statusCounts.underReview, label: 'Under Review', color: 'text-amber-400', icon: <Clock className="w-5 h-5" /> },
            { value: statusCounts.interview, label: 'Interviews', color: 'text-blue-400', icon: <Calendar className="w-5 h-5" /> },
            { value: statusCounts.accepted, label: 'Accepted', color: 'text-emerald-400', icon: <CheckCircle className="w-5 h-5" /> },
            { value: statusCounts.rejected, label: 'Rejected', color: 'text-red-400', icon: <XCircle className="w-5 h-5" /> }
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
              placeholder="Search applied jobs by title, company, or location..."
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
            <option value="under-review">Under Review</option>
            <option value="interview">Interview</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Applied Jobs List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="card bg-[#1E293B] border border-[#334155] hover:border-blue-400 transition-all duration-300">
              <div className="card-body">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="card-title text-white text-xl">{job.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">{job.company}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400">{job.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(job.status)}
                  </div>
                </div>

                {/* Job Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Applied {formatDate(job.appliedDate)}</span>
                  </div>
                </div>

                {/* Status Message */}
                <div className="mb-4">
                  <p className={`font-medium ${job.status === 'accepted' ? 'text-emerald-400' :
                    job.status === 'rejected' ? 'text-red-400' :
                      job.status === 'interview' ? 'text-blue-400' : 'text-amber-400'
                    }`}>
                    {job.applicationStatus}
                  </p>
                  {job.interviewDate && (
                    <p className="text-gray-400 mt-1">
                      Interview scheduled for {formatDate(job.interviewDate)}
                    </p>
                  )}
                </div>

                {/* Expanded Details */}
                {expandedJob === job.id && (
                  <div className="space-y-4 pt-4 border-t border-[#334155]">
                    {/* Job Description */}
                    <div>
                      <p className="text-gray-300 font-medium mb-2">Job Description</p>
                      <p className="text-gray-400">{job.description}</p>
                    </div>

                    {/* Requirements */}
                    <div>
                      <p className="text-gray-300 font-medium mb-2">Requirements</p>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.map((req, index) => (
                          <span key={index} className="badge badge-outline badge-sm">
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Application Materials */}
                    <div>
                      <p className="text-gray-300 font-medium mb-2">Application Materials</p>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(job.applicationMaterials).map(([type, filename], index) => (
                          <button
                            key={index}
                            onClick={() => downloadDocument(filename)}
                            className="badge badge-outline badge-primary gap-1 hover:badge-primary hover:text-white cursor-pointer"
                          >
                            <FileText className="w-3 h-3" />
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                      <p className="text-gray-300 font-medium mb-2">Contact Information</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center text-gray-400">
                          <User className="w-4 h-4 mr-2" />
                          <span>{job.contact.name} ({job.contact.title})</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <Mail className="w-4 h-4 mr-2" />
                          <a href={`mailto:${job.contact.email}`} className="text-blue-400 hover:text-blue-300">
                            {job.contact.email}
                          </a>
                        </div>
                        {job.contact.phone && (
                          <div className="flex items-center text-gray-400">
                            <Phone className="w-4 h-4 mr-2" />
                            <span>{job.contact.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Additional Information */}
                    {job.offerDetails && (
                      <div>
                        <p className="text-gray-300 font-medium mb-2">Offer Details</p>
                        <div className="text-gray-400 space-y-2">
                          <p>Salary: {job.offerDetails.salary}</p>
                          <p>Start Date: {formatDate(job.offerDetails.startDate)}</p>
                          <p>Benefits: {job.offerDetails.benefits.join(', ')}</p>
                        </div>
                      </div>
                    )}

                    {job.feedback && (
                      <div>
                        <p className="text-gray-300 font-medium mb-2">Feedback</p>
                        <p className="text-gray-400 italic">"{job.feedback}"</p>
                      </div>
                    )}

                    {job.notes && (
                      <div>
                        <p className="text-gray-300 font-medium mb-2">Your Notes</p>
                        <p className="text-gray-400">{job.notes}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-4">
                      <button className="btn btn-outline btn-sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View Job Posting
                      </button>
                      <button className="btn btn-outline btn-sm">
                        <Mail className="w-4 h-4 mr-1" />
                        Contact Recruiter
                      </button>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => toggleExpandJob(job.id)}
                  >
                    {expandedJob === job.id ? (
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
                  <div className="flex gap-2">
                    <button className="btn btn-outline btn-sm">
                      <Bookmark className="w-4 h-4 mr-1" />
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              {searchTerm || statusFilter !== 'all'
                ? 'No matching applications found'
                : "You haven't applied to any jobs yet"
              }
            </h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Start browsing jobs to apply'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;