import React, { useState } from 'react';
import { Link } from 'react-router';
import {
  Search,
  Filter,
  Users,
  Clock,
  BookOpen,
  Plus,
  MessageSquare,
  Star,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const AllMentorshipPosts = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [expandedMentorship, setExpandedMentorship] = useState(null);

  // Sample mentorship data
  const mentorships = [
    {
      id: 1,
      title: "Web Development Career Guidance",
      description: "I'll help you navigate your web development career path, from learning fundamentals to landing your first job.",
      mentor: "Sarah Johnson",
      expertise: "Senior Frontend Developer at TechCorp",
      location: "San Francisco, CA",
      category: "career",
      specialties: ["React", "JavaScript", "CSS", "Interview Prep"],
      experience: "5+ years",
      availability: "Weekends",
      status: "available",
      rating: 4.8,
      sessions: 142,
      created: "2024-02-15",
      isRemote: true
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      description: "Learn the core concepts of data science, from statistics to machine learning algorithms. Suitable for beginners.",
      mentor: "David Chen",
      expertise: "Data Scientist at AnalyticsCo",
      location: "Remote",
      category: "technical",
      specialties: ["Python", "Machine Learning", "Statistics", "Data Visualization"],
      experience: "7+ years",
      availability: "Weekdays after 6PM",
      status: "available",
      rating: 4.9,
      sessions: 89,
      created: "2024-03-01",
      isRemote: true
    },
    {
      id: 3,
      title: "UX/Design Portfolio Review",
      description: "Get your portfolio reviewed by an industry expert and learn how to stand out in the competitive design field.",
      mentor: "Maria Rodriguez",
      expertise: "Lead UX Designer at CreativeStudio",
      location: "New York, NY",
      category: "portfolio",
      specialties: ["UI/UX Design", "Figma", "User Research", "Portfolio Building"],
      experience: "6+ years",
      availability: "Flexible",
      status: "available",
      rating: 4.7,
      sessions: 217,
      created: "2024-01-20",
      isRemote: false
    }
  ];

  const filteredMentorships = mentorships.filter(mentorship => {
    const matchesSearch = mentorship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentorship.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentorship.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || mentorship.category === categoryFilter;
    const matchesStatus = mentorship.status === activeTab;
    return matchesSearch && matchesCategory && matchesStatus;
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const toggleExpandMentorship = (mentorshipId) => {
    setExpandedMentorship(expandedMentorship === mentorshipId ? null : mentorshipId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Mentorship</h1>
            <p className="text-gray-400 mt-2">Find mentors or offer guidance</p>
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

        {/* Tabs */}
        <div className="tabs tabs-boxed bg-[#1E293B] p-1">
          <a
            className={`tab ${activeTab === 'available' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('available')}
          >
            Available Mentors
          </a>
          <a
            className={`tab ${activeTab === 'my-mentors' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('my-mentors')}
          >
            My Mentors
          </a>
          <a
            className={`tab ${activeTab === 'my-mentees' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('my-mentees')}
          >
            My Mentees
          </a>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search mentorships by title, skills, or description..."
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

        {/* Mentorships Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredMentorships.map((mentorship) => (
            <div key={mentorship.id} className="card bg-[#1E293B] border border-[#334155] hover:border-blue-400 transition-all duration-300">
              <div className="card-body">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="card-title text-white text-xl">{mentorship.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-gray-300 font-medium">{mentorship.mentor}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400 text-sm">{mentorship.expertise}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getCategoryBadge(mentorship.category)}
                    {mentorship.isRemote && (
                      <span className="badge badge-info badge-sm">Remote</span>
                    )}
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
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span>{mentorship.experience} experience</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>{mentorship.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-red-400" />
                    <span>Available: {mentorship.availability}</span>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedMentorship === mentorship.id && (
                  <div className="space-y-4 pt-4 border-t border-[#334155]">
                    <div>
                      <p className="text-gray-300 font-medium mb-2">Mentorship Approach:</p>
                      <p className="text-gray-400">
                        I believe in hands-on learning with real-world projects. We'll start with assessing your current skills,
                        set clear goals, and work through practical exercises that you can apply immediately in your work or studies.
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-300 font-medium mb-2">Session Format:</p>
                      <ul className="text-gray-400 list-disc list-inside">
                        <li>30-minute introductory session (free)</li>
                        <li>1-hour regular sessions</li>
                        <li>Personalized action plans</li>
                        <li>Resource recommendations</li>
                        <li>Code/project reviews</li>
                      </ul>
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
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Message
                    </button>
                    <button className="btn bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white btn-sm">
                      Request Mentorship
                    </button>
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
                ? 'No matching mentorships found'
                : 'No mentorships available yet'
              }
            </h3>
            <p className="text-gray-500">
              {searchTerm || categoryFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Check back later for new mentorship opportunities'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllMentorshipPosts;