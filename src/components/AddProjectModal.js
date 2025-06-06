// src/components/AddProjectModal.js
import { useState } from 'react';

export default function AddProjectModal({ isOpen, onClose, onProjectAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('jwtToken');

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        })
      });

      if (res.ok) {
        setMessage('Project added successfully!');
        setFormData({ title: '', description: '', link: '' });
	if (onProjectAdded) onProjectAdded();      
        setTimeout(() => {
          setMessage('');
          onClose();
        }, 1500);
      } else {
        setMessage('Failed to add project.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error submitting form.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Project</h2>
        {message && <p className="mb-3 text-sm text-green-600">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded text-black"
            required
          />
          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded text-black"
            required
          />
          <input
            type="url"
            name="link"
            placeholder="Project Link"
            value={formData.link}
            onChange={handleChange}
            className="w-full border p-2 rounded text-black"
          />
          <input
            type="text"
            name="tags"
            placeholder="Project Tags (comma separated)"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full border p-2 rounded text-black"
          />
	  <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-red-600 hover:bg-red-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
