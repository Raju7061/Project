
import Navbar from "./Navbar";

function About() {
  return (

<>
      <Navbar />
          <div className="space-y-6">
      <h1 className="text-4xl font-bold mb-4">About Me</h1>

      <p className="text-lg opacity-90 leading-relaxed">
        I am an <span className="text-cyan-300">SRE & MERN Developer</span> with
        strong experience in managing scalable systems, cloud infrastructure,
        full-stack app development and automation.
      </p>

      <div className="bg-white/10 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl mb-3 font-semibold">My Skills</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <li>React.js</li>
          <li>Node.js</li>
          <li>Docker</li>
          <li>Kubernetes</li>
          <li>MongoDB</li>
          <li>CI/CD</li>
        </ul>
      </div>
    </div>
    </>
  );
}

export default About;
