// src/App.jsx
import { TaskProvider } from './store/taskStore';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <div className="app-container">
        <h1>Task Manager</h1>
        <AddTask />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;