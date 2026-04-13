import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
  const [profileImg, setProfileImg] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/profile")
      .then(res => {
        if (res.data?.image_url) {
          setProfileImg(
            "http://localhost:5000" + encodeURI(res.data.image_url)
          );
        }
      })
      .catch(err => console.error("Profile fetch error:", err));
  }, []);

  return (
    <nav className="backdrop-blur-lg bg-white/10 border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-cyan-400">
          My Portfolio
        </h1>

        <ul className="flex items-center gap-6 text-lg">
          <li><Link to="/" className="hover:text-cyan-300">Home</Link></li>
          <li><Link to="/about" className="hover:text-cyan-300">About</Link></li>
          <li><Link to="/projects" className="hover:text-cyan-300">Projects</Link></li>
          <li><Link to="/contact" className="hover:text-cyan-300">Contact</Link></li>
          <li><Link to="/profile" className="hover:text-cyan-300">Profile</Link></li>
          <li><Link to="/create-resume">Create Resume</Link></li>


          {/* ✅ PROFILE IMAGE */}
          {profileImg && (
            <img
              src={profileImg}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-cyan-400"
            />
          )}
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;
