import React from "react";

const AuthFormWrapper = ({ title, children }) => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthFormWrapper;
