import React from "react";
import {
  UserCheck,
  Search,
  Briefcase,
  Users,
  Shield,
  Network
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: UserCheck,
      title: "Verified BRACU Community",
      description: "Admin-verified students and alumni using official BRAC University database",
      badge: "Secure",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Search,
      title: "Alumni Career Explorer",
      description: "Discover career paths of BRACU alumni across different industries and companies",
      badge: "Discovery",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    },
    {
      icon: Briefcase,
      title: "Professional Showcases",
      description: "Alumni can highlight their career journey, achievements, and current positions",
      badge: "Professional",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Users,
      title: "Project Collaboration",
      description: "Join or create projects with fellow students and alumni for real-world experience",
      badge: "Collaboration",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    },
    {
      icon: Shield,
      title: "Role-Based Access",
      description: "Secure dashboards tailored for students, alumni, and administrators",
      badge: "Security",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    },
    {
      icon: Network,
      title: "Professional Networking",
      description: "Connect with peers, mentors, and industry professionals within BRACU community",
      badge: "Network",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    }
  ];

  const workflows = [
    {
      step: "1",
      title: "Sign Up & Verify",
      description: "Create account and submit BRACU credentials for admin verification"
    },
    {
      step: "2",
      title: "Explore Careers",
      description: "Browse alumni profiles and discover various career paths and opportunities"
    },
    {
      step: "3",
      title: "Connect & Collaborate",
      description: "Join projects, connect with mentors, and build professional relationships"
    }
  ];

  return (
    <section className="py-20" >
      <div className="max-w-screen-xl mx-auto px-5 lg:px-0">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="badge badge-outline badge-primary mb-4 px-4 py-3">Features</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent">
              Build Your Career
            </span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#94A3B8" }}>
            GradLink provides a comprehensive platform for BRAC University students and alumni
            to connect, collaborate, and grow professionally.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card backdrop-blur-md bg-opacity-20 border border-opacity-10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              style={{
                backgroundColor: "rgba(30, 41, 59, 0.5)",
                borderColor: "rgba(51, 65, 85, 0.3)"
              }}
            >
              <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <div className="badge text-black badge-success" >
                    {feature.badge}
                  </div>
                </div>
                <h3 className="card-title text-white text-xl group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="mt-2" style={{ color: "#94A3B8" }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="text-center mb-12">
          <div className="badge badge-outline badge-primary mb-4 px-4 py-3">How It Works</div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Simple 3-Step Process
          </h3>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#94A3B8" }}>
            Get started with GradLink in just a few simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {workflows.map((workflow, index) => (
            <div key={index} className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto shadow-lg">
                {workflow.step}
              </div>
              <h4 className="text-xl font-semibold mb-2 text-white">
                {workflow.title}
              </h4>
              <p className="text-gray-400">{workflow.description}</p>
              {index < workflows.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full">
                  <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;