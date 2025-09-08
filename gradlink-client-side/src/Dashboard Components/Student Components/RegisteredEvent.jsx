import React, { useState } from 'react';
import { Link } from 'react-router';
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Clock,
  Users,
  Ticket,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Share2,
  Star,
  XCircle,
  CheckCircle,
  Eye
} from 'lucide-react';

const RegisteredEvents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedEvent, setExpandedEvent] = useState(null);

  // Sample registered events data
  const registeredEvents = [
    {
      id: 1,
      title: "Tech Conference 2024",
      organizer: "Tech Community BD",
      location: "Dhaka, Bangladesh",
      type: "conference",
      date: "2024-04-20",
      time: "9:00 AM - 5:00 PM",
      status: "registered",
      registrationStatus: "Confirmed",
      ticketId: "TC2024-00125",
      price: "৳2,500",
      registrationDate: "2024-03-10",
      description: "Join us for the biggest tech conference of the year featuring industry experts and networking opportunities.",
      agenda: [
        "9:00 AM - Keynote Speech",
        "10:30 AM - Web Development Workshop",
        "1:00 PM - Lunch & Networking",
        "2:30 PM - AI & ML Panel Discussion",
        "4:00 PM - Closing Remarks"
      ],
      speakers: ["Dr. Sarah Johnson", "Prof. Michael Chen", "Eng. Maria Rodriguez"],
      requirements: ["Registration required", "Business casual"],
      isVirtual: false,
      attendees: 240,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      venue: "International Convention City Bashundhara",
      contact: {
        email: "info@techcommunitybd.com",
        phone: "+880 1234 567890"
      }
    },
    {
      id: 2,
      title: "Web Development Workshop",
      organizer: "Code Academy",
      location: "Remote",
      type: "workshop",
      date: "2024-03-25",
      time: "3:00 PM - 6:00 PM",
      status: "registered",
      registrationStatus: "Confirmed",
      ticketId: "WDW2024-00892",
      price: "Free",
      registrationDate: "2024-03-05",
      description: "Learn the fundamentals of web development in this hands-on workshop.",
      agenda: [
        "3:00 PM - HTML & CSS Basics",
        "4:00 PM - JavaScript Fundamentals",
        "5:00 PM - React Introduction",
        "5:45 PM - Q&A Session"
      ],
      speakers: ["Prof. David Wilson", "Dr. Emily Chen"],
      requirements: ["Laptop required", "Basic HTML knowledge"],
      isVirtual: true,
      attendees: 180,
      meetingLink: "https://meet.example.com/web-dev-workshop",
      contact: {
        email: "workshops@codeacademy.com",
        phone: "+880 9876 543210"
      }
    },
    {
      id: 3,
      title: "AI & Machine Learning Summit",
      organizer: "AI Research Lab",
      location: "Remote",
      type: "conference",
      date: "2024-05-05",
      time: "10:00 AM - 4:00 PM",
      status: "waiting",
      registrationStatus: "Waitlisted",
      ticketId: "AML2024-00347",
      price: "৳1,500",
      registrationDate: "2024-03-12",
      description: "Explore the latest advancements in AI and machine learning with industry leaders.",
      agenda: [
        "10:00 AM - Keynote: Future of AI",
        "11:30 AM - Machine Learning Workshop",
        "1:00 PM - Lunch Break",
        "2:00 PM - Neural Networks Deep Dive",
        "3:30 PM - Networking Session"
      ],
      speakers: ["Dr. Robert Kim", "Prof. Lisa Zhang", "Dr. Ahmed Hassan"],
      requirements: ["Basic ML knowledge", "Registration required"],
      isVirtual: true,
      attendees: 320,
      waitlistPosition: 15,
      meetingLink: "https://meet.example.com/ai-summit",
      contact: {
        email: "events@airesearchlab.com",
        phone: "+880 5555 123456"
      }
    },
    {
      id: 4,
      title: "Startup Networking Night",
      organizer: "Entrepreneurs Hub",
      location: "Chittagong, Bangladesh",
      type: "networking",
      date: "2024-03-18",
      time: "6:00 PM - 9:00 PM",
      status: "cancelled",
      registrationStatus: "Cancelled",
      ticketId: "SNN2024-00456",
      price: "৳1,000",
      registrationDate: "2024-02-20",
      description: "Connect with fellow entrepreneurs and investors in a relaxed setting.",
      agenda: [
        "6:00 PM - Welcome Reception",
        "6:30 PM - Founder Stories",
        "7:30 PM - Networking Session",
        "8:30 PM - Closing Remarks"
      ],
      speakers: ["CEO John Smith", "Investor Maria Garcia"],
      requirements: ["Business cards", "Startup pitch optional"],
      isVirtual: false,
      attendees: 115,
      cancellationReason: "Event postponed by organizer",
      venue: "Hotel Sea Pearl, Chittagong",
      contact: {
        email: "network@entrepreneurshub.com",
        phone: "+880 1712 345678"
      }
    }
  ];

  const filteredEvents = registeredEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      'registered': { color: 'badge-success', text: 'Registered', icon: CheckCircle },
      'waiting': { color: 'badge-warning', text: 'Waitlisted', icon: Clock },
      'cancelled': { color: 'badge-error', text: 'Cancelled', icon: XCircle }
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusCounts = () => {
    return {
      total: registeredEvents.length,
      registered: registeredEvents.filter(event => event.status === 'registered').length,
      waiting: registeredEvents.filter(event => event.status === 'waiting').length,
      cancelled: registeredEvents.filter(event => event.status === 'cancelled').length
    };
  };

  const statusCounts = getStatusCounts();

  const toggleExpandEvent = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  const downloadTicket = (eventId) => {
    console.log(`Downloading ticket for event ${eventId}`);
    // API call to download ticket
  };

  const addToCalendar = (event) => {
    console.log(`Adding event to calendar: ${event.title}`);
    // Add to calendar functionality
  };

  const shareEvent = (event) => {
    console.log(`Sharing event: ${event.title}`);
    // Share functionality
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-screen-xl px-5 lg:px-5 mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Registered Events</h1>
            <p className="text-gray-400 mt-2">Manage your event registrations and access tickets</p>
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
            { value: statusCounts.total, label: 'Total Events', color: 'text-white', icon: <Calendar className="w-5 h-5" /> },
            { value: statusCounts.registered, label: 'Registered', color: 'text-emerald-400', icon: <CheckCircle className="w-5 h-5" /> },
            { value: statusCounts.waiting, label: 'Waitlisted', color: 'text-amber-400', icon: <Clock className="w-5 h-5" /> },
            { value: statusCounts.cancelled, label: 'Cancelled', color: 'text-red-400', icon: <XCircle className="w-5 h-5" /> }
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
        <div className="grid grid-cols-1 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="card bg-[#1E293B] border border-[#334155] hover:border-blue-400 transition-all duration-300">
              <div className="card-body">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="card-title text-white text-xl">{event.title}</h3>
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
                  <p className={`font-medium ${event.status === 'registered' ? 'text-emerald-400' :
                    event.status === 'waiting' ? 'text-amber-400' : 'text-red-400'
                    }`}>
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

                {/* Ticket Information */}
                <div className="bg-slate-800/50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Ticket className="w-5 h-5 text-blue-400 mr-2" />
                      <span className="text-gray-300">Ticket ID: {event.ticketId}</span>
                    </div>
                    {event.status === 'registered' && (
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
                    {/* Event Description */}
                    <div>
                      <p className="text-gray-300 font-medium mb-2">Event Description</p>
                      <p className="text-gray-400">{event.description}</p>
                    </div>

                    {/* Agenda */}
                    <div>
                      <p className="text-gray-300 font-medium mb-2">Agenda</p>
                      <ul className="list-disc list-inside text-gray-400">
                        {event.agenda.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Speakers */}
                    <div>
                      <p className="text-gray-300 font-medium mb-2">Speakers</p>
                      <div className="flex flex-wrap gap-2">
                        {event.speakers.map((speaker, index) => (
                          <span key={index} className="badge badge-outline badge-info">
                            {speaker}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Requirements */}
                    <div>
                      <p className="text-gray-300 font-medium mb-2">Requirements</p>
                      <div className="flex flex-wrap gap-2">
                        {event.requirements.map((requirement, index) => (
                          <span key={index} className="badge badge-outline badge-warning">
                            {requirement}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                      <p className="text-gray-300 font-medium mb-2">Contact Information</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400">
                        <div>
                          <p>Email: {event.contact.email}</p>
                          <p>Phone: {event.contact.phone}</p>
                        </div>
                        {event.venue && (
                          <div>
                            <p>Venue: {event.venue}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Virtual Event Link */}
                    {event.isVirtual && event.meetingLink && (
                      <div>
                        <p className="text-gray-300 font-medium mb-2">Meeting Link</p>
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

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-4">
                      <button className="btn btn-outline btn-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        Add to Calendar
                      </button>
                      <button className="btn btn-outline btn-sm">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share Event
                      </button>
                      {event.isVirtual && event.meetingLink && (
                        <button className="btn btn-primary btn-sm">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Join Meeting
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
                  <div className="flex gap-2">
                    <button className="btn btn-outline btn-sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View Event
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              {searchTerm || statusFilter !== 'all'
                ? 'No matching events found'
                : "You haven't registered for any events yet"
              }
            </h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Browse events and register to see them here'
              }
            </p>
            {(searchTerm === '' && statusFilter === 'all') && (
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