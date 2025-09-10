import React, { useState } from 'react';
import {
  Search,
  Filter,
  User,
  Clock,
  MapPin,
  DollarSign,
  Users,
  Calendar,
  MessageCircle,
  Star,
  ChevronDown,
  ChevronUp,
  Send,
  X,
  BookOpen,
  GraduationCap,
  Briefcase
} from 'lucide-react';

const AllMentorshipPosts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [expandedMentorship, setExpandedMentorship] = useState(null);
  const [requestModal, setRequestModal] = useState(null);
  const [requestForm, setRequestForm] = useState({
    message: '',
    goals: '',
    availability: '',
    skills: '',
    portfolioLink: ''
  });

  // Sample mentorship data (would come from your API)
  const mentorshipPosts = [
    {
      id: 1,
      title: "Web Development Career Guidance",
      description: "I'll help you navigate your web development career path, from learning fundamentals to landing your first job. We'll work on projects, interview preparation, and portfolio building.",
      category: "career",
      specialties: ["React", "JavaScript", "CSS", "Interview Prep", "Portfolio Review"],
      experience: "5+ years industry experience",
      availability: "Weekends and evenings",
      location: "San Francisco, CA",
      isRemote: true,
      sessionFormat: "One-on-one video calls",
      sessionLength: "1 hour sessions",
      price: "$50/session or $200/month",
      maxMentees: 10,
      currentMentees: 7,
      rating: 4.8,
      creatorId: "creator1",
      creatorName: "Sarah Johnson",
      creatorTitle: "Senior Frontend Developer at TechCorp",
      creatorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      description: "Learn the core concepts of data science, from statistics to machine learning algorithms. Suitable for beginners looking to enter the field or professionals wanting to expand their skills.",
      category: "technical",
      specialties: ["Python", "Machine Learning", "Statistics", "Data Visualization", "Pandas"],
      experience: "7+ years in data science",
      availability: "Weekdays after 6 PM",
      location: "Remote",
      isRemote: true,
      sessionFormat: "Screen sharing and coding sessions",
      sessionLength: "1.5 hour sessions",
      price: "$60/session",
      maxMentees: 8,
      currentMentees: 5,
      rating: 4.9,
      creatorId: "creator2",
      creatorName: "Michael Chen",
      creatorTitle: "Data Scientist at AnalyticsCo",
      creatorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
    },
    {
      id: 3,
      title: "UX/Design Portfolio Review",
      description: "Get your portfolio reviewed by an industry expert and learn how to stand out in the competitive design field. I'll provide detailed feedback on your projects and presentation.",
      category: "portfolio",
      specialties: ["UI/UX Design", "Figma", "User Research", "Portfolio Building", "Design Thinking"],
      experience: "6+ years in product design",
      availability: "Flexible scheduling",
      location: "New York, NY",
      isRemote: false,
      sessionFormat: "In-person or video calls",
      sessionLength: "1 hour sessions",
      price: "$70/session",
      maxMentees: 6,
      currentMentees: 4,
      rating: 4.7,
      creatorId: "creator3",
      creatorName: "Maria Rodriguez",
      creatorTitle: "Lead UX Designer at CreativeStudio",
      creatorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1761&q=80"
    },
    {
      id: 4,
      title: "Software Engineering Interview Prep",
      description: "Prepare for technical interviews at top tech companies. We'll practice coding problems, system design, and behavioral questions tailored to your target companies.",
      category: "interview",
      specialties: ["Algorithms", "System Design", "Whiteboarding", "Behavioral Questions", "Negotiation"],
      experience: "8+ years at FAANG companies",
      availability: "Weekends",
      location: "Remote",
      isRemote: true,
      sessionFormat: "Pair programming sessions",
      sessionLength: "2 hour sessions",
      price: "$80/session or $300/month",
      maxMentees: 12,
      currentMentees: 9,
      rating: 4.9,
      creatorId: "creator4",
      creatorName: "David Wilson",
      creatorTitle: "Engineering Manager at Tech Giant",
      creatorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80"
    }
  ];

  const filteredMentorships = mentorshipPosts.filter(mentorship => {
    const matchesSearch = mentorship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentorship.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentorship.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || mentorship.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (category) => {
    const categoryConfig = {
      'career': { color: 'badge-primary', text: 'Career Guidance' },
      'technical': { color: 'badge-secondary', text: 'Technical Skills' },
      'portfolio': { color: 'badge-accent', text: 'Portfolio Review' },
      'interview': { color: 'badge-info', text: 'Interview Prep' }
    };
    const config = categoryConfig[category] || { color: 'badge-neutral', text: category };
    return <span className={`badge ${config.color}`}>{config.text}</span>;
  };

  const toggleExpandMentorship = (mentorshipId) => {
    setExpandedMentorship(expandedMentorship === mentorshipId ? null : mentorshipId);
  };

  const handleRequestClick = (mentorshipId) => {
    setRequestModal(mentorshipId);
    setRequestForm({
      message: '',
      goals: '',
      availability: '',
      skills: '',
      portfolioLink: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequestForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();

    const mentorship = mentorshipPosts.find(m => m.id === requestModal);

    const requestData = {
      mentorshipId: requestModal,
      mentorshipTitle: mentorship.title,
      mentorId: mentorship.creatorId,
      mentorName: mentorship.creatorName,
      ...requestForm,
      submittedDate: new Date().toISOString(),
      status: 'pending'
    };

    try {
      // API call to submit mentorship request
      const response = await fetch('/api/mentorship-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        alert('Mentorship request sent successfully!');
        setRequestModal(null);
      } else {
        throw new Error('Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting mentorship request:', error);
      alert('Failed to send request. Please try again.');
    }
  };

  const stats = {
    totalMentorships: mentorshipPosts.length,
    availableSpots: mentorshipPosts.reduce((total, m) => total + (m.maxMentees - m.currentMentees), 0),
    averageRating: (mentorshipPosts.reduce((total, m) => total + m.rating, 0) / mentorshipPosts.length).toFixed(1),
    remoteMentorships: mentorshipPosts.filter(m => m.isRemote).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Find Mentors</h1>
            <p className="text-gray-400 mt-2">Connect with experienced professionals for guidance</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: stats.totalMentorships, label: 'Total Mentors', color: 'text-white', icon: <User className="w-5 h-5" /> },
            { value: stats.availableSpots, label: 'Available Spots', color: 'text-emerald-400', icon: <Users className="w-5 h-5" /> },
            { value: stats.averageRating, label: 'Avg Rating', color: 'text-amber-400', icon: <Star className="w-5 h-5" /> },
            { value: stats.remoteMentorships, label: 'Remote Options', color: 'text-blue-400', icon: <MapPin className="w-5 h-5" /> }
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

        {/* Mentorship List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredMentorships.map((mentorship) => (
            <div key={mentorship.id} className="card bg-[#1E293B] border border-[#334155] hover:border-blue-400 transition-all duration-300">
              <div className="card-body">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={mentorship.creatorImage}
                        alt={mentorship.creatorName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="card-title text-white text-xl">{mentorship.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-300">{mentorship.creatorName}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400 text-sm">{mentorship.creatorTitle}</span>
                      </div>
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

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-gray-400">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span>{mentorship.price}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{mentorship.sessionLength}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{mentorship.availability}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{mentorship.currentMentees}/{mentorship.maxMentees} mentees</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(mentorship.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-400'}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400">{mentorship.rating}/5.0</span>
                </div>

                {/* Expanded Details */}
                {expandedMentorship === mentorship.id && (
                  <div className="space-y-4 pt-4 border-t border-[#334155]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-300 font-medium mb-2">Session Format</p>
                        <p className="text-gray-400">{mentorship.sessionFormat}</p>
                      </div>
                      <div>
                        <p className="text-gray-300 font-medium mb-2">Experience</p>
                        <p className="text-gray-400">{mentorship.experience}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-300 font-medium mb-2">Mentorship Approach</p>
                      <p className="text-gray-400">
                        I believe in hands-on learning with real-world projects. We'll start with assessing your current skills,
                        set clear goals, and work through practical exercises that you can apply immediately in your work or studies.
                      </p>
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
                  <button
                    className="btn bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white"
                    onClick={() => handleRequestClick(mentorship.id)}
                    disabled={mentorship.currentMentees >= mentorship.maxMentees}
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {mentorship.currentMentees >= mentorship.maxMentees ? 'Full' : 'Request Mentorship'}
                  </button>
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
                : 'No mentorship opportunities available yet'
              }
            </h3>
            <p className="text-gray-500">
              {searchTerm || categoryFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Check back later for new mentorship offerings'
              }
            </p>
          </div>
        )}

        {/* Request Mentorship Modal */}
        {requestModal && (
          <div className="modal modal-open">
            <div className="modal-box bg-[#1E293B] border border-[#334155] max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-white">
                  Request Mentorship
                </h3>
                <button
                  className="btn btn-ghost btn-circle btn-sm"
                  onClick={() => setRequestModal(null)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6 p-4 bg-slate-800 rounded-lg">
                <h4 className="font-semibold text-white mb-2">
                  {mentorshipPosts.find(m => m.id === requestModal)?.title}
                </h4>
                <p className="text-gray-400">
                  with {mentorshipPosts.find(m => m.id === requestModal)?.creatorName}
                </p>
              </div>

              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">Your Message *</span>
                  </label>
                  <textarea
                    name="message"
                    value={requestForm.message}
                    onChange={handleInputChange}
                    placeholder="Introduce yourself and explain why you're interested in this mentorship..."
                    rows={4}
                    className="textarea textarea-bordered bg-[#1E293B] border-[#334155] text-white"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">Your Goals *</span>
                  </label>
                  <textarea
                    name="goals"
                    value={requestForm.goals}
                    onChange={handleInputChange}
                    placeholder="What do you hope to achieve through this mentorship?"
                    rows={3}
                    className="textarea textarea-bordered bg-[#1E293B] border-[#334155] text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-300">Your Availability *</span>
                    </label>
                    <input
                      type="text"
                      name="availability"
                      value={requestForm.availability}
                      onChange={handleInputChange}
                      placeholder="e.g., Weekends, Evenings, Flexible"
                      className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-300">Your Skills *</span>
                    </label>
                    <input
                      type="text"
                      name="skills"
                      value={requestForm.skills}
                      onChange={handleInputChange}
                      placeholder="e.g., React, Python, Design"
                      className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">Portfolio/Website (Optional)</span>
                  </label>
                  <input
                    type="url"
                    name="portfolioLink"
                    value={requestForm.portfolioLink}
                    onChange={handleInputChange}
                    placeholder="https://yourportfolio.com"
                    className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                  />
                </div>

                <div className="modal-action">
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setRequestModal(null)}
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

export default AllMentorshipPosts;