import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // FIX: Localhost hata diya, ab Ingress ise backend pod tak le jayega
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Signup failed");
        return;
      }

      alert("Account created successfully");
      navigate("/");
    } catch (err) {
      console.error("Signup Error:", err);
      alert("Server error. Please check if backend is running.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <form onSubmit={handleSignup} className="bg-gray-800 p-8 rounded-xl w-96 shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-400">Sign Up</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-3 mb-4 text-black rounded outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-4 text-black rounded outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 mb-6 text-black rounded outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
          required
        />

        <button className="w-full bg-green-500 hover:bg-green-600 transition-colors py-3 rounded-lg font-bold text-lg">
          Sign Up
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <span
            className="text-cyan-400 cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;