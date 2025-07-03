import React from "react";
import { useState } from "react";
import { login } from "../services/authAPI";
import { useNavigate } from "react-router-dom";
import AuthFormWrapper from "../components/AuthFormWrapper";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const { loginUser, user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData);
      loginUser({
        userData: res.data,
        token: res.data.token,
      });
      console.log(res);
      navigate("/");
    } catch (err) {
      console.log(err);
      setMessage(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <>
      <AuthFormWrapper title={"Login"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
          {message && (
            <p className="text-center text-sm text-gray-700 mt-2">{message}</p>
          )}
        </form>
        <p className="mt-3 text-sm flex justify-between">
          <a href="/forgot-password" className="text-blue-400 hover:underline">
            Forgot Password?
          </a>
          <a href="/register" className="text-blue-400 hover:underline">
            Don't Have Account?
          </a>
        </p>
      </AuthFormWrapper>
    </>
  );
};

export default Login;
