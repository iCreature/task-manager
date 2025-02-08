import { useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import Modal from './Modal';

const TaskItem = ({ task }) => {
  const { deleteTask, updateTask } = useTaskStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDesc, setEditedDesc] = useState(task.description);

  const handleUpdate = () => {
    updateTask(task.id, {
      title: editedTitle,
      description: editedDesc
    });
    setIsEditing(false);
  };

  const handleDeleteConfirmation = () => {
    deleteTask(task.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="task-item bg-white shadow-sm rounded-lg p-4 mb-4">
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">Are you sure you want to delete this task?</h3>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleDeleteConfirmation}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {isEditing ? (
        <div className="edit-form space-y-3">
          <input
            className="w-full p-2 border rounded"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            className="w-full p-2 border rounded"
            value={editedDesc}
            onChange={(e) => setEditedDesc(e.target.value)}
          />
          <div className="flex gap-2">
            <button 
              onClick={handleUpdate}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-medium text-lg">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
            <span className={`inline-block px-2 py-1 text-sm rounded ${
              task.completed 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {task.completed ? 'Completed' : 'Pending'}
            </span>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => updateTask(task.id, { completed: e.target.checked })}
              className="w-4 h-4"
            />
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
            >
              Edit
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;