import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Clock,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  ExternalLink,
  Ticket,
  Building,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Globe,
  User,
} from "lucide-react";
import { use } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Loader from "../Components/Loader";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user) return;

    const fetchEvents = async () => {
      try {
        const creatorId = user.uid;
        const res = await axiosSecure.get(`/api/creator/${creatorId}`);
        setEvents(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching events:", err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user, axiosSecure]);

  const filteredEvents = Array.isArray(events)
    ? events.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const getCategoryBadge = (category) => {
    const categoryConfig = {
      Networking: { color: "badge-primary", text: "Networking" },
      Conference: { color: "badge-secondary", text: "Conference" },
      Workshop: { color: "badge-accent", text: "Workshop" },
      Seminar: { color: "badge-info", text: "Seminar" },
      Webinar: { color: "badge-success", text: "Webinar" },
    };
    const config = categoryConfig[category] || {
      color: "badge-neutral",
      text: category,
    };
    return <span className={`badge ${config.color}`}>{config.text}</span>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeRange = (startTime, endTime) => {
    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
  };

  const toggleExpandEvent = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  const handleEditEvent = (eventId) => {
    console.log(`Editing event ${eventId}`);
    // Navigate to edit page
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      console.log(`Deleting event ${eventId}`);
      // API call to delete event
    }
  };

  const handleViewAnalytics = (eventId) => {
    console.log(`Viewing analytics for event ${eventId}`);
    // Navigate to analytics page
  };

  const stats = {
    totalEvents: events.length,
    virtualEvents: events.filter((event) => event.is_virtual).length,
    paidEvents: events.filter((event) => parseFloat(event.price) > 0).length,
    upcomingEvents: events.filter((event) => new Date(event.date) > new Date())
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
            <h1 className="text-3xl font-bold text-white">My Events</h1>
            <p className="text-gray-400 mt-2">Manage your created events</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              value: stats.totalEvents,
              label: "Total Events",
              color: "text-white",
              icon: <Calendar className="w-5 h-5" />,
            },
            {
              value: stats.virtualEvents,
              label: "Virtual Events",
              color: "text-blue-400",
              icon: <Globe className="w-5 h-5" />,
            },
            {
              value: stats.paidEvents,
              label: "Paid Events",
              color: "text-emerald-400",
              icon: <DollarSign className="w-5 h-5" />,
            },
            {
              value: stats.upcomingEvents,
              label: "Upcoming",
              color: "text-amber-400",
              icon: <Clock className="w-5 h-5" />,
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
              placeholder="Search your events by title, description, or category..."
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
            <option value="Networking">Networking</option>
            <option value="Conference">Conference</option>
            <option value="Workshop">Workshop</option>
            <option value="Seminar">Seminar</option>
            <option value="Webinar">Webinar</option>
          </select>
        </div>

        {/* Events List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                {searchTerm || categoryFilter !== "all"
                  ? "No matching events found"
                  : "No events created yet"}
              </h3>
              <p className="text-gray-500">
                {searchTerm || categoryFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by creating your first event"}
              </p>
            </div>
          ) : (
            filteredEvents.map((event) => (
              <div
                key={event.id}
                className="card bg-[#1E293B] border border-[#334155] hover:border-blue-400 transition-all duration-300"
              >
                <div className="card-body">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="card-title text-white text-xl">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">Created by You</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getCategoryBadge(event.category)}
                      {event.is_virtual ? (
                        <span className="badge badge-info badge-sm">
                          Virtual
                        </span>
                      ) : (
                        <span className="badge badge-warning badge-sm">
                          In-person
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>
                        {getTimeRange(event.start_time, event.end_time)}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span>
                        {event.price === "0.00" || event.price === "0"
                          ? "Free"
                          : `$${event.price}`}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Users className="w-4 h-4 mr-2" />
                      <span>Capacity: {event.capacity}</span>
                    </div>
                  </div>

                  {/* Virtual Link */}
                  {event.is_virtual && event.virtual_link && (
                    <div className="mb-4">
                      <div className="flex items-center text-gray-400">
                        <Globe className="w-4 h-4 mr-2" />
                        <a
                          href={event.virtual_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          {event.virtual_link}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Expanded Details */}
                  {expandedEvent === event.id && (
                    <div className="space-y-4 pt-4 border-t border-[#334155]">
                      <div>
                        <p className="text-gray-300 font-medium mb-2">
                          Full Description
                        </p>
                        <p className="text-gray-400">{event.description}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-300 font-medium mb-2">
                            Event ID
                          </p>
                          <p className="text-gray-400">{event.id}</p>
                        </div>
                        <div>
                          <p className="text-gray-300 font-medium mb-2">
                            Created On
                          </p>
                          <p className="text-gray-400">
                            {formatDate(event.created_at)}
                          </p>
                        </div>
                      </div>

                      {event.location && (
                        <div>
                          <p className="text-gray-300 font-medium mb-2">
                            Location
                          </p>
                          <div className="flex items-center text-gray-400">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-between items-center">
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => toggleExpandEvent(event.id)}
                    >
                      {expandedEvent === event.id ? (
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
                    <div className="flex items-center gap-2">
                      <div className="dropdown dropdown-end">
                        <div
                          tabIndex={0}
                          role="button"
                          className="btn btn-ghost btn-circle btn-sm"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-[#1E293B] rounded-box w-52 border border-[#334155]"
                        >
                          <li>
                            <a onClick={() => handleEditEvent(event.id)}>
                              <Edit className="w-4 h-4" /> Edit Event
                            </a>
                          </li>
                          <li>
                            <a onClick={() => handleViewAnalytics(event.id)}>
                              <Eye className="w-4 h-4" /> View Analytics
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() => handleDeleteEvent(event.id)}
                              className="text-error"
                            >
                              <Trash2 className="w-4 h-4" /> Delete Event
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyEvents;
