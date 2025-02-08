// src/components/TaskItem.jsx
import { useState } from 'react';
import { useTaskStore } from '../store/taskStore';

const TaskItem = ({ task }) => {
  const { deleteTask, updateTask, setEditingTask } = useTaskStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDesc, setEditedDesc] = useState(task.description);

  const handleUpdate = () => {
    updateTask(task.id, {
      title: editedTitle,
      description: editedDesc
    });
    setIsEditing(false);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <div className="edit-form">
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedDesc}
            onChange={(e) => setEditedDesc(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <div className="task-info">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <span>Status: {task.completed ? 'Completed' : 'Pending'}</span>
          </div>
          <div className="task-actions">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => updateTask(task.id, { completed: e.target.checked })}
            />
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;