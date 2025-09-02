import React, { useState } from 'react';
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Users,
  Clock,
  Code,
  Globe,
  Send,
  X,
  Star,
  ExternalLink,
  Mail,
  MessageSquare,
  BookOpen,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const AllProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [collaborationModal, setCollaborationModal] = useState(null);
  const [collaborationForm, setCollaborationForm] = useState({
    message: '',
    role: '',
    availability: '',
    skills: '',
    portfolioLink: ''
  });
  const [expandedProject, setExpandedProject] = useState(null);

  // Sample project data
  const projects = [
    {
      id: 1,
      title: "AI-Powered Learning Platform",
      description: "An intelligent learning platform that adapts to individual student needs using machine learning algorithms to personalize educational content.",
      creator: "Tech Education Inc.",
      location: "San Francisco, CA",
      category: "web-development",
      technologies: ["React", "Node.js", "MongoDB", "TensorFlow"],
      status: "active",
      lookingFor: ["Frontend Developers", "ML Engineers", "UI/UX Designers"],
      teamSize: 8,
      createdAt: "2024-02-15",
      stars: 142,
      collaborators: 5,
      repoLink: "https://github.com/example/ai-learning-platform",
      demoLink: "https://ailearning.demo.com"
    },
    {
      id: 2,
      title: "Sustainable Energy Monitoring System",
      description: "IoT-based system for monitoring and optimizing energy consumption in commercial buildings with real-time analytics and reporting.",
      creator: "GreenTech Solutions",
      location: "Remote",
      category: "iot",
      technologies: ["Python", "Raspberry Pi", "AWS IoT", "React Native"],
      status: "planning",
      lookingFor: ["IoT Developers", "Data Scientists", "Hardware Engineers"],
      teamSize: 6,
      createdAt: "2024-03-01",
      stars: 89,
      collaborators: 3,
      repoLink: "https://github.com/example/energy-monitor",
      demoLink: "https://energy.demo.com"
    },
    {
      id: 3,
      title: "Mental Health Chatbot",
      description: "A conversational AI assistant that provides mental health support and resources using natural language processing and sentiment analysis.",
      creator: "Mindful Tech",
      location: "New York, NY",
      category: "ai-ml",
      technologies: ["Python", "NLTK", "Dialogflow", "Firebase"],
      status: "active",
      lookingFor: ["NLP Engineers", "Psychologists", "Full-stack Developers"],
      teamSize: 10,
      createdAt: "2024-01-20",
      stars: 217,
      collaborators: 8,
      repoLink: "https://github.com/example/mental-health-chatbot",
      demoLink: "https://mindful.demo.com"
    },
    {
      id: 4,
      title: "Blockchain-Based Voting System",
      description: "A secure, transparent voting system built on blockchain technology to ensure election integrity and prevent fraud.",
      creator: "SecureVote Foundation",
      location: "Remote",
      category: "blockchain",
      technologies: ["Solidity", "Ethereum", "React", "Web3.js"],
      status: "development",
      lookingFor: ["Blockchain Developers", "Security Experts", "Frontend Developers"],
      teamSize: 7,
      createdAt: "2024-02-28",
      stars: 178,
      collaborators: 4,
      repoLink: "https://github.com/example/blockchain-voting",
      demoLink: "https://securevote.demo.com"
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (category) => {
    const categoryConfig = {
      'web-development': { color: 'badge-primary', text: 'Web Dev' },
      'ai-ml': { color: 'badge-secondary', text: 'AI/ML' },
      'iot': { color: 'badge-accent', text: 'IoT' },
      'blockchain': { color: 'badge-info', text: 'Blockchain' },
      'mobile': { color: 'badge-success', text: 'Mobile' }
    };
    const config = categoryConfig[category] || { color: 'badge-neutral', text: category };
    return <span className={`badge ${config.color}`}>{config.text}</span>;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'planning': { color: 'badge-warning', text: 'Planning' },
      'active': { color: 'badge-success', text: 'Active' },
      'development': { color: 'badge-info', text: 'Development' },
      'completed': { color: 'badge-neutral', text: 'Completed' }
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

  const handleCollaborateClick = (projectId) => {
    setCollaborationModal(projectId);
    setCollaborationForm({
      message: '',
      role: '',
      availability: '',
      skills: '',
      portfolioLink: ''
    });
  };

  const handleCollaborationSubmit = (e) => {
    e.preventDefault();
    console.log('Sending collaboration request:', {
      projectId: collaborationModal,
      ...collaborationForm
    });

    // Simulate API call
    setTimeout(() => {
      alert('Collaboration request sent successfully!');
      setCollaborationModal(null);
    }, 1000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCollaborationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleExpandProject = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">All Projects</h1>
            <p className="text-gray-400 mt-2">Discover projects to collaborate on</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects by name, tech, or description..."
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
            <option value="web-development">Web Development</option>
            <option value="ai-ml">AI/ML</option>
            <option value="iot">IoT</option>
            <option value="blockchain">Blockchain</option>
            <option value="mobile">Mobile</option>
          </select>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="card bg-[#1E293B] border border-[#334155] hover:border-blue-400 transition-all duration-300">
              <div className="card-body">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="card-title text-white text-xl">{project.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-gray-300">{project.creator}</span>
                      <span className="text-gray-500">•</span>
                      <div className="flex items-center text-gray-400">
                        <MapPin className="w-4 h-4 mr-1" />
                        {project.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(project.status)}
                    {getCategoryBadge(project.category)}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="badge badge-outline badge-sm">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400" />
                    <span>{project.stars} stars</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span>{project.collaborators} collaborators</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span>Created {formatDate(project.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>Team of {project.teamSize}</span>
                  </div>
                </div>

                {/* Looking For */}
                <div className="mb-4">
                  <p className="text-gray-300 font-medium mb-2">Looking for:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.lookingFor.map((role, index) => (
                      <span key={index} className="badge badge-primary badge-sm">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedProject === project.id && (
                  <div className="space-y-4 pt-4 border-t border-[#334155]">
                    <div className="flex flex-wrap gap-4">
                      {project.repoLink && (
                        <a
                          href={project.repoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline btn-sm"
                        >
                          <Code className="w-4 h-4 mr-1" />
                          View Code
                        </a>
                      )}
                      {project.demoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline btn-sm"
                        >
                          <Globe className="w-4 h-4 mr-1" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => toggleExpandProject(project.id)}
                  >
                    {expandedProject === project.id ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        Show More
                      </>
                    )}
                  </button>
                  <button
                    className="btn bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white"
                    onClick={() => handleCollaborateClick(project.id)}
                  >
                    <Send className="w-4 h-4 mr-1" />
                    Collaborate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              {searchTerm || categoryFilter !== 'all'
                ? 'No matching projects found'
                : 'No projects available yet'
              }
            </h3>
            <p className="text-gray-500">
              {searchTerm || categoryFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Check back later for new projects'
              }
            </p>
          </div>
        )}

        {/* Collaboration Modal */}
        {collaborationModal && (
          <div className="modal modal-open">
            <div className="modal-box bg-[#1E293B] border border-[#334155] max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-white">
                  Request Collaboration
                </h3>
                <button
                  className="btn btn-ghost btn-circle btn-sm"
                  onClick={() => setCollaborationModal(null)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6 p-4 bg-slate-800 rounded-lg">
                <h4 className="font-semibold text-white mb-2">
                  {projects.find(p => p.id === collaborationModal)?.title}
                </h4>
                <p className="text-gray-400 text-sm">
                  {projects.find(p => p.id === collaborationModal)?.creator}
                </p>
              </div>

              <form onSubmit={handleCollaborationSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">Your Message *</span>
                  </label>
                  <textarea
                    name="message"
                    value={collaborationForm.message}
                    onChange={handleInputChange}
                    placeholder="Introduce yourself and explain why you're interested in collaborating..."
                    rows={4}
                    className="textarea textarea-bordered bg-[#1E293B] border-[#334155] text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-300">Requested Role *</span>
                    </label>
                    <select
                      name="role"
                      value={collaborationForm.role}
                      onChange={handleInputChange}
                      className="select select-bordered bg-[#1E293B] border-[#334155] text-white"
                      required
                    >
                      <option value="">Select a role</option>
                      {projects.find(p => p.id === collaborationModal)?.lookingFor.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-300">Availability *</span>
                    </label>
                    <select
                      name="availability"
                      value={collaborationForm.availability}
                      onChange={handleInputChange}
                      className="select select-bordered bg-[#1E293B] border-[#334155] text-white"
                      required
                    >
                      <option value="">Select availability</option>
                      <option value="part-time">Part-time (1-20 hrs/week)</option>
                      <option value="full-time">Full-time (40+ hrs/week)</option>
                      <option value="weekends">Weekends only</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">Relevant Skills *</span>
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={collaborationForm.skills}
                    onChange={handleInputChange}
                    placeholder="List your relevant skills separated by commas"
                    className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">Portfolio/GitHub Link</span>
                  </label>
                  <input
                    type="url"
                    name="portfolioLink"
                    value={collaborationForm.portfolioLink}
                    onChange={handleInputChange}
                    placeholder="https://github.com/yourusername"
                    className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                  />
                </div>

                <div className="modal-action">
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setCollaborationModal(null)}
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

export default AllProjects;