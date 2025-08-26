import React from "react";
import { Link } from "react-router";
import {
  Users,
  Briefcase,
  Calendar,
  GraduationCap,
  FileText,
  MessageSquare,
  ArrowUpRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye,
} from "lucide-react";
import { use } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import useUserType from "../Hooks/useUserType";

const DashboardHome = () => {
  // Mock data for dashboard
  const stats = [
    {
      title: "Active Projects",
      value: "8",
      icon: Briefcase,
      change: "+2",
      trend: "up",
      color: "text-emerald-400",
    },
    {
      title: "Upcoming Events",
      value: "3",
      icon: Calendar,
      change: "-1",
      trend: "down",
      color: "text-amber-400",
    },
    {
      title: "Mentorship Requests",
      value: "5",
      icon: GraduationCap,
      change: "+3",
      trend: "up",
      color: "text-purple-400",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "project",
      title: "New collaboration request",
      description: "John Doe requested to join your AI Chatbot project",
      time: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      type: "message",
      title: "New message",
      description: "Sarah Ahmed sent you a message about career advice",
      time: "5 hours ago",
      status: "unread",
    },
    {
      id: 3,
      type: "connection",
      title: "New connection",
      description: "You connected with Mohammad Khan",
      time: "1 day ago",
      status: "read",
    },
    {
      id: 4,
      type: "event",
      title: "Event reminder",
      description: "Tech Career Workshop starts tomorrow at 3 PM",
      time: "2 days ago",
      status: "read",
    },
  ];

  const quickActions = [
    {
      title: "Create Project",
      description: "Start a new collaboration project",
      icon: Plus,
      link: "/dashboard/projects/create",
      color: "bg-blue-500",
    },
    {
      title: "Post Job",
      description: "Share job opportunities",
      icon: Briefcase,
      link: "/dashboard/jobs/create",
      color: "bg-emerald-500",
    },
    {
      title: "Create Event",
      description: "Organize an event",
      icon: Calendar,
      link: "/dashboard/events/create",
      color: "bg-amber-500",
    },
    {
      title: "Offer Mentorship",
      description: "Help students grow",
      icon: GraduationCap,
      link: "/dashboard/mentorship/create",
      color: "bg-purple-500",
    },
  ];

  const { user } = use(AuthContext);
  const { userType } = useUserType();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {user.displayName}
          </h1>
          <p className="text-gray-400 mt-2">
            Here's what's happening with your GradLink account today.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            to="/dashboard/profile"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-emerald-400 text-white rounded-lg hover:from-blue-600 hover:to-emerald-500 transition-all duration-300"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Profile
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="card bg-[#1E293B] border border-[#334155] hover:border-blue-400 transition-colors"
            >
              <div className="card-body p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-white mt-1">
                      {stat.value}
                    </h3>
                    <p
                      className={`text-sm mt-1 ${
                        stat.trend === "up"
                          ? "text-emerald-400"
                          : "text-amber-400"
                      }`}
                    >
                      {stat.change} from last week
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-full ${stat.color.replace(
                      "text",
                      "bg"
                    )} bg-opacity-20`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="card bg-[#1E293B] border border-[#334155]">
            <div className="card-header px-6 pt-4 flex items-center justify-between">
              <h2 className="card-title text-white">Recent Activities</h2>
              <Link
                to="/dashboard/activities"
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                View all
              </Link>
            </div>
            <div className="card-body p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-[#334155] transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white">
                        {activity.title}
                      </h4>
                      <p className="text-gray-400 text-sm mt-1">
                        {activity.description}
                      </p>
                      <p className="text-gray-500 text-xs mt-2">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {userType != "student" && (
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card bg-[#1E293B] border border-[#334155]">
              <div className="card-header">
                <h2 className="card-title text-white">Quick Actions</h2>
              </div>
              <div className="card-body p-6">
                <div className="space-y-4">
                  {quickActions.map((action, index) => {
                    const IconComponent = action.icon;
                    return (
                      <Link
                        key={index}
                        to={action.link}
                        className="flex items-center space-x-4 p-4 rounded-lg hover:bg-[#334155] transition-colors group"
                      >
                        <div
                          className={`p-3 rounded-full ${action.color} bg-opacity-20 group-hover:bg-opacity-30 transition-all`}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-white group-hover:text-blue-300 transition-colors">
                            {action.title}
                          </h4>
                          <p className="text-gray-400 text-sm mt-1">
                            {action.description}
                          </p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-blue-300 transition-colors" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Community Stats */}
            <div className="card bg-[#1E293B] border border-[#334155]">
              <div className="card-header">
                <h2 className="card-title text-white">Community Overview</h2>
              </div>
              <div className="card-body p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Students</span>
                    <span className="text-white font-medium">2,458</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Alumni</span>
                    <span className="text-white font-medium">1,237</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Active Projects</span>
                    <span className="text-white font-medium">156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Upcoming Events</span>
                    <span className="text-white font-medium">12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
