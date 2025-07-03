import React from "react";
import { register } from "../services/authAPI";
import AuthFormWrapper from "../components/AuthFormWrapper";
import { useState } from "react";


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(formData);
      console.log(res)
      setMessage(res.data.message);
    } catch (err) {
        console.log(err)
      setMessage(err.Response?.data?.message || "Registration failed");
    }
  };
  return (
    <>
      <AuthFormWrapper title={"Register"}>
        <form onSubmit={handlesubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Enter Your Name"
            onChange={handleChange}
            value={formData.name}
            required
            className="w-full px-4 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="email"
            type="email"
            placeholder="Enter Your Email"
            onChange={handleChange}
            value={formData.email}
            required
            className="w-full px-4 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            required
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>
          {message && (
            <p className="text-center text-sm text-gray-700 mt-2">{message}</p>
          )}
        </form>
        <p className="mt-3 text-sm flex justify-between">
          <a href="/login" className="text-blue-400 hover:underline">
            Already Have Account?
          </a>
        </p>
      </AuthFormWrapper>
    </>
  );
};

export default Register;
