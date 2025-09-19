import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen max-w-screen-xl mx-auto text-center flex items-center justify-center text-primary">
      <span className="loading loading-bars loading-xl bg-gradient-to-r from-blue-500 to-emerald-400"></span>
    </div>
  );
};

export default Loader;
