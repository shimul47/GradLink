import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";
import {
  User,
  MoveLeft,
  Plus,
  Users,
  MessageSquare,
  Briefcase,
  Calendar,
  GraduationCap,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import useUserType from "../Hooks/useUserType";
import { use } from "react";
import { AuthContext } from "../Contexts/AuthContext";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const location = useLocation();
  const navigate = useNavigate();
  const { userType } = useUserType();
  // const userType = 'alumni'

  const { user, signOutUser, loading } = use(AuthContext);

  // Update active section based on URL
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("profile")) setActiveSection("profile");
    else if (path.includes("projects")) setActiveSection("projects");
    else if (path.includes("jobs")) setActiveSection("jobs");
    else if (path.includes("events")) setActiveSection("events");
    else if (path.includes("mentorship")) setActiveSection("mentorship");
    else if (path.includes("recommendations"))
      setActiveSection("recommendations");
    else if (path.includes("settings")) setActiveSection("settings");
    else if (path.includes("admin")) setActiveSection("admin");
    else setActiveSection("dashboard");
  }, [location]);

  // Navigation link classes with active state
  const linkClasses = ({ isActive }) =>
    `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
      isActive
        ? "bg-gradient-to-r from-blue-500 to-emerald-400 text-white"
        : "text-gray-400 hover:bg-[#334155] hover:text-white"
    }`;

  const subLinkClasses = ({ isActive }) =>
    `block p-2 text-sm transition-colors ${
      isActive ? "text-blue-400 font-medium" : "text-gray-400 hover:text-white"
    }`;

  // Handle logout
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // useEffect(() => {
  //   if (loading) return;
  //   if (!user) {
  //     navigate("/");
  //   }
  // }, [user, loading, navigate]);

  if (loading) {
    return loading;
  }

  // Navigation items based on user type
  const getNavigationItems = () => {
    const commonItems = [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
      },
      {
        id: "profile",
        label: "Profile",
        icon: User,
        href: "/dashboard/profile",
      },
    ];

    if (userType === "student") {
      return [
        ...commonItems,
        {
          id: "jobs",
          label: "Applied Jobs",
          icon: Briefcase,
          href: "/dashboard/jobs/applied",
        },
        {
          id: "events",
          label: "Registered Events",
          icon: Calendar,
          href: "/dashboard/events/registered",
        },
        {
          id: "recommendations",
          label: "Recommendations",
          icon: FileText,
          href: "/dashboard/recommendations",
        },
      ];
    }

    if (userType === "alumni") {
      return [
        ...commonItems,
        {
          id: "projects",
          label: "Projects",
          icon: Plus,
          href: "/dashboard/projects",
          subItems: [
            { label: "Create Project", href: "/dashboard/projects/create" },
            {
              label: "Collaborations",
              href: "/dashboard/projects/collaborations",
            },
          ],
        },
        {
          id: "jobs",
          label: "Job Posts",
          icon: Briefcase,
          href: "/dashboard/jobs",
          subItems: [
            { label: "Create Job Post", href: "/dashboard/jobs/create" },
            // { label: "My Job Posts", href: "/dashboard/jobs/my-job-posts" },
          ],
        },
        {
          id: "events",
          label: "Events",
          icon: Calendar,
          href: "/dashboard/events",
          subItems: [
            { label: "Create Event", href: "/dashboard/events/create" },
            { label: "My Events", href: "/dashboard/events/my-events" },
          ],
        },
        {
          id: "mentorship",
          label: "Mentorship",
          icon: GraduationCap,
          href: "/dashboard/mentorship",
          subItems: [
            {
              label: "Create Mentorship",
              href: "/dashboard/mentorship/create",
            },
            {
              label: "Mentorship Requests",
              href: "/dashboard/mentorship/requests",
            },
          ],
        },
        {
          id: "recommendations",
          label: "Recommendations",
          icon: FileText,
          href: "/dashboard/recommendations",
        },
      ];
    }

    if (userType === "admin") {
      return [
        ...commonItems,
        {
          id: "admin",
          label: "User Management",
          icon: Users,
          href: "/dashboard/admin/users",
          subItems: [
            {
              label: "University Database",
              href: "/dashboard/admin/university-database",
              icon: Clock,
            },
            {
              label: "Pending Verification",
              href: "/dashboard/admin/pending-verification",
              icon: Clock,
            },
            {
              label: "Verified Users",
              href: "/dashboard/admin/verified-users",
              icon: CheckCircle,
            },
            {
              label: "Alumni List",
              href: "/dashboard/admin/alumni-list",
              icon: User,
            },
            {
              label: "Students List",
              href: "/dashboard/admin/students-list",
              icon: User,
            },
          ],
        },
        {
          id: "reports",
          label: "Reports & Analytics",
          icon: FileText,
          href: "/dashboard/admin/reports",
        },
      ];
    }

    return commonItems;
  };

  const navigationItems = getNavigationItems();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 border-b border-[#334155] bg-[#1E293B]">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-[#334155] transition-colors"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="w-10"></div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
          fixed lg:static top-0 lg:translate-x-0 z-50 w-64 min-h-screen bg-[#1E293B] border-r border-[#334155]
          transform transition-transform duration-200 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:block
        `}
        >
          <div className="p-6 border-b border-[#334155]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-semibold">GradLink</h2>
                <p className="text-sm text-gray-400 capitalize">
                  {userType} Dashboard
                </p>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => (
              <div key={item.id}>
                <NavLink
                  to={item.href}
                  className={linkClasses}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {item.subItems && <ChevronDown className="w-4 h-4 ml-auto" />}
                </NavLink>

                {item.subItems && activeSection === item.id && (
                  <div className="ml-8 mt-2 space-y-2">
                    {item.subItems.map((subItem) => (
                      <NavLink
                        key={subItem.href}
                        to={subItem.href}
                        className={subLinkClasses}
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        {subItem.icon && (
                          <subItem.icon className="w-3 h-3 inline mr-2" />
                        )}
                        {subItem.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="absolute mt-10 w-full p-4 border-t border-[#334155]">
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:bg-[#334155] hover:text-white transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Overlay for mobile sidebar */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Page Content */}
          <div className="max-w-screen-xl mx-auto">
            <div className="mb-5 text-gray-400 ">
              <Link
                to={"/"}
                className="hover:text-white flex items-center gap-2"
              >
                <MoveLeft className="h-5 w-5" /> Back to Home
              </Link>
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
