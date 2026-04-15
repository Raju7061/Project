import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Kyunki ab hum pods use nahi kar rahe, isliye pura address dena hoga
const API_BASE = "http://localhost:5000/api/auth"; 

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
        headers: {
          "Content-Type": "application/json",
        },
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
      alert("Cannot connect to server. Check if backend is running on port 5000.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded w-80 shadow-lg">
        <h2 className="text-2xl mb-4 text-center font-bold text-cyan-400">Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 mb-3 text-black rounded outline-none"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-4 text-black rounded outline-none"
          onChange={handleChange}
          required
        />

        <button type="submit" className="w-full bg-cyan-500 py-2 rounded font-bold hover:bg-cyan-600 transition">
          Login
        </button>

        <p className="text-sm mt-3 text-center">
          Don't have an account?{" "}
          <span
            className="text-cyan-400 cursor-pointer hover:underline"
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