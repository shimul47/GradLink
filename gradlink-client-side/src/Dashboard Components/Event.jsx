import React, { useState } from 'react';
import { Link } from 'react-router';
import {
  Search,
  MapPin,
  Calendar,
  Eye,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Building,
  DollarSign,
  Ticket,
  Download,
  CalendarDays,
  Navigation
} from 'lucide-react';

const Event = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sample event data - only events the user has registered for
  const myEvents = [
    {
      id: 1,
      title: "Tech Conference 2024",
      organizer: "Tech Community BD",
      location: "Dhaka, Bangladesh",
      type: "conference",
      price: "৳2,500",
      date: "2024-04-20",
      time: "9:00 AM - 5:00 PM",
      experience: "All levels",
      description: "Join us for the biggest tech conference of the year featuring industry experts and networking opportunities.",
      requirements: ["Registration required", "Business casual"],
      isVirtual: false,
      status: "registered",
      registrationStatus: "confirmed",
      attendees: 240,
      views: 1156,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      registrationDate: "2024-03-10",
      ticketId: "TC2024-00125"
    },
    {
      id: 2,
      title: "Web Development Workshop",
      organizer: "Code Academy",
      location: "Remote",
      type: "workshop",
      price: "Free",
      date: "2024-03-25",
      time: "3:00 PM - 6:00 PM",
      experience: "Beginner",
      description: "Learn the fundamentals of web development in this hands-on workshop.",
      requirements: ["Laptop required", "Basic HTML knowledge"],
      isVirtual: true,
      status: "registered",
      registrationStatus: "confirmed",
      attendees: 180,
      views: 789,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      registrationDate: "2024-03-05",
      ticketId: "WDW2024-00892"
    },
    {
      id: 3,
      title: "AI & Machine Learning Summit",
      organizer: "AI Research Lab",
      location: "Remote",
      type: "conference",
      price: "৳1,500",
      date: "2024-05-05",
      time: "10:00 AM - 4:00 PM",
      experience: "Intermediate",
      description: "Explore the latest advancements in AI and machine learning with industry leaders.",
      requirements: ["Basic ML knowledge", "Registration required"],
      isVirtual: true,
      status: "waiting",
      registrationStatus: "pending",
      attendees: 320,
      views: 1420,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      registrationDate: "2024-03-12",
      ticketId: "AML2024-00347"
    }
  ];

  const filteredEvents = myEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.registrationStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getTypeBadge = (type) => {
    const typeConfig = {
      'conference': { color: 'badge-primary', text: 'Conference' },
      'workshop': { color: 'badge-secondary', text: 'Workshop' },
      'networking': { color: 'badge-accent', text: 'Networking' },
      'seminar': { color: 'badge-info', text: 'Seminar' }
    };
    const config = typeConfig[type] || typeConfig['conference'];
    return <span className={`badge ${config.color}`}>{config.text}</span>;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'confirmed': { color: 'badge-success', text: 'Confirmed', icon: <CheckCircle className="w-3 h-3" /> },
      'pending': { color: 'badge-warning', text: 'Pending', icon: <Clock className="w-3 h-3" /> },
      'cancelled': { color: 'badge-error', text: 'Cancelled', icon: <XCircle className="w-3 h-3" /> }
    };
    const config = statusConfig[status] || statusConfig['pending'];
    return <span className={`badge gap-1 ${config.color}`}>{config.icon}{config.text}</span>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const stats = {
    totalEvents: myEvents.length,
    confirmedEvents: myEvents.filter(event => event.registrationStatus === 'confirmed').length,
    pendingEvents: myEvents.filter(event => event.registrationStatus === 'pending').length,
    upcomingEvents: myEvents.filter(event => new Date(event.date) > new Date()).length
  };

  const downloadTicket = (eventId) => {
    console.log(`Downloading ticket for event ${eventId}`);
    // API call to download ticket
  };

  const viewEventDetails = (eventId) => {
    console.log(`Viewing details for event ${eventId}`);
    // Navigate to event details page
  };


  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Registered Events</h1>
            <p className="text-gray-400 mt-2">Events you've registered for</p>
          </div>
          <Link
            to="/events"
            className="btn bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white hover:from-blue-600 hover:to-emerald-500 mt-4 md:mt-0"
          >
            Browse Events
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: stats.totalEvents, label: 'Total Registrations', color: 'text-white', icon: <Ticket className="w-6 h-6" /> },
            { value: stats.confirmedEvents, label: 'Confirmed', color: 'text-emerald-400', icon: <CheckCircle className="w-6 h-6" /> },
            { value: stats.pendingEvents, label: 'Pending', color: 'text-amber-400', icon: <Clock className="w-6 h-6" /> },
            { value: stats.upcomingEvents, label: 'Upcoming', color: 'text-blue-400', icon: <CalendarDays className="w-6 h-6" /> }
          ].map((stat, index) => (
            <div key={index} className="card bg-[#1E293B] border border-[#334155] shadow-lg">
              <div className="card-body p-4 flex flex-row items-center">
                <div className={`rounded-lg p-3 bg-slate-700/50 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="ml-4">
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
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
              placeholder="Search your events..."
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
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Events List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="card bg-[#1E293B] border border-[#334155] hover:border-blue-400 transition-all duration-300 overflow-hidden">
              <div className="card-body p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Event Image */}
                  <figure className="w-full lg:w-1/3 h-48 overflow-hidden rounded-lg">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </figure>

                  {/* Event Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="card-title text-white text-xl">{event.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Building className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">{event.organizer}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(event.registrationStatus)}
                        {getTypeBadge(event.type)}
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-gray-400">
                        <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                        <span>{event.location}</span>
                        {event.isVirtual && <span className="badge badge-sm badge-info ml-2">Virtual</span>}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <DollarSign className="w-5 h-5 mr-2 text-emerald-400" />
                        <span>{event.price}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Calendar className="w-5 h-5 mr-2 text-purple-400" />
                        <span>{formatDate(event.date)} • {event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Clock className="w-5 h-5 mr-2 text-amber-400" />
                        <span>Registered on {formatDate(event.registrationDate)}</span>
                      </div>
                    </div>

                    {/* Ticket ID */}
                    <div className="mb-4 p-3 bg-slate-800/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Ticket className="w-5 h-5 text-blue-400 mr-2" />
                          <span className="text-gray-300">Ticket ID: {event.ticketId}</span>
                        </div>
                        {event.registrationStatus === 'confirmed' && (
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

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        className="btn btn-outline btn-sm btn-primary"
                        onClick={() => viewEventDetails(event.id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              {searchTerm || statusFilter !== 'all'
                ? 'No matching events found'
                : "You haven't registered for any events yet"
              }
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Browse events and register to see them here'
              }
            </p>
            {(searchTerm === '' && statusFilter === 'all') && (
              <Link
                to="/events"
                className="btn bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white"
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

export default Event;