import { Users, Handshake, CheckCircle } from "lucide-react";

const WhyVerifySection = () => {
  return (
    <section className="py-16 max-w-screen-xl mx-auto px-5 lg:px-0">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-white">Why Verification Matters</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Our verification process ensures a trusted and secure community for all BRACU members.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="card-body">
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 w-fit mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2 text-white">Community Integrity</h3>
            <p className="text-sm text-gray-400">
              Ensures only genuine BRACU members can access the platform and its resources.
            </p>
          </div>
        </div>

        <div className="card text-center">
          <div className="card-body">
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 w-fit mx-auto mb-4">
              <Handshake className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2 text-white">Trust in Collaborations</h3>
            <p className="text-sm text-gray-400">
              Build meaningful professional relationships with verified alumni and students.
            </p>
          </div>
        </div>

        <div className="card text-center">
          <div className="card-body">
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 w-fit mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2 text-white">Quality Assurance</h3>
            <p className="text-sm text-gray-400">
              Maintain high standards for projects, mentorship, and networking opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyVerifySection;