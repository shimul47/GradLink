import React from "react";
import { ArrowRight, Users, Briefcase, Network } from "lucide-react";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="min-h-screen w-full bg-[#020617] relative">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
        {/* Purple Radial Glow Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `radial-gradient(circle 500px at 50% 100px, rgba(139,92,246,0.3), transparent)`,
          }}
        />

        {/* Your Content/Components */}
        < div className="max-w-screen-xl py-10 mx-auto px-5 lg:px-0 relative z-10" >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              {/* BRAC University Badge */}
              <div className="inline-flex bg-[#1c2b4f] items-center px-4 py-3 rounded-full border text-sm font-medium text-blue-500 border-none shadow-md" >
                🎓 Exclusively for BRAC University Community
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white" >
                  Connect, Collaborate, and{" "}
                  <span className="bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent">
                    Grow Together
                  </span>
                </h1>
                <p className="text-lg leading-relaxed max-w-lg text-gray-300" >
                  GradLink bridges BRAC University students and alumni through
                  career connections, project collaborations, and mentorship.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="flex items-center text-white bg-gradient-to-r from-blue-500 to-emerald-400 hover:to-emerald-600 gap-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-3 border border-white/20 bg-black hover:bg-blue-950 text-white rounded-lg font-medium transition-colors duration-200">
                  Already a member? Login
                </Link>
              </div>

              {/* Stats */}
              <div className=" grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-2 mx-auto" style={{ backgroundColor: "rgba(59, 130, 246, 0.2)" }}>
                    <Users className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="text-2xl font-bold text-white" >500+</div>
                  <div className="text-sm text-gray-400" >Students</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-2 mx-auto" style={{ backgroundColor: "rgba(16, 185, 129, 0.2)" }}>
                    <Briefcase className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-white" >200+</div>
                  <div className="text-sm text-gray-400 mr-3" >Alumni</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-2 mx-auto" style={{ backgroundColor: "rgba(59, 130, 246, 0.2)" }}>
                    <Network className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="text-2xl font-bold text-white" >50+</div>
                  <div className="text-sm text-gray-400" >Projects</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}>
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600"
                  alt="BRACU students and alumni collaborating"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Floating Alumni Card */}
              <div className="absolute -top-4 -left-4 shadow-lg p-4 w-64 rounded-lg bg-white" >
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="rounded-full w-12  text-center content-center bg-blue-500 text-white">
                      AB
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-sm" >Ahmed Rahman</div>
                    <div className="text-xs text-gray-400" >
                      CSE '23, Software Engineer at Google
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Project Card */}
              <div className="absolute -bottom-4 -right-4 shadow-lg p-4 w-64 rounded-lg bg-white" >
                <div className="text-sm font-semibold mb-1">New Project</div>
                <div className="text-xs text-gray-400" >AI-powered Learning Platform</div>
                <div className="text-xs mt-1 text-gray-400">5 students joined</div>
              </div>
            </div>
          </div>
        </div >
      </div>
      < div className="absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: "rgba(59, 130, 246, 0.2)" }} />
      < div className="absolute bottom-20 left-10 w-80 h-80 rounded-full blur-3xl" style={{ backgroundColor: "rgba(16, 185, 129, 0.15)" }} />


    </section >
  );
};

export default Hero;