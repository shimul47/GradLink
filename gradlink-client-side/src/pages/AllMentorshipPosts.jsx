import React, { useState, useEffect, useContext } from "react";
import {
  Search,
  Clock,
  MapPin,
  DollarSign,
  Users,
  Calendar,
  MessageCircle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Send,
  X,
} from "lucide-react";
import { AuthContext } from "../Contexts/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AllMentorshipPosts = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [mentorshipPosts, setMentorshipPosts] = useState([]);
  const [alumniData, setAlumniData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [requestModal, setRequestModal] = useState(null);
  const [requestForm, setRequestForm] = useState({
    message: "",
    goals: "",
    availability: "",
    skills: "",
    portfolioLink: "",
  });
  const [expandedMentorship, setExpandedMentorship] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch mentorship posts
  useEffect(() => {
    const fetchMentorships = async () => {
      try {
        const res = await axiosSecure.get("/api/getallmentorship");
        setMentorshipPosts(res.data);
      } catch (err) {
        console.error("Error fetching mentorship posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMentorships();
  }, [axiosSecure]);

  // Fetch alumni info
  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await axiosSecure.get("/alumnilist");
        const alumniMap = {};
        res.data.forEach((alumni) => {
          alumniMap[alumni.userId] = {
            fullName: alumni.fullName,
            company: alumni.company || "",
          };
        });
        setAlumniData(alumniMap);
      } catch (err) {
        console.error("Error fetching alumni list:", err);
      }
    };
    fetchAlumni();
  }, [axiosSecure]);

  const filteredMentorships = mentorshipPosts.filter((mentorship) => {
    const matchesSearch =
      mentorship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentorship.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentorship.specialties.some((s) =>
        s.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      categoryFilter === "all" || mentorship.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id) =>
    setExpandedMentorship(expandedMentorship === id ? null : id);

  const handleRequestClick = (mentorship) => {
    setRequestModal(mentorship);
    setRequestForm({
      message: "",
      goals: "",
      availability: "",
      skills: "",
      portfolioLink: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequestForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    if (!requestModal || !user?.uid) return;

    const requestData = {
      mentorshipId: requestModal.id,
      mentorshipTitle: requestModal.title,
      mentorId: requestModal.creatorId, // creatorId from mentorship post
      senderId: user.uid, // current user sending request
      message: requestForm.message,
      goals: requestForm.goals,
      availability: requestForm.availability,
      skills: requestForm.skills.split(",").map((s) => s.trim()), // convert string to array
      portfolioLink: requestForm.portfolioLink || null,
    };

    try {
      const res = await axiosSecure.post(
        "/api/mentorship-request",
        requestData
      );
      if (res.status === 201) {
        alert("Mentorship request sent successfully!");
        setRequestModal(null);
      } else {
        throw new Error("Failed to send request");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending request. Try again later.");
    }
  };

  const getCategoryBadge = (category) => {
    const map = {
      career: { text: "Career Guidance", color: "badge-primary" },
      technical: { text: "Technical Skills", color: "badge-secondary" },
      portfolio: { text: "Portfolio Review", color: "badge-accent" },
      interview: { text: "Interview Prep", color: "badge-info" },
    };
    const cfg = map[category] || { text: category, color: "badge-neutral" };
    return <span className={`badge ${cfg.color}`}>{cfg.text}</span>;
  };

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Find Mentors</h1>
            <p className="text-gray-400 mt-2">
              Connect with experienced professionals for guidance
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search mentorships..."
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

        {/* Mentorship Cards */}
        <div className="grid grid-cols-1 gap-6">
          {filteredMentorships.map((mentorship) => {
            const alumni = alumniData[mentorship.creatorId] || {};
            return (
              <div
                key={mentorship.id}
                className="card bg-[#1E293B] border border-[#334155] hover:border-blue-400 transition-all duration-300"
              >
                <div className="card-body">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="card-title text-white text-xl">
                        {mentorship.title}
                      </h3>
                      <div className="text-gray-400 mt-1">
                        {alumni.fullName ? alumni.fullName : "Loading..."}{" "}
                        {alumni.company ? `• ${alumni.company}` : ""}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getCategoryBadge(mentorship.category)}
                      {mentorship.isRemote && (
                        <span className="badge badge-info badge-sm">
                          Remote
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 mb-4">{mentorship.description}</p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mentorship.specialties.map((s, i) => (
                      <span
                        key={i}
                        className="badge badge-outline badge-primary badge-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Session On: {mentorship.availability}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Max {mentorship.max_mentees} mentees
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedMentorship === mentorship.id && (
                    <div className="space-y-4 pt-4 border-t border-[#334155]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-300 font-medium mb-2">
                            Session Details:
                          </p>

                          <p className="text-sm text-gray-400 mb-1">
                            Session Format: {mentorship.session_format}
                          </p>
                          <p className="text-sm text-gray-400">
                            Session Length: {mentorship.session_length}
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            Enrollment Fee: {mentorship.price} BDT
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-between items-center">
                    <button
                      className="btn btn-outline text-white shadow-none btn-sm"
                      onClick={() => toggleExpand(mentorship.id)}
                    >
                      {expandedMentorship === mentorship.id ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-1" /> Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-1" /> Learn More
                        </>
                      )}
                    </button>
                    <button
                      className="btn bg-gradient-to-r from-blue-500 to-emerald-400 border-none shadow-none text-white"
                      onClick={() => handleRequestClick(mentorship)}
                      disabled={
                        mentorship.currentMentees >= mentorship.maxMentees
                      }
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {mentorship.currentMentees >= mentorship.maxMentees
                        ? "Full"
                        : "Request Mentorship"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredMentorships.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No mentorships found.</p>
            </div>
          )}
        </div>

        {/* Request Modal */}
        {requestModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50">
            <div className="bg-[#1E293B] rounded-lg p-6 w-full max-w-md text-white relative">
              <button
                className="absolute top-3 right-3 btn btn-ghost btn-sm"
                onClick={() => setRequestModal(null)}
              >
                <X className="w-4 h-4" />
              </button>
              <h2 className="text-xl font-bold mb-4">
                Request Mentorship: {requestModal.title}
              </h2>
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <textarea
                  name="message"
                  value={requestForm.message}
                  onChange={handleInputChange}
                  placeholder="Introduce yourself and reason for request"
                  className="textarea textarea-bordered w-full bg-[#111827] text-white"
                  required
                />
                <textarea
                  name="goals"
                  value={requestForm.goals}
                  onChange={handleInputChange}
                  placeholder="Your goals for this mentorship"
                  className="textarea textarea-bordered w-full bg-[#111827] text-white"
                  required
                />
                <input
                  type="text"
                  name="availability"
                  value={requestForm.availability}
                  onChange={handleInputChange}
                  placeholder="Availability (e.g., weekends)"
                  className="input input-bordered w-full bg-[#111827] text-white"
                  required
                />
                <input
                  type="text"
                  name="skills"
                  value={requestForm.skills}
                  onChange={handleInputChange}
                  placeholder="Skills (comma separated, e.g., React, Python)"
                  className="input input-bordered w-full bg-[#111827] text-white"
                  required
                />
                <input
                  type="url"
                  name="portfolioLink"
                  value={requestForm.portfolioLink}
                  onChange={handleInputChange}
                  placeholder="Portfolio link (optional)"
                  className="input input-bordered w-full bg-[#111827] text-white"
                />
                <button
                  type="submit"
                  className="btn w-full bg-gradient-to-r from-blue-500 to-emerald-400 shadow-none text-white border-none"
                >
                  <Send className="w-4 h-4 mr-1" /> Send Request
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllMentorshipPosts;
