import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
import {
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Globe,
  Type,
  FileText,
  X,
} from "lucide-react";
import { getAuth } from "firebase/auth";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    isVirtual: false,
    virtualLink: "",
    date: "",
    time: "",
    endTime: "",
    price: "",
    category: "",
    capacity: "",
    requirements: [""],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAlumni, setIsAlumni] = useState(false);
  const [loadingAlumni, setLoadingAlumni] = useState(true);
  const [userId, setUserId] = useState(null);

  // Get userId (Firebase UID)
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
    }
  }, []);

  // Check if user is alumni
  useEffect(() => {
    if (!userId) return;

    const checkAlumni = async () => {
      try {
        // fetch single alumni by userId (uid from Firebase)
        const response = await axios.get(
          `http://localhost:8080/alumnilist/${userId}`
        );
        const alumni = response.data;
        console.log("Fetched alumni:", alumni);

        if (
          alumni &&
          alumni.userType &&
          alumni.userType.toLowerCase() === "alumni"
        ) {
          setIsAlumni(true);
        } else {
          setIsAlumni(false);
        }
      } catch (error) {
        console.error("Error checking alumni:", error);
        setIsAlumni(false);
      } finally {
        setLoadingAlumni(false);
      }
    };

    checkAlumni();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData((prev) => ({ ...prev, requirements: newRequirements }));
  };

  const addRequirement = () => {
    setFormData((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ""],
    }));
  };

  const removeRequirement = (index) => {
    const newRequirements = formData.requirements.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, requirements: newRequirements }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Event title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.location.trim() && !formData.isVirtual)
      newErrors.location = "Location is required for in-person events";
    if (formData.isVirtual && !formData.virtualLink.trim())
      newErrors.virtualLink = "Virtual event link is required";
    if (!formData.date) newErrors.date = "Event date is required";
    if (!formData.time) newErrors.time = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    if (!formData.category) newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAlumni) {
      alert("Only alumni can create events.");
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        isVirtual: formData.isVirtual,
        virtualLink: formData.virtualLink,
        date: formData.date,
        time: formData.time,
        endTime: formData.endTime,
        price: formData.price || 0,
        capacity: formData.capacity || null,
        creatorId: userId, // Firebase UID
        responderId: null,
      };

      const response = await axios.post(
        "http://localhost:8080/api/events",
        payload
      );

      if (response.status === 201) {
        alert("Event created successfully!");
        setFormData({
          title: "",
          description: "",
          location: "",
          isVirtual: false,
          virtualLink: "",
          date: "",
          time: "",
          endTime: "",
          price: "",
          category: "",
          capacity: "",
          requirements: [""],
        });
      } else {
        alert(response.data.message || "Error creating event.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Check console.");
    }

    setIsSubmitting(false);
  };

  if (loadingAlumni) return <p>Loading...</p>;
  if (!isAlumni)
    return (
      <p className="text-red-500 text-center mt-10">
        You must be an alumni to create events.
      </p>
    );

  const categories = [
    "Conference",
    "Workshop",
    "Networking",
    "Seminar",
    "Webinar",
    "Meetup",
    "Concert",
    "Exhibition",
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="card bg-[#1E293B] border border-[#334155] shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-white text-xl mb-4">
                <Type className="w-5 h-5 text-blue-400 mr-2" /> Basic
                Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">
                      Event Title *
                    </span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter event title"
                    className={`input input-bordered bg-[#1E293B] border-[#334155] text-white ${errors.title ? "input-error" : ""
                      }`}
                  />
                  {errors.title && (
                    <span className="text-error text-sm mt-1">
                      {errors.title}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">Category *</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`select select-bordered bg-[#1E293B] border-[#334155] text-white ${errors.category ? "select-error" : ""
                      }`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <span className="text-error text-sm mt-1">
                      {errors.category}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text text-gray-300">
                    Description *
                  </span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your event"
                  rows={4}
                  className={`textarea textarea-bordered bg-[#1E293B] border-[#334155] text-white ${errors.description ? "textarea-error" : ""
                    }`}
                />
                {errors.description && (
                  <span className="text-error text-sm mt-1">
                    {errors.description}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="card bg-[#1E293B] border border-[#334155] shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-white text-xl mb-4">
                <Calendar className="w-5 h-5 text-purple-400 mr-2" /> Date &
                Time
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">Date *</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={`input input-bordered bg-[#1E293B] border-[#334155] text-white ${errors.date ? "input-error" : ""
                      }`}
                  />
                  {errors.date && (
                    <span className="text-error text-sm mt-1">
                      {errors.date}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">
                      Start Time *
                    </span>
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className={`input input-bordered bg-[#1E293B] border-[#334155] text-white ${errors.time ? "input-error" : ""
                      }`}
                  />
                  {errors.time && (
                    <span className="text-error text-sm mt-1">
                      {errors.time}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">End Time *</span>
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className={`input input-bordered bg-[#1E293B] border-[#334155] text-white ${errors.endTime ? "input-error" : ""
                      }`}
                  />
                  {errors.endTime && (
                    <span className="text-error text-sm mt-1">
                      {errors.endTime}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="card bg-[#1E293B] border border-[#334155] shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-white text-xl mb-4">
                <MapPin className="w-5 h-5 text-blue-400 mr-2" /> Location
              </h2>
              <div className="form-control">
                <label className="cursor-pointer label justify-start">
                  <input
                    type="checkbox"
                    name="isVirtual"
                    checked={formData.isVirtual}
                    onChange={handleInputChange}
                    className="checkbox checkbox-primary mr-3"
                  />
                  <span className="label-text text-gray-300">
                    This is a virtual event
                  </span>
                </label>
              </div>

              {formData.isVirtual ? (
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text text-gray-300">
                      Virtual Event Link *
                    </span>
                  </label>
                  <div className="relative">
                    <Globe className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="url"
                      name="virtualLink"
                      value={formData.virtualLink}
                      onChange={handleInputChange}
                      placeholder="https://meet.example.com/event"
                      className={`input input-bordered bg-[#1E293B] border-[#334155] text-white pl-10 w-full ${errors.virtualLink ? "input-error" : ""
                        }`}
                    />
                  </div>
                  {errors.virtualLink && (
                    <span className="text-error text-sm mt-1">
                      {errors.virtualLink}
                    </span>
                  )}
                </div>
              ) : (
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text text-gray-300">Location *</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter event address"
                      className={`input input-bordered bg-[#1E293B] border-[#334155] text-white pl-10 w-full ${errors.location ? "input-error" : ""
                        }`}
                    />
                  </div>
                  {errors.location && (
                    <span className="text-error text-sm mt-1">
                      {errors.location}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Pricing & Capacity */}
          <div className="card bg-[#1E293B] border border-[#334155] shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-white text-xl mb-4">
                <DollarSign className="w-5 h-5 text-emerald-400 mr-2" /> Pricing
                & Capacity
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">Price</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00 (Free if empty)"
                      min="0"
                      step="0.01"
                      className="input input-bordered bg-[#1E293B] border-[#334155] text-white pl-10 w-full"
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">Capacity</span>
                  </label>
                  <div className="relative">
                    <Users className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      placeholder="Maximum attendees (optional)"
                      min="1"
                      className="input input-bordered bg-[#1E293B] border-[#334155] text-white pl-10 w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="card bg-[#1E293B] border border-[#334155] shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-white text-xl mb-4">
                <FileText className="w-5 h-5 text-amber-400 mr-2" />{" "}
                Requirements
              </h2>

              {formData.requirements.map((req, index) => (
                <div
                  key={index}
                  className="form-control mt-2 flex items-center"
                >
                  <input
                    type="text"
                    value={req}
                    onChange={(e) =>
                      handleRequirementChange(index, e.target.value)
                    }
                    placeholder={`Requirement ${index + 1}`}
                    className="input input-bordered bg-[#1E293B] border-[#334155] text-white flex-1 mr-2"
                  />
                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="btn btn-ghost btn-circle btn-sm"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addRequirement}
                className="btn btn-outline btn-sm mt-4"
              >
                + Add Requirement
              </button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4">
            <Link to="/dashboard/events" className="btn btn-ghost">
              Cancel
            </Link>
            <button
              type="submit"
              className="btn bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Create Event"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
