import Navbar from "./Navbar";

function Home() {
  return (

<>
      <Navbar />
          <div className="text-center py-20">
      <h1 className="text-5xl font-bold mb-4">
        Hi, I'm <span className="text-cyan-400">DevOps</span>
      </h1>

      <p className="text-xl opacity-80 mb-6">
        SRE Engineer • MERN Stack Developer • DevOps
      </p>

      <a
        href="/resume/Raju.resume.pdf"
        download
        className="inline-block px-6 py-3 bg-cyan-500 rounded-lg text-black font-semibold hover:bg-cyan-400 transition"
      >
        Download Resume
      </a>
    </div>
    </>
  );
}

export default Home;

