// src/components/LoginPromptModal.js
import { useNavigate } from 'react-router-dom';

export default function LoginPromptModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLoginRedirect = () => {
    onClose(); // close modal before redirect
    navigate('/admin-login');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center">
        <h2 className="text-xl font-bold mb-4">Administrator Access Required</h2>
        <p className="mb-4">You must be logged in as an admin to add a new project.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleLoginRedirect}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
