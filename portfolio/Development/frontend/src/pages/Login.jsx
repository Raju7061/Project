import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Using relative path for Pods/Nginx ingress, or localhost for local dev
const API_BASE = "/api/auth"; 

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_BASE + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
    } catch (err) {
      console.error("Connection Error:", err);
      alert("Cannot connect to server. Check your API configuration.");
    }
  };

  return (
    /* Background color set to #43FAC6 using Tailwind arbitrary value */
    <div className="flex justify-center items-center h-screen bg-[#43FAC6]">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl w-96 shadow-2xl">
        <h2 className="text-3xl mb-6 text-center font-bold text-gray-800">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#43FAC6] outline-none text-black"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#43FAC6] outline-none text-black"
            onChange={handleChange}
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-[#2dd4bf] text-white py-3 rounded-lg font-bold hover:bg-[#14b8a6] transition-all shadow-md"
        >
          Sign In
        </button>

        <p className="text-sm mt-5 text-center text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-[#14b8a6] font-bold cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;