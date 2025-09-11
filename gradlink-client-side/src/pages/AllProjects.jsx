import React, { useState, useEffect, useContext } from "react";
import {
  Search,
  Filter,
  MapPin,
  Users,
  Clock,
  Calendar,
  Code,
  Globe,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Send,
  X,
  Star,
  Eye,
  User,
  Briefcase,
} from "lucide-react";
import { AuthContext } from "../Contexts/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Loader from "../Components/Loader";

const AllProjects = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [projects, setProjects] = useState([]);
  const [alumniList, setAlumniList] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [collaborationModal, setCollaborationModal] = useState(null);
  const [collaborationForm, setCollaborationForm] = useState({
    message: "",
    role: "",
    availability: "",
    skillsInput: "",
    skills: [],
    portfolioLink: "",
    receiverUserId: "",
  });
  const [expandedProject, setExpandedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axiosSecure.get("/projects");
        setProjects(Array.isArray(res.data.projects) ? res.data.projects : []);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [axiosSecure]);

  // Fetch alumni list and cache by userId
  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await axiosSecure.get("/alumnilist");
        const alumniMap = {};
        res.data.forEach((alumni) => {
          alumniMap[alumni.userId] = alumni.fullName;
        });
        setAlumniList(alumniMap);
      } catch (err) {
        console.error("Error fetching alumni list:", err);
      }
    };
    fetchAlumni();
  }, [axiosSecure]);

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const projectOwnerName = alumniList[project.userId] || project.userId;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.techStacks?.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      projectOwnerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || project.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Open collaboration modal
  const handleCollaborateClick = (project) => {
    setCollaborationModal(project);
    setCollaborationForm({
      message: "",
      role: "",
      availability: "",
      skillsInput: "",
      skills: [],
      portfolioLink: "",
      receiverUserId: project.userId,
    });
  };

  // Form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "skillsInput") {
      const skillsArray = value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      setCollaborationForm((prev) => ({
        ...prev,
        skillsInput: value,
        skills: skillsArray,
      }));
    } else {
      setCollaborationForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit collaboration request
  const handleCollaborationSubmit = async (e) => {
    e.preventDefault();
    const {
      message,
      role,
      availability,
      skills,
      portfolioLink,
      receiverUserId,
    } = collaborationForm;

    if (!message || !role || !availability || skills.length === 0) {
      return alert(
        "Please fill all required fields and add at least one skill."
      );
    }

    try {
      await axiosSecure.post("/collaboration-requests", {
        projectId: collaborationModal.projectId,
        senderUserId: user?.uid,
        receiverUserId,
        message,
        requestedRole: role,
        availability,
        portfolioLink: portfolioLink || null,
        skills,
      });
      alert("Collaboration request sent successfully!");
      setCollaborationModal(null);
      setCollaborationForm({
        message: "",
        role: "",
        availability: "",
        skillsInput: "",
        skills: [],
        portfolioLink: "",
        receiverUserId: "",
      });
    } catch (err) {
      console.error("Error sending collaboration request:", err);
      alert("Failed to send collaboration request.");
    }
  };

  const toggleExpandProject = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryBadge = (category) => {
    const categoryConfig = {
      "Software Development": { color: "badge-primary", text: "Software Dev" },
      "Web Development": { color: "badge-secondary", text: "Web Dev" },
      "AI/ML": { color: "badge-accent", text: "AI/ML" },
      "Data Science": { color: "badge-info", text: "Data Science" },
      "Mobile Development": { color: "badge-success", text: "Mobile Dev" },
      IoT: { color: "badge-warning", text: "IoT" },
      Blockchain: { color: "badge-error", text: "Blockchain" },
    };
    const config = categoryConfig[category] || {
      color: "badge-neutral",
      text: category,
    };
    return <span className={`badge ${config.color}`}>{config.text}</span>;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      planning: { color: "badge-warning", text: "Planning" },
      active: { color: "badge-success", text: "Active" },
      development: { color: "badge-info", text: "Development" },
      completed: { color: "badge-neutral", text: "Completed" },
    };
    const config = statusConfig[status] || {
      color: "badge-neutral",
      text: status,
    };
    return <span className={`badge ${config.color}`}>{config.text}</span>;
  };

  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter((p) => p.status === "active").length,
    planningProjects: projects.filter((p) => p.status === "planning").length,
    developmentProjects: projects.filter((p) => p.status === "development")
      .length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">All Projects</h1>
            <p className="text-gray-400 mt-2">
              Discover projects to collaborate on
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              value: stats.totalProjects,
              label: "Total Projects",
              color: "text-white",
              icon: <BookOpen className="w-5 h-5" />,
            },
            {
              value: stats.activeProjects,
              label: "Active",
              color: "text-emerald-400",
              icon: <Star className="w-5 h-5" />,
            },
            {
              value: stats.planningProjects,
              label: "Planning",
              color: "text-amber-400",
              icon: <Clock className="w-5 h-5" />,
            },
            {
              value: stats.developmentProjects,
              label: "Development",
              color: "text-blue-400",
              icon: <Code className="w-5 h-5" />,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="card bg-[#1E293B] border border-[#334155] shadow-lg"
            >
              <div className="card-body p-4 flex flex-row items-center">
                <div className={`rounded-lg p-2 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="ml-3">
                  <div className={`text-xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
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
              placeholder="Search projects by name, owner, tech, or description..."
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
            <option value="Software Development">Software Development</option>
            <option value="Web Development">Web Development</option>
            <option value="AI/ML">AI/ML</option>
            <option value="Data Science">Data Science</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="IoT">IoT</option>
            <option value="Blockchain">Blockchain</option>
          </select>
          <select
            className="select select-bordered bg-[#1E293B] border-[#334155] text-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="development">Development</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                {searchTerm ||
                categoryFilter !== "all" ||
                statusFilter !== "all"
                  ? "No matching projects found"
                  : "No projects available yet"}
              </h3>
              <p className="text-gray-500">
                {searchTerm ||
                categoryFilter !== "all" ||
                statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Check back later for new projects"}
              </p>
            </div>
          ) : (
            filteredProjects.map((project) => {
              const ownerName = alumniList[project.userId] || project.userId;

              return (
                <div
                  key={project.projectId}
                  className="card bg-[#1E293B] border border-[#334155] hover:border-blue-400 transition-all duration-300"
                >
                  <div className="card-body">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="card-title text-white text-xl">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">By {ownerName}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(project.status)}
                        {getCategoryBadge(project.category)}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Project Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-gray-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Start: {formatDate(project.startDate)}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>End: {formatDate(project.endDate)}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Max Members: {project.maxMembers}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Created: {formatDate(project.createdAt)}</span>
                      </div>
                    </div>

                    {/* Technologies */}
                    {project.techStacks && project.techStacks.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStacks.map((tech, idx) => (
                          <span
                            key={idx}
                            className="badge badge-outline badge-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Expanded Details */}
                    {expandedProject === project.projectId && (
                      <div className="space-y-4 pt-4 border-t border-[#334155]">
                        <div>
                          <p className="text-gray-300 font-medium mb-2">
                            Full Description
                          </p>
                          <p className="text-gray-400">{project.description}</p>
                        </div>

                        <div>
                          <p className="text-gray-300 font-medium mb-2">
                            Technical Stack
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.techStacks?.map((tech, idx) => (
                              <span
                                key={idx}
                                className="badge badge-primary badge-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-between items-center">
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => toggleExpandProject(project.projectId)}
                      >
                        {expandedProject === project.projectId ? (
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
                      <button
                        className="btn bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white"
                        onClick={() => handleCollaborateClick(project)}
                      >
                        <Send className="w-4 h-4 mr-1" />
                        Collaborate
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

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
                  {collaborationModal.title}
                </h4>
                <p className="text-gray-400">
                  by{" "}
                  {alumniList[collaborationModal.userId] ||
                    collaborationModal.userId}
                </p>
              </div>

              <form onSubmit={handleCollaborationSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">
                      Your Message *
                    </span>
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
                      <span className="label-text text-gray-300">
                        Requested Role *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={collaborationForm.role}
                      onChange={handleInputChange}
                      placeholder="e.g., Frontend Developer, Data Analyst"
                      className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-300">
                        Availability *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="availability"
                      value={collaborationForm.availability}
                      onChange={handleInputChange}
                      placeholder="e.g., 10 hours/week, Weekends"
                      className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">Skills *</span>
                  </label>
                  <input
                    type="text"
                    name="skillsInput"
                    value={collaborationForm.skillsInput}
                    onChange={handleInputChange}
                    placeholder="React, Python, SQL (comma separated)"
                    className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">
                      Portfolio Link (Optional)
                    </span>
                  </label>
                  <input
                    type="url"
                    name="portfolioLink"
                    value={collaborationForm.portfolioLink}
                    onChange={handleInputChange}
                    placeholder="https://yourportfolio.com"
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
