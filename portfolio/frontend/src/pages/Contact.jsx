import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
   await axios.post("http://localhost:5000/api/contact", form);

    alert("Message Sent!");
  };

  return (




    <>
      <Navbar />
      <div className="max-w-lg mx-auto bg-white/10 p-8 rounded-2xl shadow-xl mt-8">
  <h1 className="text-3xl font-bold mb-6 text-center">Contact Me</h1>

  <form onSubmit={handleSubmit} className="space-y-4">
    <input
      className="w-full p-3 bg-white/20 rounded-lg outline-none"
      placeholder="Name"
      name="name"
      onChange={handleChange}
    />
    <input
      className="w-full p-3 bg-white/20 rounded-lg outline-none"
      placeholder="Email"
      name="email"
      onChange={handleChange}
    />
    <textarea
      className="w-full p-3 bg-white/20 rounded-lg outline-none"
      placeholder="Message"
      name="message"
      rows="4"
      onChange={handleChange}
    />
    <button className="w-full bg-cyan-500 p-3 rounded-lg text-black font-bold hover:bg-cyan-400 transition">
      Send Message
    </button>
  </form>
</div>
    </>

  );
}

export default Contact;
