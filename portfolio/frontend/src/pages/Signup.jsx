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
      const res = await fetch("http://localhost:5000/api/auth/register", {
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
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <form onSubmit={handleSignup} className="bg-gray-800 p-6 rounded w-80">
        <h2 className="text-2xl mb-4">Sign Up</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 mb-3 text-black rounded"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-3 text-black rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-4 text-black rounded"
          onChange={handleChange}
        />

        <button className="w-full bg-green-500 py-2 rounded">
          Sign Up
        </button>

        <p className="text-sm mt-3 text-center">
          Already have an account?{" "}
          <span
            className="text-cyan-400 cursor-pointer"
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