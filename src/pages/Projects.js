import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // 🔥 loading state

  useEffect(() => {
    fetch("https://vipdevo.xyz/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false); // 🔄 done loading
      })
      .catch((err) => {
        console.error("API error:", err);
        setLoading(false); // ❌ fail = stop loading
      });
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">My Projects</h2>

      {loading ? (
        <p className="text-gray-300">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-white">No projects found.</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project, index) => (
            <li
              key={index}
              className="p-4 bg-gray-800 rounded-xl text-white shadow-lg"
            >
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-300">{project.description}</p>
              <a
                href={project.github}
                className="text-blue-400 underline text-sm mt-2 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
              <div className="mt-2 text-xs text-gray-400">
                {project.tags?.map((tag, i) => (
                  <span key={i} className="mr-2">#{tag}</span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
