import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  ArrowLeft,
  Plus,
  X,
  Calendar,
  Users,
  Tag,
  Clock,
  BookOpen,
  Upload,
  Save
} from 'lucide-react';

const CreateProject = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [technologies, setTechnologies] = useState([]);
  const [newTech, setNewTech] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    status: 'planning',
    startDate: '',
    endDate: '',
    maxMembers: '',
    requirements: '',
    learningOutcomes: '',
    resources: '',
    image: null
  });

  const categories = [
    'Software Development',
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'Research',
    'Design',
    'Business',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTechnology = () => {
    if (newTech.trim() && !technologies.includes(newTech.trim())) {
      setTechnologies(prev => [...prev, newTech.trim()]);
      setNewTech('');
    }
  };

  const handleRemoveTechnology = (techToRemove) => {
    setTechnologies(prev => prev.filter(tech => tech !== techToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare project data
      const projectData = {
        ...formData,
        technologies,
        createdAt: new Date().toISOString(),
        createdBy: 'current-user-id' // This would come from your auth context
      };

      // Here you would make your API call to create the project
      console.log('Creating project:', projectData);

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        // Show success message and redirect
        alert('Project created successfully!');
        navigate('/dashboard/projects');
      }, 2000);

    } catch (error) {
      console.error('Error creating project:', error);
      setIsSubmitting(false);
      alert('Failed to create project. Please try again.');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard/projects"
            className="btn btn-ghost btn-circle hover:bg-[#334155]"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Create New Project</h1>
            <p className="text-gray-400 mt-1">Start a new project and invite collaborators</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Card */}
        <div className="card bg-[#1E293B] border border-[#334155]">
          <div className="card-body">
            <h2 className="card-title text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Project Title *</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="input input-bordered bg-[#0F172A] border-[#334155] text-white"
                  placeholder="Enter project title"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Category *</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="select select-bordered bg-[#0F172A] border-[#334155] text-white"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text text-white">Description *</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered bg-[#0F172A] border-[#334155] text-white h-32"
                  placeholder="Describe your project goals, objectives, and what you hope to achieve..."
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Card */}
        <div className="card bg-[#1E293B] border border-[#334155]">
          <div className="card-body">
            <h2 className="card-title text-white flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Timeline
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Start Date</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="input input-bordered bg-[#0F172A] border-[#334155] text-white"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Expected End Date</span>
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="input input-bordered bg-[#0F172A] border-[#334155] text-white"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Status</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="select select-bordered bg-[#0F172A] border-[#334155] text-white"
                >
                  <option value="planning">Planning</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Maximum Team Size
                  </span>
                </label>
                <input
                  type="number"
                  name="maxMembers"
                  value={formData.maxMembers}
                  onChange={handleInputChange}
                  className="input input-bordered bg-[#0F172A] border-[#334155] text-white"
                  placeholder="e.g., 5"
                  min="1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Technologies Card */}
        <div className="card bg-[#1E293B] border border-[#334155]">
          <div className="card-body">
            <h2 className="card-title text-white flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Technologies & Skills
            </h2>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Required Technologies</span>
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  className="input input-bordered bg-[#0F172A] border-[#334155] text-white flex-1"
                  placeholder="Add technology (e.g., React, Python)"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTechnology())}
                />
                <button
                  type="button"
                  onClick={handleAddTechnology}
                  className="btn btn-primary bg-gradient-to-r from-blue-500 to-emerald-400 border-none"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>

              {technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <span key={index} className="badge badge-primary badge-lg gap-1">
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTechnology(tech)}
                        className="hover:text-error"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Information Card */}
        <div className="card bg-[#1E293B] border border-[#334155]">
          <div className="card-body">
            <h2 className="card-title text-white flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Additional Information
            </h2>

            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Requirements & Prerequisites</span>
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered bg-[#0F172A] border-[#334155] text-white h-24"
                  placeholder="What skills or knowledge should collaborators have?"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Learning Outcomes</span>
                </label>
                <textarea
                  name="learningOutcomes"
                  value={formData.learningOutcomes}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered bg-[#0F172A] border-[#334155] text-white h-24"
                  placeholder="What will participants learn from this project?"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Resources & Materials</span>
                </label>
                <textarea
                  name="resources"
                  value={formData.resources}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered bg-[#0F172A] border-[#334155] text-white h-24"
                  placeholder="What resources will be provided? (docs, datasets, tools, etc.)"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 justify-end">
          <Link
            to="/dashboard/projects"
            className="btn btn-ghost border border-[#334155] text-gray-400 hover:text-white"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="btn btn-primary bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white hover:from-blue-600 hover:to-emerald-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner"></span>
                Creating Project...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Create Project
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;