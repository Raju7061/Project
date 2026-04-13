
import Navbar from "./Navbar";

function Projects() {
  const projects = [
    { title: "Portfolio Website", desc: "React + Tailwind portfolio project." },
    { title: "SRE Monitoring App", desc: "Logging, alerts & dashboards." },
    { title: "MERN Blog App", desc: "JWT auth, CRUD, dashboard." },
  ];

  return (


    <>
      <Navbar />
          <div>
      <h1 className="text-4xl font-bold mb-6">My Projects</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <div key={i} className="bg-white/10 p-6 rounded-xl shadow-lg hover:bg-white/20 transition">
            <h2 className="text-2xl font-semibold">{p.title}</h2>
            <p className="opacity-80 mt-2">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
    </>

  );
}

export default Projects;
