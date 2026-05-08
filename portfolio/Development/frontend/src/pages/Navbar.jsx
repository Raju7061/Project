import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [profileImage, setProfileImage] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const token = localStorage.getItem("token");

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    return `${API_BASE_URL}${imagePath}`;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          console.error(data.error || "Profile fetch failed");
          return;
        }

        if (data.profile_image) {
          setProfileImage(getImageUrl(data.profile_image));
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    if (token) fetchProfile();
  }, [token, API_BASE_URL]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowMenu(false);
    navigate("/");
  };

  const handleUploadClick = () => {
    if (!token) {
      alert("Please login first");
      return;
    }

    fileRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${API_BASE_URL}/api/profile/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Upload failed");
        return;
      }

      if (data.profile_image) {
        setProfileImage(getImageUrl(data.profile_image));
        alert("Profile image uploaded");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
    } finally {
      e.target.value = "";
    }
  };

  const navLinks = [
    { path: "/home", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" },
    { path: "/messages", label: "Messages" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-lg border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/home" className="text-cyan-400 text-2xl font-extrabold">
          My Portfolio
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-slate-300 hover:text-cyan-400 transition font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 relative">
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="hidden sm:inline-flex rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition"
          >
            Settings
          </button>

          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="h-11 w-11 rounded-full overflow-hidden border-2 border-cyan-400 bg-slate-800"
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-cyan-400 font-bold">
                U
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenu((prev) => !prev)}
            className="lg:hidden rounded-xl border border-slate-700 px-3 py-2 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition"
          >
            ☰
          </button>

          {showMenu && (
            <div className="absolute right-0 top-14 w-56 rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-cyan-500/10 overflow-hidden">
              <button
                onClick={handleUploadClick}
                className="block w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition"
              >
                Upload Profile Photo
              </button>

              <Link
                to="/profile"
                onClick={() => setShowMenu(false)}
                className="block w-full px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-slate-800 transition"
              >
                Logout
              </button>
            </div>
          )}

          <input
            type="file"
            ref={fileRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {mobileMenu && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 py-4">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenu(false)}
                className="rounded-xl px-4 py-3 text-slate-300 hover:bg-slate-900 hover:text-cyan-400 transition"
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={handleUploadClick}
              className="rounded-xl px-4 py-3 text-left text-slate-300 hover:bg-slate-900 hover:text-cyan-400 transition"
            >
              Upload Profile Photo
            </button>

            <button
              onClick={handleLogout}
              className="rounded-xl px-4 py-3 text-left text-red-400 hover:bg-slate-900 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;