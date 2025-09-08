import React, { useState } from 'react';
import { Link } from 'react-router';
import {
  Search,
  Users,
  Clock,
  BookOpen,
  Plus,
  MessageSquare,
  Star,
  MapPin,
  Calendar,
  Edit,
  Trash2,
  BarChart3,
  MoreVertical,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const Mentorship = () => {
  const [activeTab, setActiveTab] = useState('my-mentorships');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [expandedMentorship, setExpandedMentorship] = useState(null);

  // Sample mentorship data - only mentorships created by the current user (alumni)
  const myMentorships = [
    {
      id: 1,
      title: "Web Development Career Guidance",
      description: "I'll help you navigate your web development career path, from learning fundamentals to landing your first job.",
      category: "career",
      specialties: ["React", "JavaScript", "CSS", "Interview Prep"],
      experience: "5+ years",
      availability: "Weekends",
      status: "active",
      rating: 4.8,
      sessions: 142,
      mentees: 15,
      created: "2024-02-15",
      isRemote: true,
      requests: 8
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      description: "Learn the core concepts of data science, from statistics to machine learning algorithms. Suitable for beginners.",
      category: "technical",
      specialties: ["Python", "Machine Learning", "Statistics", "Data Visualization"],
      experience: "7+ years",
      availability: "Weekdays after 6PM",
      status: "active",
      rating: 4.9,
      sessions: 89,
      mentees: 12,
      created: "2024-03-01",
      isRemote: true,
      requests: 5
    },
    {
      id: 3,
      title: "UX/Design Portfolio Review",
      description: "Get your portfolio reviewed by an industry expert and learn how to stand out in the competitive design field.",
      category: "portfolio",
      specialties: ["UI/UX Design", "Figma", "User Research", "Portfolio Building"],
      experience: "6+ years",
      availability: "Flexible",
      status: "draft",
      rating: 0,
      sessions: 0,
      mentees: 0,
      created: "2024-03-10",
      isRemote: false,
      requests: 0
    }
  ];

  const filteredMentorships = myMentorships.filter(mentorship => {
    const matchesSearch = mentorship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentorship.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentorship.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || mentorship.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (category) => {
    const categoryConfig = {
      'career': { color: 'badge-primary', text: 'Career' },
      'technical': { color: 'badge-secondary', text: 'Technical' },
      'portfolio': { color: 'badge-accent', text: 'Portfolio' },
      'interview': { color: 'badge-info', text: 'Interview' }
    };
    const config = categoryConfig[category] || { color: 'badge-neutral', text: category };
    return <span className={`badge ${config.color}`}>{config.text}</span>;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'active': { color: 'badge-success', text: 'Active' },
      'draft': { color: 'badge-warning', text: 'Draft' },
      'paused': { color: 'badge-error', text: 'Paused' }
    };
    const config = statusConfig[status] || { color: 'badge-neutral', text: status };
    return <span className={`badge ${config.color}`}>{config.text}</span>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleEditMentorship = (mentorshipId) => {
    console.log(`Editing mentorship ${mentorshipId}`);
    // Navigate to edit page
  };

  const handleDeleteMentorship = (mentorshipId) => {
    if (window.confirm('Are you sure you want to delete this mentorship offering?')) {
      console.log(`Deleting mentorship ${mentorshipId}`);
      // API call to delete mentorship
    }
  };

  const toggleExpandMentorship = (mentorshipId) => {
    setExpandedMentorship(expandedMentorship === mentorshipId ? null : mentorshipId);
  };

  const stats = {
    totalMentorships: myMentorships.length,
    activeMentorships: myMentorships.filter(m => m.status === 'active').length,
    totalMentees: myMentorships.reduce((sum, m) => sum + m.mentees, 0),
    pendingRequests: myMentorships.reduce((sum, m) => sum + m.requests, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">My Mentorship</h1>
            <p className="text-gray-400 mt-2">Manage your mentorship offerings</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link
              to="/dashboard/mentorship-requests"
              className="btn btn-outline"
            >
              View Requests
            </Link>
            <Link
              to="/dashboard/mentorship/create"
              className="btn bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white"
            >
              <Plus className="w-5 h-5 mr-2" />
              Offer Mentorship
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: stats.totalMentorships, label: 'Total Offerings', color: 'text-white', icon: <BookOpen className="w-5 h-5" /> },
            { value: stats.activeMentorships, label: 'Active', color: 'text-emerald-400', icon: <Star className="w-5 h-5" /> },
            { value: stats.totalMentees, label: 'Mentees', color: 'text-blue-400', icon: <Users className="w-5 h-5" /> },
            { value: stats.pendingRequests, label: 'Pending Requests', color: 'text-amber-400', icon: <Clock className="w-5 h-5" /> }
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
              placeholder="Search your mentorship offerings..."
              className="input input-bordered bg-[#1E293B] border-[#334155] text-white pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="select select-bordered bg-[#1E293B] border-[#334155] text-white"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="career">Career Guidance</option>
            <option value="technical">Technical Skills</option>
            <option value="portfolio">Portfolio Review</option>
            <option value="interview">Interview Prep</option>
          </select>
        </div>

        {/* Mentorships List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredMentorships.map((mentorship) => (
            <div key={mentorship.id} className="card bg-[#1E293B] border border-[#334155] hover:border-blue-400 transition-all duration-300">
              <div className="card-body">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="card-title text-white text-xl">{mentorship.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-gray-400">Created {formatDate(mentorship.created)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(mentorship.status)}
                    {getCategoryBadge(mentorship.category)}
                    {mentorship.isRemote && (
                      <span className="badge badge-info badge-sm">Remote</span>
                    )}
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-sm">
                        <MoreVertical className="w-4 h-4" />
                      </div>
                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-[#1E293B] rounded-box w-52 border border-[#334155]">
                        <li><a onClick={() => handleEditMentorship(mentorship.id)}><Edit className="w-4 h-4" /> Edit</a></li>
                        <li><a onClick={() => handleDeleteMentorship(mentorship.id)} className="text-error"><Trash2 className="w-4 h-4" /> Delete</a></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 mb-4">
                  {mentorship.description}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {mentorship.specialties.map((specialty, index) => (
                    <span key={index} className="badge badge-outline badge-sm">
                      {specialty}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400" />
                    <span>{mentorship.rating}/5.0</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span>{mentorship.sessions} sessions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>{mentorship.mentees} mentees</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span>{mentorship.experience} experience</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-red-400" />
                    <span>Available: {mentorship.availability}</span>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedMentorship === mentorship.id && (
                  <div className="space-y-4 pt-4 border-t border-[#334155]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-300 font-medium mb-2">Mentorship Approach:</p>
                        <p className="text-gray-400">
                          I believe in hands-on learning with real-world projects. We'll start with assessing your current skills,
                          set clear goals, and work through practical exercises that you can apply immediately.
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-300 font-medium mb-2">Session Format:</p>
                        <ul className="text-gray-400 list-disc list-inside">
                          <li>30-minute introductory session (free)</li>
                          <li>1-hour regular sessions</li>
                          <li>Personalized action plans</li>
                          <li>Resource recommendations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => toggleExpandMentorship(mentorship.id)}
                  >
                    {expandedMentorship === mentorship.id ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        Learn More
                      </>
                    )}
                  </button>
                  <div className="flex gap-2">
                    <button className="btn btn-outline btn-sm">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Analytics
                    </button>
                    {mentorship.status === 'draft' && (
                      <button className="btn btn-primary btn-sm">
                        Publish
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMentorships.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              {searchTerm || categoryFilter !== 'all'
                ? 'No matching mentorship offerings found'
                : "You haven't created any mentorship offerings yet"
              }
            </h3>
            <p className="text-gray-500">
              {searchTerm || categoryFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by creating your first mentorship offering'
              }
            </p>
            {(searchTerm === '' && categoryFilter === 'all') && (
              <Link
                to="/dashboard/mentorship/create"
                className="btn bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white mt-4"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Mentorship
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mentorship;