import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = 'http://localhost:8080/tasks';

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_BASE);
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post(API_BASE, task);
      setTasks([...tasks, response.data]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      await axios.put(`${API_BASE}/${id}`, updatedTask);
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, ...updatedTask } : task
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{
      tasks,
      loading,
      error,
      addTask,
      updateTask,
      deleteTask,
      fetchTasks
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTaskStore = () => useContext(TaskContext);