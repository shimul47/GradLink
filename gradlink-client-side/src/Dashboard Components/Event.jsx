import React, { useState, useEffect } from "react";

import {
  Ticket,
  Calendar,
  Building,
  MapPin,
  DollarSign,
  CalendarDays,
} from "lucide-react";
import { use } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const MyCreatedEvents = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
  }, [user]);

  const filteredEvents = Array.isArray(events)
    ? events.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (loading)
    return <p className="text-white text-center mt-10">Loading events...</p>;

  return (
    <div className="min-h-screen max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-white">My Created Events</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered w-full max-w-md text-white bg-[#1E293B]"
      />

      {/* Event List */}
      <div className="grid grid-cols-1 gap-6 mt-6">
        {filteredEvents.length === 0 && (
          <p className="text-gray-400">No events created yet.</p>
        )}

        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="card bg-[#1E293B] border border-[#334155] p-4 rounded-md"
          >
            <h2 className="text-xl text-white font-bold">{event.title}</h2>
            <p className="text-gray-400">{event.description}</p>

            <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-300">
              <Building className="w-4 h-4" /> {event.organizer || "N/A"}
              <MapPin className="w-4 h-4" /> {event.location || "N/A"}
              <DollarSign className="w-4 h-4" /> {event.price || "Free"}
              <Calendar className="w-4 h-4" />{" "}
              {new Date(event.date).toLocaleDateString()}
              <CalendarDays className="w-4 h-4" />{" "}
              {new Date(event.created_at).toLocaleDateString()}
              <Ticket className="w-4 h-4" /> Ticket ID: {event.id}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCreatedEvents;
