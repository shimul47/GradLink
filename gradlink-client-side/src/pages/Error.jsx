import React from 'react';
import { Link } from 'react-router';
import { Home, AlertCircle } from 'lucide-react';

const Error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#0F172A] to-[#1E293B]">
      <div className="text-center max-w-md mx-auto">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-400 bg-opacity-20 flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-white mb-4">Something Went Wrong</h1>
        <p className="text-gray-400 mb-8">
          We're sorry, but something unexpected happened. Please try going back to the homepage.
        </p>

        {/* Back to Home Button */}
        <Link
          to="/"
          className="btn btn-primary bg-gradient-to-r from-blue-500 to-emerald-400 border-none text-white hover:from-blue-600 hover:to-emerald-500 transition-all duration-300 group inline-flex items-center"
        >
          <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;