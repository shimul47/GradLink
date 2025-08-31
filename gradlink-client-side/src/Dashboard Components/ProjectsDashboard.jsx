import React, { useState } from 'react';
import { Link } from 'react-router';
import {
  Plus,
  Search,
  Filter,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  TrendingUp
} from 'lucide-react';

const ProjectsDashboard = () => {
  const [activeTab, setActiveTab] = useState('my-projects');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sample projects data
  const projects = [
    {
      id: 1,
      title: 'AI-Powered Learning Platform',
      description: 'Developing an intelligent tutoring system using machine learning algorithms',
      status: 'active',
      progress: 75,
      members: 8,
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      technologies: ['React', 'Node.js', 'Python', 'MongoDB'],
      category: 'Software Development'
    },
    {
      id: 2,
      title: 'Renewable Energy Research',
      description: 'Research on solar energy efficiency improvements',
      status: 'completed',
      progress: 100,
      members: 5,
      startDate: '2023-09-10',
      endDate: '2024-02-28',
      technologies: ['MATLAB', 'Python', 'Data Analysis'],
      category: 'Research'
    },
    {
      id: 3,
      title: 'Community Health App',
      description: 'Mobile application for community health monitoring',
      status: 'planning',
      progress: 25,
      members: 3,
      startDate: '2024-03-01',
      endDate: '2024-12-15',
      technologies: ['Flutter', 'Firebase', 'Dart'],
      category: 'Mobile Development'
    },
    {
      id: 4,
      title: 'E-commerce Website Redesign',
      description: 'Modernizing the university bookstore website',
      status: 'active',
      progress: 60,
      members: 6,
      startDate: '2024-02-01',
      endDate: '2024-05-31',
      technologies: ['Vue.js', 'Express', 'PostgreSQL'],
      category: 'Web Development'
    }
  ];

  const stats = {
    totalProjects: 12,
    activeProjects: 8,
    completedProjects: 4,
    totalCollaborators: 47
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-emerald-500', text: 'Active', icon: CheckCircle },
      completed: { color: 'bg-blue-500', text: 'Completed', icon: CheckCircle },
      planning: { color: 'bg-amber-500', text: 'Planning', icon: Clock }
    };
    const config = statusConfig[status] || statusConfig.planning;
    const IconComponent = config.icon;

    return (
      <span className={`badge ${config.color} text-white gap-1`}>
        <IconComponent className="w-3 h-3" />
        {config.text}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects Dashboard</h1>
          <p className="text-gray-400 mt-2">Manage your projects and track progress</p>
        </div>
        <Link
          to="/dashboard/projects/create"
          className="btn btn-primary bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white hover:from-blue-600 hover:to-emerald-500 mt-4 md:mt-0"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Project
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card bg-[#1E293B] border border-[#334155]">
          <div className="card-body p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.totalProjects}</div>
            <p className="text-gray-400 text-sm">Total Projects</p>
          </div>
        </div>
        <div className="card bg-[#1E293B] border border-[#334155]">
          <div className="card-body p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{stats.activeProjects}</div>
            <p className="text-gray-400 text-sm">Active</p>
          </div>
        </div>
        <div className="card bg-[#1E293B] border border-[#334155]">
          <div className="card-body p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{stats.completedProjects}</div>
            <p className="text-gray-400 text-sm">Completed</p>
          </div>
        </div>
        <div className="card bg-[#1E293B] border border-[#334155]">
          <div className="card-body p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.totalCollaborators}</div>
            <p className="text-gray-400 text-sm">Collaborators</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-5  p-3 bg-[#1E293B] ">
        <div
          className={`cursor-pointer ${activeTab === 'my-projects' ? 'font-semibold text-blue-500 border-b border-blue-500' : 'text-white '}`}
          onClick={() => setActiveTab('my-projects')}
        >
          My Projects
        </div>
        <div
          className={`cursor-pointer ${activeTab === 'analytics' ? 'font-semibold text-blue-500 border-b border-blue-500' : 'text-white'}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'my-projects' && (
        <div className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
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
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="planning">Planning</option>
            </select>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="card bg-[#1E293B] border border-[#334155] hover:border-blue-400 transition-colors">
                <div className="card-body">
                  <div className=" mb-3">
                    <h3 className="card-title text-white text-lg">{project.title}</h3>
                    <div className='mt-2'>{getStatusBadge(project.status)}</div>
                  </div>

                  <p className="text-gray-400 text-sm mb-3">{project.description}</p>

                  <div className="space-y-3">
                    {/* Project Details */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center text-gray-400">
                        <Users className="w-4 h-4 mr-1" />
                        {project.members} members
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(project.endDate).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span key={index} className="badge badge-outline badge-sm">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="badge badge-outline badge-sm">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4">
                      <button className="btn btn-sm btn-outline btn-primary flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                      <button className="btn btn-sm btn-outline btn-secondary">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="btn btn-sm btn-outline btn-error">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="card bg-[#1E293B] border border-[#334155]">
          <div className="card-body">
            <h2 className="card-title text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Project Analytics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-6 bg-[#0F172A] rounded-lg text-center">
                <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white">Project Completion Rate</h3>
                <p className="text-3xl font-bold text-emerald-400 mt-2">82%</p>
                <p className="text-gray-400 mt-1">Higher than average</p>
              </div>

              <div className="p-6 bg-[#0F172A] rounded-lg text-center">
                <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white">Team Engagement</h3>
                <p className="text-3xl font-bold text-emerald-400 mt-2">94%</p>
                <p className="text-gray-400 mt-1">Excellent participation</p>
              </div>
            </div>

            {/* Additional Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0F172A] p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-400">4.2</div>
                <p className="text-gray-400 text-sm">Avg. Team Size</p>
              </div>
              <div className="bg-[#0F172A] p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-emerald-400">78%</div>
                <p className="text-gray-400 text-sm">On-Time Completion</p>
              </div>
              <div className="bg-[#0F172A] p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-amber-400">3.8</div>
                <p className="text-gray-400 text-sm">Avg. Tech Stack Size</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsDashboard;