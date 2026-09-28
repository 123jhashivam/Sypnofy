import React from "react";

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-6">
      <div className="max-w-3xl w-full text-center">

        {/* Logo / Brand */}
        <div className="mt-8 mb-8">
          <h2 className="text-3xl font-bold text-blue-600">
            Sypnofy
          </h2>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-xl p-10 md:p-16">

          {/* Icon */}
          <div className="mx-auto mb-8 w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-5">
            Coming Soon
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            We're working hard to bring something amazing for you.
            This page is currently under development and will be available soon.
          </p>

          {/* Status */}
          <div className="inline-flex items-center gap-2 px-5 py-3 bg-blue-50 text-blue-700 rounded-full font-medium">
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse"></span>
            Under Development
          </div>

          {/* Bottom Text */}
          <p className="text-sm text-gray-500 mt-8">
            Thank you for your patience.
          </p>

        </div>
      </div>
    </div>
  );
};

export default ComingSoon;