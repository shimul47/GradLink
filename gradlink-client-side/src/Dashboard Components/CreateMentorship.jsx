import React, { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  MapPin,
  DollarSign,
  Users,
  X,
  Type,
  FileText,
} from "lucide-react";

const CreateMentorship = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    specialties: [""],
    experience: "",
    availability: "",
    location: "",
    isRemote: false,
    sessionFormat: "",
    sessionLength: "",
    price: "",
    maxMentees: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecialtyChange = (index, value) => {
    const newSpecialties = [...formData.specialties];
    newSpecialties[index] = value;
    setFormData((prev) => ({ ...prev, specialties: newSpecialties }));
  };

  const addSpecialty = () => {
    setFormData((prev) => ({
      ...prev,
      specialties: [...prev.specialties, ""],
    }));
  };

  const removeSpecialty = (index) => {
    const newSpecialties = formData.specialties.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, specialties: newSpecialties }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Mentorship created:", formData);
      setIsSubmitting(false);
      alert("Mentorship offering created successfully!");
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        specialties: [""],
        experience: "",
        availability: "",
        location: "",
        isRemote: false,
        sessionFormat: "",
        sessionLength: "",
        price: "",
        maxMentees: "",
      });
    }, 1500);
  };

  const categories = [
    "Career Guidance",
    "Technical Skills",
    "Portfolio Review",
    "Interview Preparation",
    "Resume Review",
    "Project Guidance",
    "Leadership Coaching",
    "Industry Insights",
  ];

  const experienceLevels = [
    "1-2 years",
    "3-5 years",
    "5-7 years",
    "7-10 years",
    "10+ years",
  ];

  const sessionFormats = [
    "One-on-one video calls",
    "Group sessions",
    "Text-based communication",
    "Code/project reviews",
    "Mixed format",
  ];

  return (
    <div className="min-h-screen ">
      <div className="max-w-screen-xl px-5 lg:px-5 mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link
            to="/dashboard/mentorship"
            className="btn btn-ghost btn-circle mr-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Offer Mentorship</h1>
            <p className="text-gray-400">
              Create a mentorship offering to help students
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Card */}
          <div className="card bg-[#1E293B] border border-[#334155] shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-white text-xl mb-4">
                <Type className="w-5 h-5 text-blue-400 mr-2" />
                Basic Information
              </h2>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-300">
                    Mentorship Title
                  </span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Web Development Career Guidance"
                  className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text text-gray-300">Description</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe what you'll help mentees with, your approach, and what they can expect..."
                  rows={4}
                  className="textarea textarea-bordered bg-[#1E293B] border-[#334155] text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">Category</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="select select-bordered bg-[#1E293B] border-[#334155] text-white"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">
                      Your Experience Level
                    </span>
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="select select-bordered bg-[#1E293B] border-[#334155] text-white"
                  >
                    <option value="">Select experience level</option>
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Specialties Card */}
          <div className="card bg-[#1E293B] border border-[#334155] shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-white text-xl mb-4">
                <BookOpen className="w-5 h-5 text-purple-400 mr-2" />
                Areas of Expertise
              </h2>

              <p className="text-gray-400 text-sm mb-4">
                List your specialties and skills
              </p>

              {formData.specialties.map((specialty, index) => (
                <div key={index} className="form-control mt-2">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={specialty}
                      onChange={(e) =>
                        handleSpecialtyChange(index, e.target.value)
                      }
                      placeholder={`Specialty ${index + 1}`}
                      className="input input-bordered bg-[#1E293B] border-[#334155] text-white flex-1 mr-2"
                    />
                    {formData.specialties.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSpecialty(index)}
                        className="btn btn-ghost btn-circle btn-sm"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addSpecialty}
                className="btn btn-outline btn-sm mt-4"
              >
                + Add Specialty
              </button>
            </div>
          </div>

          {/* Availability Card */}
          <div className="card bg-[#1E293B] border border-[#334155] shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-white text-xl mb-4">
                <Clock className="w-5 h-5 text-amber-400 mr-2" />
                Availability
              </h2>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-300">
                    Your Availability
                  </span>
                </label>
                <input
                  type="text"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  placeholder="e.g., Weekends, Weekdays after 6PM, Flexible"
                  className="input input-bordered bg-[#1E293B] border-[#334155] text-white"
                />
              </div>

              <div className="form-control mt-4">
                <label className="cursor-pointer label justify-start">
                  <input
                    type="checkbox"
                    name="isRemote"
                    checked={formData.isRemote}
                    onChange={handleInputChange}
                    className="checkbox checkbox-primary mr-3"
                  />
                  <span className="label-text text-gray-300">
                    This is remote mentorship
                  </span>
                </label>
              </div>

              {!formData.isRemote && (
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text text-gray-300">Location</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, State"
                      className="input input-bordered bg-[#1E293B] border-[#334155] text-white pl-10 w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Session Details Card */}
          <div className="card bg-[#1E293B] border border-[#334155] shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-white text-xl mb-4">
                <Users className="w-5 h-5 text-emerald-400 mr-2" />
                Session Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">
                      Session Format
                    </span>
                  </label>
                  <select
                    name="sessionFormat"
                    value={formData.sessionFormat}
                    onChange={handleInputChange}
                    className="select select-bordered bg-[#1E293B] border-[#334155] text-white"
                  >
                    <option value="">Select format</option>
                    {sessionFormats.map((format) => (
                      <option key={format} value={format}>
                        {format}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">
                      Session Length
                    </span>
                  </label>
                  <select
                    name="sessionLength"
                    value={formData.sessionLength}
                    onChange={handleInputChange}
                    className="select select-bordered bg-[#1E293B] border-[#334155] text-white"
                  >
                    <option value="">Select length</option>
                    <option value="30 minutes">30 minutes</option>
                    <option value="1 hour">1 hour</option>
                    <option value="1.5 hours">1.5 hours</option>
                    <option value="2 hours">2 hours</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">
                      Price (optional)
                    </span>
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
                    <span className="label-text text-gray-300">
                      Max Mentees (optional)
                    </span>
                  </label>
                  <div className="relative">
                    <Users className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="number"
                      name="maxMentees"
                      value={formData.maxMentees}
                      onChange={handleInputChange}
                      placeholder="Maximum number of mentees"
                      min="1"
                      className="input input-bordered bg-[#1E293B] border-[#334155] text-white pl-10 w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4">
            <Link to="/dashboard/mentorship" className="btn btn-ghost">
              Cancel
            </Link>
            <button
              type="submit"
              className="btn bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Creating Mentorship...
                </>
              ) : (
                "Create Mentorship Offering"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMentorship;
