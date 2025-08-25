import React from "react";
import { Link } from "react-router";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Clock,
  Send,
  ExternalLink
} from "lucide-react";

const Contact = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch with our team",
      contact: "hello@gradlink.bracu.edu",
      action: "Send Email"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with support",
      contact: "+880 2 55040101",
      action: "Call Now"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "BRAC University Campus",
      contact: "Merul Badda, Dhaka 1212",
      action: "Get Directions"
    }
  ];

  const faqItems = [
    {
      question: "How do I get verified on GradLink?",
      answer: "Submit your verification request with your BRACU credentials. Our admin team will verify against the official database and approve your account within 24-48 hours."
    },
    {
      question: "Can I join projects as a student?",
      answer: "Yes! Once verified, students can browse and join projects created by alumni. This is a great way to gain real-world experience and build professional connections."
    },
    {
      question: "Is GradLink free to use?",
      answer: "Yes, GradLink is completely free for all BRAC University students and alumni. Our platform is built by the community, for the community."
    },
    {
      question: "How can alumni create projects?",
      answer: "Verified alumni can create projects from their dashboard. Simply describe your project, set requirements, and students can apply to collaborate with you."
    }
  ];

  return (
    <div className="min-h-screen ">
      <main>
        {/* Hero Section */}
        <section className="py-20" style={{ background: "linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.7) 100%)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Get in{" "}
              <span className="bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: "#94A3B8" }}>
              Have questions about GradLink? Need help getting verified? Or want to suggest new features?
              We'd love to hear from the BRAC University community.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="card backdrop-blur-md bg-slate-800/50 border border-slate-600/30 shadow-xl transition-all duration-300  
hover:-translate-y-1 hover:shadow-blue-500/10"

                >
                  <div className="card-body items-center text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-r from-blue-500 to-emerald-400 " >
                      <method.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="card-title text-xl text-white">{method.title}</h3>
                    <p style={{ color: "#94A3B8" }}>{method.description}</p>
                    <div className="space-y-4 mt-4">
                      <p className="text-lg font-semibold text-white">
                        {method.contact}
                      </p>
                      <button className="btn btn-outline shadow-none text-white hover:bg-blue-950 border-white/20 ">
                        {method.action}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form & Info */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="card backdrop-blur-md bg-opacity-20 border border-opacity-10 shadow-xl" style={{
                backgroundColor: "rgba(30, 41, 59, 0.5)",
                borderColor: "rgba(51, 65, 85, 0.3)"
              }}>
                <div className="card-body">
                  <div className="flex items-center space-x-2 mb-4">
                    <MessageSquare className="w-6 h-6 text-blue-500" />
                    <h2 className="card-title text-2xl text-white">Send us a Message</h2>
                  </div>
                  <p className="mb-6" style={{ color: "#94A3B8" }}>
                    Fill out the form below and we'll get back to you within 24 hours
                  </p>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="label font-medium text-white">
                          First Name
                        </label>
                        <input
                          type="text"
                          placeholder="John"
                          className="input input-bordered bg-[#1E293B] w-full border-[#334155] text-white"
                        />
                      </div>
                      <div>
                        <label className="label font-medium text-white">
                          Last Name
                        </label>
                        <input
                          type="text"
                          placeholder="Doe"
                          className="input input-bordered bg-[#1E293B] w-full border-[#334155] text-white"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="label font-medium text-white">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="john.doe@g.bracu.ac.bd"
                        className="input input-bordered bg-[#1E293B] w-full border-[#334155] text-white"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="label font-medium text-white">
                        I am a
                      </label>
                      <select className="select select-bordered bg-[#1E293B] w-full border-[#334155] text-white">
                        <option disabled selected>Select your role</option>
                        <option>Current Student</option>
                        <option>Alumni</option>
                        <option>Faculty Member</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="label font-medium text-white">
                        Subject
                      </label>
                      <select className="select select-bordered bg-[#1E293B] w-full border-[#334155] text-white">
                        <option disabled selected>What can we help you with?</option>
                        <option>Account Verification</option>
                        <option>Technical Support</option>
                        <option>Feature Request</option>
                        <option>Partnership Inquiry</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="label font-medium text-white">
                        Message
                      </label>
                      <textarea
                        placeholder="Tell us more about your inquiry..."
                        className="textarea textarea-bordered bg-[#1E293B] w-full border-[#334155] text-white min-h-[120px]"
                      ></textarea>
                    </div>

                    <div className="md:col-span-2">
                      <button className="btn btn-primary w-full group">
                        Send Message
                        <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-8">
                {/* Office Hours */}
                <div className="card backdrop-blur-md bg-opacity-20 border border-opacity-10 shadow-xl" style={{
                  backgroundColor: "rgba(30, 41, 59, 0.5)",
                  borderColor: "rgba(51, 65, 85, 0.3)"
                }}>
                  <div className="card-body">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-6 h-6 text-blue-500" />
                      <h3 className="card-title text-xl text-white">Support Hours</h3>
                    </div>
                    <div className="space-y-3 mt-4">
                      <div className="flex justify-between">
                        <span className="text-white">Monday - Friday</span>
                        <span className="font-semibold text-white">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white">Saturday</span>
                        <span className="font-semibold text-white">10:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white">Sunday</span>
                        <span style={{ color: "#94A3B8" }}>Closed</span>
                      </div>
                      <div className="pt-2 text-sm" style={{ color: "#94A3B8" }}>
                        All times are Bangladesh Standard Time (BST)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="card backdrop-blur-md bg-opacity-20 border border-opacity-10 shadow-xl" style={{
                  backgroundColor: "rgba(30, 41, 59, 0.5)",
                  borderColor: "rgba(51, 65, 85, 0.3)"
                }}>
                  <div className="card-body">
                    <h3 className="card-title text-xl text-white">Response Time</h3>
                    <div className="space-y-3 mt-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                        <div>
                          <div className="font-semibold text-white">General Inquiries</div>
                          <div className="text-sm" style={{ color: "#94A3B8" }}>Within 24 hours</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div>
                          <div className="font-semibold text-white">Verification Requests</div>
                          <div className="text-sm" style={{ color: "#94A3B8" }}>24-48 hours</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div>
                          <div className="font-semibold text-white">Technical Issues</div>
                          <div className="text-sm" style={{ color: "#94A3B8" }}>Within 12 hours</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20" style={{ backgroundColor: "rgba(15, 23, 42, 0.3)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: "#94A3B8" }}>
                Quick answers to common questions about GradLink
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {faqItems.map((faq, index) => (
                <div
                  key={index}
                  className="card backdrop-blur-md bg-opacity-20 border border-opacity-10 shadow-xl"
                  style={{
                    backgroundColor: "rgba(30, 41, 59, 0.5)",
                    borderColor: "rgba(51, 65, 85, 0.3)"
                  }}
                >
                  <div className="card-body">
                    <h3 className="card-title text-lg text-white">{faq.question}</h3>
                    <p className="leading-relaxed" style={{ color: "#94A3B8" }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;