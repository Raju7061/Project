import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Profile from "./pages/profile";
import Navbar from "./pages/Navbar";
import CreateResume from "./pages/CreateResume";



function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">

        {/* ✅ USE NAVBAR COMPONENT */}
        <Navbar />

        {/* Pages */}
        <div className="max-w-6xl mx-auto px-6 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-resume" element={<CreateResume />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
