import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // CORRECT: Relative path use karein, localhost nahi
      const response = await axios.post("/api/contact", form);
      
      if (response.status === 200 || response.status === 201) {
        alert("Message Sent Successfully!");
        setForm({ name: "", email: "", message: "" }); // Form reset
      }
    } catch (err) {
      console.error("Submission Error:", err);
      // Agar error aaye toh detail check karein
      alert(err.response?.data?.error || "Failed to connect to server");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto bg-white/10 p-8 rounded-2xl shadow-xl mt-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Contact US</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 bg-white/20 rounded-lg outline-none text-black border border-transparent focus:border-cyan-500"
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-3 bg-white/20 rounded-lg outline-none text-black border border-transparent focus:border-cyan-500"
            placeholder="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            className="w-full p-3 bg-white/20 rounded-lg outline-none text-black border border-transparent focus:border-cyan-500"
            placeholder="Message"
            name="message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="w-full bg-cyan-500 p-3 rounded-lg text-black font-bold hover:bg-cyan-400 transition shadow-lg">
            Send Message
          </button>
        </form>
      </div>
    </>
  );
}

export default Contact;