import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
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
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded w-80">
        <h2 className="text-2xl mb-4">Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
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

        <button className="w-full bg-cyan-500 py-2 rounded">
          Login
        </button>
        <p className="text-sm mt-3 text-center">
  Don't have an account?{" "}
  <span
    className="text-cyan-400 cursor-pointer"
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