import { useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import Modal from './Modal';
import { format } from 'date-fns';

const TaskItem = ({ task }) => {
  const { deleteTask, updateTask } = useTaskStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDesc, setEditedDesc] = useState(task.description);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);
  const [editedStatus, setEditedStatus] = useState(task.status);

  const handleUpdate = async () => {
    await updateTask(task.id, {
      title: editedTitle,
      description: editedDesc,
      dueDate: editedDueDate,
      status: editedStatus
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">Confirm Delete</h3>
          <p>Are you sure you want to delete this task?</p>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {isEditing ? (
        <div className="space-y-3">
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
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
          />
          <select
            value={editedStatus}
            onChange={(e) => setEditedStatus(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
            <option value="IN_PROGRESS">In progress</option>
          </select>
          <div className="flex gap-2">
            <button 
              onClick={handleUpdate}
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              Save
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-medium text-lg">{task.title}</h3>
            <p className="text-gray-600 mt-1">{task.description}</p>
            <div className="mt-2 flex items-center gap-4">
              <span className={`px-2 py-1 text-sm rounded ${
                task.status === 'COMPLETED' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {task.status}
              </span>
              <span className="text-sm text-gray-500">
                Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
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