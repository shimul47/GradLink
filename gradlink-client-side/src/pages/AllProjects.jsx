import React, { useState, useEffect, useContext } from "react";
import {
  Search,
  MapPin,
  Users,
  Clock,
  Star,
  Send,
  X,
  Code,
  Globe,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { AuthContext } from "../Contexts/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AllProjects = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [projects, setProjects] = useState([]);
  const [alumniList, setAlumniList] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
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

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axiosSecure.get("/projects");
        setProjects(res.data.projects);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchProjects();
  }, []);

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
  }, []);

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
    return matchesSearch && matchesCategory;
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
      receiverUserId: project.userId, // project owner
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
        projectId: collaborationModal.userId, // project owner
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

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getCategoryBadge = (category) => {
    const categoryConfig = {
      "web-development": { color: "badge-primary", text: "Web Dev" },
      "ai-ml": { color: "badge-secondary", text: "AI/ML" },
      iot: { color: "badge-accent", text: "IoT" },
      blockchain: { color: "badge-info", text: "Blockchain" },
      mobile: { color: "badge-success", text: "Mobile" },
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
            <option value="web-development">Web Development</option>
            <option value="ai-ml">AI/ML</option>
            <option value="iot">IoT</option>
            <option value="blockchain">Blockchain</option>
            <option value="mobile">Mobile</option>
          </select>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredProjects.map((project) => {
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
                      <div className="flex items-center gap-2 mt-1 text-gray-400">
                        Owner: {ownerName} • <MapPin className="w-4 h-4 mr-1" />
                        {project.location || "Remote"}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(project.status)}
                      {getCategoryBadge(project.category)}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 mb-4">{project.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStacks?.map((tech, idx) => (
                      <span key={idx} className="badge badge-outline badge-sm">
                        {tech}
                      </span>
                    ))}
                  </div>

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
                          Show More
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

                  {/* Expanded Details */}
                  {expandedProject === project.projectId && (
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
                </div>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">No projects found.</p>
          </div>
        )}
      </div>

      {/* Collaboration Modal */}
      {collaborationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1E293B] rounded-lg p-6 w-full max-w-md text-white relative">
            <button
              className="absolute top-3 right-3 btn btn-ghost btn-sm"
              onClick={() => setCollaborationModal(null)}
            >
              <X className="w-4 h-4" />
            </button>
            <h2 className="text-xl font-bold mb-4">
              Collaborate on {collaborationModal.title}
            </h2>
            <form onSubmit={handleCollaborationSubmit} className="space-y-4">
              <textarea
                name="message"
                placeholder="Your message"
                value={collaborationForm.message}
                onChange={handleInputChange}
                className="textarea textarea-bordered w-full bg-[#111827] text-white"
                required
              />
              <input
                type="text"
                name="role"
                placeholder="Requested role"
                value={collaborationForm.role}
                onChange={handleInputChange}
                className="input input-bordered w-full bg-[#111827] text-white"
                required
              />
              <input
                type="text"
                name="availability"
                placeholder="Availability (e.g., 10hrs/week)"
                value={collaborationForm.availability}
                onChange={handleInputChange}
                className="input input-bordered w-full bg-[#111827] text-white"
                required
              />
              <input
                type="text"
                name="skillsInput"
                placeholder="Skills (comma separated)"
                value={collaborationForm.skillsInput}
                onChange={handleInputChange}
                className="input input-bordered w-full bg-[#111827] text-white"
                required
              />
              <input
                type="text"
                name="portfolioLink"
                placeholder="Portfolio link (optional)"
                value={collaborationForm.portfolioLink}
                onChange={handleInputChange}
                className="input input-bordered w-full bg-[#111827] text-white"
              />
              <button
                type="submit"
                className="btn w-full bg-gradient-to-r from-blue-500 to-emerald-400 border-none"
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProjects;
