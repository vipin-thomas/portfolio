// pages/Projects.jsx
import { useState } from 'react';
import AddProjectModal from '../components/AddProjectModal';
import LoginPromptModal from '../components/LoginPromptModal';

export default function ProjectsPage() {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isPromptOpen, setPromptOpen] = useState(false);

  const handleAddProjectClick = () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setAddModalOpen(true);
    } else {
      setPromptOpen(true);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          onClick={handleAddProjectClick}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Add Project
        </button>
      </div>

      {/* existing project list here */}

      <AddProjectModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} />
      <LoginPromptModal isOpen={isPromptOpen} onClose={() => setPromptOpen(false)} />
    </div>
  );
}
