import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddProjectModal from "../components/AddProjectModal";
import LoginPromptModal from "../components/LoginPromptModal";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isPromptOpen, setPromptOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
   fetchProjects();
  }, []);

  const handleAddProjectClick = () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setAddModalOpen(true);
    } else {
      setPromptOpen(true);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this project?");
    if (!confirm) return;

    const token = localStorage.getItem("jwtToken");

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setProjects(projects.filter((p) => p._id !== id));
      } else {
        console.error("Delete failed");
      }
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };
 
  const fetchProjects = () => {
  fetch("https://vipdevo.xyz/api/projects")
    .then((res) => res.json())
    .then((data) => {
      setProjects(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("API error:", err);
      setLoading(false);
    });
};


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">My Projects</h2>
        <button
          onClick={handleAddProjectClick}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Add Project
        </button>
      </div>

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
                href={project.link || project.github}
                className="text-blue-400 underline text-sm mt-2 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project
              </a>
              <div className="mt-2 text-xs text-gray-400">
                {project.tags?.map((tag, i) => (
                  <span key={i} className="mr-2">#{tag}</span>
                ))}
              </div>

              {localStorage.getItem("jwtToken") && (
                <button
                  onClick={() => handleDelete(project._id)}
                  className="mt-3 text-red-400 text-sm hover:underline"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      <AddProjectModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} onProjectAdded={fetchProjects} />
      <LoginPromptModal isOpen={isPromptOpen} onClose={() => setPromptOpen(false)} />
    </div>
  );
}
