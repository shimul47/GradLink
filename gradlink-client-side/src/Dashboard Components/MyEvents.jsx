import React, { useState } from 'react';
import { Link } from 'react-router';
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Eye,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Building,
  DollarSign,
  Edit,
  Trash2,
  BarChart3,
  MoreVertical
} from 'lucide-react';

const MyEvents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Sample event data - only events posted by the current user
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
      status: "published",
      registrationStatus: "open",
      attendees: 240,
      views: 1156,
      capacity: 300,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      createdDate: "2024-03-10",
      registrations: 187
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
      status: "published",
      registrationStatus: "open",
      attendees: 180,
      views: 789,
      capacity: 200,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      createdDate: "2024-03-05",
      registrations: 142
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
      status: "draft",
      registrationStatus: "closed",
      attendees: 320,
      views: 1420,
      capacity: 500,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      createdDate: "2024-03-12",
      registrations: 0
    },
    {
      id: 4,
      title: "Startup Networking Night",
      organizer: "Entrepreneurs Hub",
      location: "Chittagong, Bangladesh",
      type: "networking",
      price: "৳1,000",
      date: "2024-03-18",
      time: "6:00 PM - 9:00 PM",
      experience: "All levels",
      description: "Connect with fellow entrepreneurs and investors in a relaxed setting.",
      requirements: ["Business cards", "Startup pitch optional"],
      isVirtual: false,
      status: "published",
      registrationStatus: "closed",
      attendees: 115,
      views: 497,
      capacity: 150,
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80",
      createdDate: "2024-02-20",
      registrations: 115
    }
  ];

  const filteredEvents = myEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || event.type === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
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
      'published': { color: 'badge-success', text: 'Published', icon: <CheckCircle className="w-3 h-3" /> },
      'draft': { color: 'badge-warning', text: 'Draft', icon: <Clock className="w-3 h-3" /> },
      'cancelled': { color: 'badge-error', text: 'Cancelled', icon: <XCircle className="w-3 h-3" /> }
    };
    const config = statusConfig[status] || statusConfig['draft'];
    return <span className={`badge gap-1 ${config.color}`}>{config.icon}{config.text}</span>;
  };

  const getRegistrationBadge = (status) => {
    const statusConfig = {
      'open': { color: 'badge-success', text: 'Registration Open' },
      'closed': { color: 'badge-error', text: 'Registration Closed' }
    };
    const config = statusConfig[status] || statusConfig['closed'];
    return <span className={`badge ${config.color}`}>{config.text}</span>;
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
    publishedEvents: myEvents.filter(event => event.status === 'published').length,
    draftEvents: myEvents.filter(event => event.status === 'draft').length,
    totalRegistrations: myEvents.reduce((sum, event) => sum + event.registrations, 0),
    totalViews: myEvents.reduce((sum, event) => sum + event.views, 0),
    totalCapacity: myEvents.reduce((sum, event) => sum + event.capacity, 0)
  };

  const handleEditEvent = (eventId) => {
    console.log(`Editing event ${eventId}`);
    // Navigate to edit page
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      console.log(`Deleting event ${eventId}`);
      // API call to delete event
    }
  };

  const handleViewAnalytics = (eventId) => {
    console.log(`Viewing analytics for event ${eventId}`);
    // Navigate to analytics page
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">My Events</h1>
            <p className="text-gray-400 mt-2">Manage your created events</p>
          </div>
          <Link
            to="/dashboard/events/create"
            className="btn bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white hover:from-blue-600 hover:to-emerald-500 mt-4 md:mt-0"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Event
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: stats.totalEvents, label: 'Total Events', color: 'text-white', icon: <Calendar className="w-5 h-5" /> },
            { value: stats.publishedEvents, label: 'Published', color: 'text-emerald-400', icon: <CheckCircle className="w-5 h-5" /> },
            { value: stats.draftEvents, label: 'Drafts', color: 'text-amber-400', icon: <Clock className="w-5 h-5" /> },
            { value: stats.totalRegistrations, label: 'Registrations', color: 'text-blue-400', icon: <Users className="w-5 h-5" /> },

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
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            className="select select-bordered bg-[#1E293B] border-[#334155] text-white"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="conference">Conference</option>
            <option value="workshop">Workshop</option>
            <option value="networking">Networking</option>
            <option value="seminar">Seminar</option>
          </select>
        </div>

        {/* Events List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="card bg-[#1E293B] border border-[#334155] hover:border-blue-400 transition-all duration-300 overflow-hidden">
              <div className="card-body p-0">
                {/* Event Image */}
                <figure className="h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    {getStatusBadge(event.status)}
                    {getRegistrationBadge(event.registrationStatus)}
                  </div>
                </figure>

                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="card-title text-white text-lg">{event.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Building className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{event.organizer}</span>
                      </div>
                    </div>
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-sm">
                        <MoreVertical className="w-4 h-4" />
                      </div>
                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-[#1E293B] rounded-box w-52 border border-[#334155]">
                        <li><a onClick={() => handleEditEvent(event.id)}><Edit className="w-4 h-4" /> Edit Event</a></li>
                        <li><a onClick={() => handleViewAnalytics(event.id)}><BarChart3 className="w-4 h-4" /> View Analytics</a></li>
                        <li><a onClick={() => handleDeleteEvent(event.id)} className="text-error"><Trash2 className="w-4 h-4" /> Delete Event</a></li>
                      </ul>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-400">
                      <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                      <span>{event.location}</span>
                      {event.isVirtual && <span className="badge badge-sm badge-info ml-2">Virtual</span>}
                    </div>
                    <div className="flex items-center text-gray-400">
                      <DollarSign className="w-4 h-4 mr-2 text-emerald-400" />
                      <span>{event.price}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                      <span>{formatDate(event.date)} • {event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Clock className="w-4 h-4 mr-2 text-amber-400" />
                      <span>Created on {formatDate(event.createdDate)}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {event.registrations} / {event.capacity}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {event.views} views
                      </div>
                    </div>
                    {getTypeBadge(event.type)}
                  </div>

                  {/* Progress bar for registrations */}
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-emerald-400 h-2 rounded-full"
                      style={{ width: `${(event.registrations / event.capacity) * 100}%` }}
                    ></div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-400">
                      {event.registrations} registered ({Math.round((event.registrations / event.capacity) * 100)}%)
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="btn btn-outline btn-sm btn-primary"
                        onClick={() => handleEditEvent(event.id)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        className="btn btn-outline btn-sm btn-secondary"
                        onClick={() => handleViewAnalytics(event.id)}
                      >
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Stats
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
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
                ? 'No matching events found'
                : "You haven't created any events yet"
              }
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by creating your first event'
              }
            </p>
            {(searchTerm === '' && statusFilter === 'all' && categoryFilter === 'all') && (
              <Link
                to="/dashboard/events/create"
                className="btn bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Event
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;