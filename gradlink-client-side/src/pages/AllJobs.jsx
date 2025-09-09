import React, { useState } from 'react';
import { Link } from 'react-router';
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Briefcase,
  Building,
  ChevronDown,
  ChevronUp,
  Star,
  Users,
  ExternalLink
} from 'lucide-react';

const AllJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [expandedJob, setExpandedJob] = useState(null);

  // Sample job data
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA (Remote)",
      type: "Full-time",
      salary: "$80,000 - $120,000",
      experience: "Mid-level",
      postedDate: "2024-03-15",
      deadline: "2024-04-15",
      description: "Join our dynamic frontend team to build responsive web applications using modern frameworks. You'll work on cutting-edge projects with a talented team of developers.",
      requirements: ["React", "JavaScript", "CSS", "3+ years experience", "Git", "Responsive Design"],
      benefits: ["Health insurance", "Flexible hours", "Remote work", "Learning budget"],
      isRemote: true,
      companyInfo: {
        size: "201-500 employees",
        industry: "Technology",
        website: "https://techinnovations.com"
      },
      contact: {
        email: "careers@techinnovations.com",
        phone: "(555) 123-4567"
      },
      applyLink: "https://example.com"
    },
    {
      id: 2,
      title: "Data Science Intern",
      company: "Data Insights Corp",
      location: "New York, NY",
      type: "Internship",
      salary: "$25 - $35/hour",
      experience: "Entry-level",
      postedDate: "2024-03-12",
      deadline: "2024-03-31",
      description: "Join our data science team as an intern and gain hands-on experience with real-world data analysis projects. Perfect for students looking to apply academic knowledge.",
      requirements: ["Python", "Machine Learning", "Statistics", "Students welcome", "SQL basics"],
      benefits: ["Mentorship", "Flexible schedule", "Potential full-time offer", "Networking opportunities"],
      isRemote: false,
      companyInfo: {
        size: "51-200 employees",
        industry: "Data Analytics",
        website: "https://datainsights.com"
      },
      contact: {
        email: "internships@datainsights.com",
        phone: "(555) 987-6543"
      },
      applyLink: "https://example.com"
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "Creative Solutions LLC",
      location: "Austin, TX (Hybrid)",
      type: "Full-time",
      salary: "$65,000 - $85,000",
      experience: "Mid-level",
      postedDate: "2024-03-10",
      deadline: "2024-03-25",
      description: "Design user interfaces and experiences for our digital products across web and mobile platforms. Collaborate with developers and product managers.",
      requirements: ["Figma", "UI Design", "User Research", "2+ years experience", "Prototyping"],
      benefits: ["Health insurance", "Creative freedom", "Professional development", "Flexible hours"],

      isRemote: false,
      companyInfo: {
        size: "11-50 employees",
        industry: "Design & Creative",
        website: "https://creativesolutions.com"
      },
      contact: {
        email: "design@creativesolutions.com",
        phone: "(555) 456-7890"
      },
      applyLink: "https://example.com"
    },
    {
      id: 4,
      title: "Backend Engineer",
      company: "Cloud Systems Ltd.",
      location: "Remote",
      type: "Full-time",
      salary: "$90,000 - $130,000",
      experience: "Senior",
      postedDate: "2024-03-18",
      deadline: "2024-04-10",
      description: "Develop and maintain scalable backend systems for our cloud infrastructure. Work with modern technologies and architecture patterns.",
      requirements: ["Node.js", "Python", "AWS", "5+ years experience", "Docker", "Microservices"],
      benefits: ["Remote work", "Stock options", "Unlimited PTO", "Conference budget"],

      isRemote: true,
      companyInfo: {
        size: "501-1000 employees",
        industry: "Cloud Computing",
        website: "https://cloudsystems.com"
      },
      contact: {
        email: "engineering@cloudsystems.com",
        phone: "(555) 234-5678"
      },
      applyLink: "https://example.com"
    },
    {
      id: 5,
      title: "Marketing Specialist",
      company: "Growth Hackers Inc.",
      location: "Chicago, IL",
      type: "Part-time",
      salary: "$40 - $55/hour",
      experience: "Mid-level",
      postedDate: "2024-03-20",
      deadline: "2024-04-05",
      description: "Develop and execute marketing campaigns to drive user acquisition and engagement. Analyze campaign performance and optimize strategies.",
      requirements: ["Digital Marketing", "Google Analytics", "Content Creation", "3+ years experience", "SEO/SEM"],
      benefits: ["Flexible schedule", "Performance bonuses", "Remote options", "Team events"],

      isRemote: false,
      companyInfo: {
        size: "11-50 employees",
        industry: "Marketing",
        website: "https://growthhackers.com"
      },
      contact: {
        email: "marketing@growthhackers.com",
        phone: "(555) 345-6789"
      }
    },
    {
      id: 6,
      title: "DevOps Engineer",
      company: "Infrastructure Pro",
      location: "Boston, MA (Remote)",
      type: "Contract",
      salary: "$70 - $90/hour",
      experience: "Senior",
      postedDate: "2024-03-22",
      deadline: "2024-04-12",
      description: "Implement and maintain CI/CD pipelines, infrastructure as code, and monitoring solutions for our development teams.",
      requirements: ["Kubernetes", "Terraform", "AWS/GCP", "4+ years experience", "CI/CD", "Linux"],
      benefits: ["Contract to hire", "Remote work", "Flexible hours", "Tech stipend"],

      isRemote: true,
      companyInfo: {
        size: "51-200 employees",
        industry: "IT Infrastructure",
        website: "https://infrastructurepro.com"
      },
      contact: {
        email: "devops@infrastructurepro.com",
        phone: "(555) 567-8901"
      }
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'all' || job.type.toLowerCase() === typeFilter.toLowerCase();
    const matchesExperience = experienceFilter === 'all' || job.experience.toLowerCase() === experienceFilter.toLowerCase();
    return matchesSearch && matchesType && matchesExperience;
  });

  const getTypeBadge = (type) => {
    const typeConfig = {
      'Full-time': { color: 'badge-primary', text: 'Full-time' },
      'Part-time': { color: 'badge-secondary', text: 'Part-time' },
      'Internship': { color: 'badge-accent', text: 'Internship' },
      'Contract': { color: 'badge-info', text: 'Contract' }
    };
    const config = typeConfig[type] || { color: 'badge-neutral', text: type };
    return <span className={`badge ${config.color}`}>{config.text}</span>;
  };

  const getExperienceBadge = (experience) => {
    const expConfig = {
      'Entry-level': { color: 'badge-success', text: 'Entry-level' },
      'Mid-level': { color: 'badge-warning', text: 'Mid-level' },
      'Senior': { color: 'badge-error', text: 'Senior' }
    };
    const config = expConfig[experience] || { color: 'badge-neutral', text: experience };
    return <span className={`badge ${config.color}`}>{config.text}</span>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const toggleExpandJob = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const stats = {
    totalJobs: jobs.length,
    fullTimeJobs: jobs.filter(job => job.type === 'Full-time').length,
    remoteJobs: jobs.filter(job => job.isRemote).length,
    internshipJobs: jobs.filter(job => job.type === 'Internship').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 md:p-6">
      <div className="max-w-screen-xl mx-auto px-5 lg:px-0 py-10 space-y-6">
        {/* Header */}
        <div >
          <div>
            <h1 className="text-3xl font-bold text-white">All Job Opportunities</h1>
            <p className="text-gray-400 mt-2">Find your next career opportunity</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: stats.totalJobs, label: 'Total Jobs', color: 'text-white', icon: <Briefcase className="w-5 h-5" /> },
            { value: stats.fullTimeJobs, label: 'Full-time', color: 'text-blue-400', icon: <Users className="w-5 h-5" /> },
            { value: stats.remoteJobs, label: 'Remote', color: 'text-emerald-400', icon: <MapPin className="w-5 h-5" /> },
            { value: stats.internshipJobs, label: 'Internships', color: 'text-amber-400', icon: <Star className="w-5 h-5" /> }
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
              placeholder="Search jobs by title, company, or skills..."
              className="input input-bordered bg-[#1E293B] border-[#334155] text-white pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="select select-bordered bg-[#1E293B] border-[#334155] text-white"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
          <select
            className="select select-bordered bg-[#1E293B] border-[#334155] text-white"
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(e.target.value)}
          >
            <option value="all">All Experience</option>
            <option value="Entry-level">Entry-level</option>
            <option value="Mid-level">Mid-level</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        {/* Jobs Grid */}
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
                      <span className="text-gray-400">{job.location}</span>
                      {job.isRemote && <span className="badge badge-info badge-sm">Remote</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTypeBadge(job.type)}
                    {getExperienceBadge(job.experience)}
                  </div>
                </div>

                {/* Job Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center text-gray-400">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Posted {formatDate(job.postedDate)}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Apply by {formatDate(job.deadline)}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 mb-4 line-clamp-2">
                  {job.description}
                </p>

                {/* Requirements Preview */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.requirements.slice(0, 4).map((req, index) => (
                    <span key={index} className="badge badge-outline badge-primary badge-sm">
                      {req}
                    </span>
                  ))}
                  {job.requirements.length > 4 && (
                    <span className="badge badge-outline badge-primary badge-sm">
                      +{job.requirements.length - 4} more
                    </span>
                  )}
                </div>


                {/* Expanded Details */}
                {expandedJob === job.id && (
                  <div className="space-y-4 pt-4 border-t border-[#334155]">
                    {/* Full Description */}
                    <div>
                      <p className="text-gray-300 font-medium mb-2">Job Description</p>
                      <p className="text-gray-400">{job.description}</p>
                    </div>

                    {/* Requirements */}
                    <div>
                      <p className="text-gray-300 font-medium mb-2">Requirements</p>
                      <ul className="list-disc list-inside text-gray-400">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div>
                      <p className="text-gray-300 font-medium mb-2">Benefits</p>
                      <div className="flex flex-wrap gap-2">
                        {job.benefits.map((benefit, index) => (
                          <span key={index} className="badge badge-success badge-sm">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Company Info */}
                    <div>
                      <p className="text-gray-300 font-medium mb-2">Company Information</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400">
                        <div>
                          <p>Size: {job.companyInfo.size}</p>
                          <p>Industry: {job.companyInfo.industry}</p>
                        </div>
                        <div>
                          <p>Website: <a href={job.companyInfo.website} className="text-blue-400 hover:text-blue-300">{job.companyInfo.website}</a></p>
                          <p>Contact: {job.contact.email}</p>
                        </div>
                      </div>
                    </div>
                    {/* Apply Link */}
                    <div>

                      <h3 className='text-blue-500 mb-2 font-semibold flex items-center gap-1'><ExternalLink className='w-5 h-5' />Apply Now: {job.applyLink}</h3>
                    </div>
                  </div>

                )}

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <button
                    className="btn bg-gradient-to-r from-blue-500 to-emerald-400 border-none shadow-none text-white btn-sm"
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

                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              {searchTerm || typeFilter !== 'all' || experienceFilter !== 'all'
                ? 'No matching jobs found'
                : 'No job opportunities available yet'
              }
            </h3>
            <p className="text-gray-500">
              {searchTerm || typeFilter !== 'all' || experienceFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Check back later for new job postings'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllJobs;