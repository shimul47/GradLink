
import { Link } from "react-router";
import {
  Users,
  Target,
  Heart,
  Lightbulb,
  Shield,
  Globe,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Community First",
      description: "Building meaningful connections within the BRAC University family"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Empowering students and alumni through cutting-edge collaboration tools"
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Verified community ensuring safe and authentic professional networking"
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Connecting BRACU graduates worldwide to create lasting professional relationships"
    }
  ];

  const teamMembers = [
    {
      name: "Development Team",
      role: "Full-Stack Engineers",
      description: "Building the technical foundation of GradLink with modern web technologies",
      avatar: "DT"
    },
    {
      name: "BRACU Alumni",
      role: "Advisory Board",
      description: "Guiding platform development with real-world industry experience",
      avatar: "AB"
    },
    {
      name: "Student Council",
      role: "User Experience",
      description: "Ensuring the platform meets current student needs and expectations",
      avatar: "SC"
    }
  ];

  const milestones = [
    {
      year: "2025",
      title: "Platform Launch",
      description: "GradLink beta launched exclusively for BRAC University community"
    },
    {
      year: "2025",
      title: "500+ Members",
      description: "Reached milestone of 500 verified students and alumni on the platform"
    },
    {
      year: "2025",
      title: "50+ Projects",
      description: "Facilitated over 50 collaborative projects between students and alumni"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <main>
        {/* Hero Section */}
        <section className="py-20" style={{ background: "linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.7) 100%)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Empowering the{" "}
              <span className="bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent">
                BRACU Community
              </span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: "#94A3B8" }}>
              GradLink is more than just a networking platform—it's a bridge connecting the rich legacy
              of BRAC University alumni with the bright future of current students, fostering collaboration,
              mentorship, and professional growth.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-slate-900/40">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
            <div className="card backdrop-blur-md bg-slate-800/50 border border-slate-600/30 shadow-xl transition-all duration-300 hover:shadow-2xl 
hover:-translate-y-1">
              <div className="card-body">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-400 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="card-title text-2xl">Our Mission</h2>
                <p className="text-slate-300">
                  To create an ecosystem where BRAC University students and alumni can
                  seamlessly connect, collaborate on projects, and support each other’s professional journey.
                </p>
              </div>
            </div>

            <div className="card backdrop-blur-md bg-slate-800/50 border border-slate-600/30 shadow-xl transition-all duration-300 hover:shadow-2xl 
hover:-translate-y-1">
              <div className="card-body">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-400 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="card-title text-2xl">Our Vision</h2>
                <p className="text-slate-300">
                  To be the premier platform that transforms how BRAC University members
                  connect globally, making networking meaningful and impactful.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-slate-800/30">
          <div className="max-w-screen-xl mx-auto px-5 lg:px-0 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Drives Us Forward</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-12">
              Our core values shape every feature, interaction, and connection on GradLink
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="card backdrop-blur-md bg-slate-800/50 border border-slate-600/30 shadow-xl transition-all duration-300  
hover:-translate-y-1 hover:shadow-blue-500/10 ">
                  <div className="card-body items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 flex items-center justify-center mb-4">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="card-title">{value.title}</h3>
                    <p className="text-slate-300">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Team */}
        <section className="py-20">
          <div className="max-w-screen-xl mx-auto px-5 lg:px-0 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built by BRACU, for BRACU</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-12">
              Our platform is designed and developed by passionate BRAC University community members
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="card backdrop-blur-md bg-slate-800/50 border border-slate-600/30 shadow-lg transition-all duration-300 hover:shadow-blue-500/15 
hover:-translate-y-1">
                  <div className="card-body text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                      {member.avatar}
                    </div>
                    <h3 className="card-title justify-center">{member.name}</h3>
                    <p className="text-emerald-400 font-medium">{member.role}</p>
                    <p className="text-slate-300">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="py-20 bg-slate-900/40">
          <div className="max-w-screen-xl mx-auto px-5 lg:px-0 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Growing Together</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-12">
              Key milestones in building the BRAC University professional community
            </p>

            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={i} className="flex items-center space-x-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {m.year}
                  </div>
                  <div className="card backdrop-blur-md bg-slate-800/50 border border-slate-600/30 shadow-xl transition-all duration-300 hover:shadow-blue-500/10
hover:-translate-y-1 flex-1 text-left">
                    <div className="card-body">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                        <h3 className="card-title">{m.title}</h3>
                      </div>
                      <p className="text-slate-300">{m.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the Community?</h2>
            <p className="text-xl text-slate-300 mb-8">
              Connect with BRACU students and alumni. Start building meaningful professional relationships today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="btn btn-primary gap-2 border-none text-white bg-gradient-to-r from-blue-500 to-emerald-400">
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="btn btn-outline py-5 shadow-none hover:text-white hover:bg-blue-950 border-white/20 ">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
