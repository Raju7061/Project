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
      const response = await axios.post("/api/contact", form);
      
      if (response.status === 200 || response.status === 201) {
        alert("Message Sent Successfully!");
        setForm({ name: "", email: "", message: "" }); 
      }
    } catch (err) {
      console.error("Submission Error:", err);
      alert(err.response?.data?.error || "Failed to connect to server");
    }
  };

  return (
    <>
      <Navbar />
      {/* Background color updated to #43FA68 */}
      <div className="min-h-screen bg-[#43FA68] pt-12">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-2xl">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Contact US</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">Name</label>
              <input
                className="w-full p-3 bg-gray-50 rounded-lg outline-none text-black border border-gray-200 focus:border-[#43FA68] focus:ring-1 focus:ring-[#43FA68] transition"
                placeholder="Enter your name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">Email</label>
              <input
                className="w-full p-3 bg-gray-50 rounded-lg outline-none text-black border border-gray-200 focus:border-[#43FA68] focus:ring-1 focus:ring-[#43FA68] transition"
                placeholder="Enter your email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">Message</label>
              <textarea
                className="w-full p-3 bg-gray-50 rounded-lg outline-none text-black border border-gray-200 focus:border-[#43FA68] focus:ring-1 focus:ring-[#43FA68] transition"
                placeholder="How can we help?"
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#1db954] p-3 rounded-lg text-white font-bold hover:bg-[#19a34a] transition-all shadow-md transform hover:-translate-y-1"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;