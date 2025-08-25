import { ShieldCheck } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-emerald-400/20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F172A]/50 to-[#0F172A]"></div>

      <div className="max-w-screen-xl mx-auto px-5 lg:px-0 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 mb-6">
            <ShieldCheck className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent">
            Verify Your Identity
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            GradLink is exclusively for BRAC University students and alumni. Complete the verification process to access projects, collaborations, and alumni connections.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;