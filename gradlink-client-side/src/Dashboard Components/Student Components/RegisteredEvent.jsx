import React, { useState, useEffect, use } from "react";
import { Link } from "react-router";
import {
  Search,
  Calendar,
  MapPin,
  Clock,
  Ticket,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Share2,
  XCircle,
  CheckCircle,
  Eye,
} from "lucide-react";

import { AuthContext } from "../../Contexts/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const RegisteredEvents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  const userId = user?.id;

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(`/api/responder/${userId}`);
        setRegisteredEvents(response.data || []); // Ensure empty array if no data
      } catch (error) {
        console.error("Failed to fetch registered events:", error);
        setRegisteredEvents([]); // Ensure empty array on error
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchRegisteredEvents();
  }, [userId, axiosSecure]);

  const filteredEvents = registeredEvents.filter((event) => {
    const matchesSearch =
      event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      registered: {
        color: "badge-success",
        text: "Registered",
        icon: CheckCircle,
      },
      waiting: { color: "badge-warning", text: "Waitlisted", icon: Clock },
      cancelled: { color: "badge-error", text: "Cancelled", icon: XCircle },
    };
    const config = statusConfig[status] || statusConfig.registered;
    const IconComponent = config.icon;

    return (
      <span className={`badge ${config.color} gap-1`}>
        <IconComponent className="w-3 h-3" />
        {config.text}
      </span>
    );
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getStatusCounts = () => ({
    total: registeredEvents.length,
    registered: registeredEvents.filter((e) => e.status === "registered")
      .length,
    waiting: registeredEvents.filter((e) => e.status === "waiting").length,
    cancelled: registeredEvents.filter((e) => e.status === "cancelled").length,
  });

  const statusCounts = getStatusCounts();

  const toggleExpandEvent = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  const downloadTicket = (eventId) => {
    console.log(`Downloading ticket for event ${eventId}`);
  };

  const addToCalendar = (event) => {
    console.log(`Adding event to calendar: ${event.title}`);
  };

  const shareEvent = (event) => {
    console.log(`Sharing event: ${event.title}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading your registered events...
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-screen-xl px-5 lg:px-5 mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Registered Events</h1>
            <p className="text-gray-400 mt-2">
              Manage your event registrations and access tickets
            </p>
          </div>
          <Link
            to="/events"
            className="btn bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white mt-4 md:mt-0"
          >
            Browse Events
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              value: statusCounts.total,
              label: "Total Events",
              color: "text-white",
              icon: <Calendar className="w-5 h-5" />,
            },
            {
              value: statusCounts.registered,
              label: "Registered",
              color: "text-emerald-400",
              icon: <CheckCircle className="w-5 h-5" />,
            },
            {
              value: statusCounts.waiting,
              label: "Waitlisted",
              color: "text-amber-400",
              icon: <Clock className="w-5 h-5" />,
            },
            {
              value: statusCounts.cancelled,
              label: "Cancelled",
              color: "text-red-400",
              icon: <XCircle className="w-5 h-5" />,
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
              placeholder="Search registered events by title, organizer, or location..."
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
            <option value="registered">Registered</option>
            <option value="waiting">Waitlisted</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Registered Events List */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredEvents.map((event) => (
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
                        <span className="text-gray-300">{event.organizer}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400">{event.type}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(event.status)}
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-gray-400">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                  </div>

                  {/* Status Message */}
                  <div className="mb-4">
                    <p
                      className={`font-medium ${
                        event.status === "registered"
                          ? "text-emerald-400"
                          : event.status === "waiting"
                          ? "text-amber-400"
                          : "text-red-400"
                      }`}
                    >
                      {event.registrationStatus}
                    </p>
                    {event.waitlistPosition && (
                      <p className="text-gray-400 mt-1">
                        Your waitlist position: #{event.waitlistPosition}
                      </p>
                    )}
                    {event.cancellationReason && (
                      <p className="text-gray-400 mt-1">
                        {event.cancellationReason}
                      </p>
                    )}
                  </div>

                  {/* Ticket Info */}
                  <div className="bg-slate-800/50 p-4 rounded-lg mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Ticket className="w-5 h-5 text-blue-400 mr-2" />
                        <span className="text-gray-300">
                          Ticket ID: {event.ticketId}
                        </span>
                      </div>
                      {event.status === "registered" && (
                        <button
                          className="btn btn-sm bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white"
                          onClick={() => downloadTicket(event.id)}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download Ticket
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedEvent === event.id && (
                    <div className="space-y-4 pt-4 border-t border-[#334155]">
                      <div>
                        <p className="text-gray-300 font-medium mb-2">
                          Event Description
                        </p>
                        <p className="text-gray-400">{event.description}</p>
                      </div>
                      <div>
                        <p className="text-gray-300 font-medium mb-2">Agenda</p>
                        <ul className="list-disc list-inside text-gray-400">
                          {event.agenda?.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-gray-300 font-medium mb-2">
                          Speakers
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {event.speakers?.map((speaker, index) => (
                            <span
                              key={index}
                              className="badge badge-outline badge-info"
                            >
                              {speaker}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-300 font-medium mb-2">
                          Requirements
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {event.requirements?.map((requirement, index) => (
                            <span
                              key={index}
                              className="badge badge-outline badge-warning"
                            >
                              {requirement}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-300 font-medium mb-2">
                          Contact Information
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400">
                          <div>
                            <p>Email: {event.contact?.email}</p>
                            <p>Phone: {event.contact?.phone}</p>
                          </div>
                          {event.venue && (
                            <div>
                              <p>Venue: {event.venue}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      {event.isVirtual && event.meetingLink && (
                        <div>
                          <p className="text-gray-300 font-medium mb-2">
                            Meeting Link
                          </p>
                          <a
                            href={event.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300"
                          >
                            {event.meetingLink}
                          </a>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 pt-4">
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => addToCalendar(event)}
                        >
                          <Calendar className="w-4 h-4 mr-1" /> Add to Calendar
                        </button>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => shareEvent(event)}
                        >
                          <Share2 className="w-4 h-4 mr-1" /> Share Event
                        </button>
                        {event.isVirtual && event.meetingLink && (
                          <button className="btn btn-primary btn-sm">
                            <ExternalLink className="w-4 h-4 mr-1" /> Join
                            Meeting
                          </button>
                        )}
                      </div>
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
                          <ChevronUp className="w-4 h-4 mr-1" /> Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-1" /> View Details
                        </>
                      )}
                    </button>
                    <div className="flex gap-2">
                      <button className="btn btn-outline btn-sm">
                        <Eye className="w-4 h-4 mr-1" /> View Event
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              {searchTerm || statusFilter !== "all"
                ? "No matching events found"
                : "You haven't registered for any events yet"}
            </h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Browse events and register to see them here"}
            </p>
            {searchTerm === "" && statusFilter === "all" && (
              <Link
                to="/events"
                className="btn bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white mt-4"
              >
                Browse Events
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisteredEvents;
