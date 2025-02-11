import { TaskProvider } from './store/taskStore';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import { FaUserCircle } from 'react-icons/fa';

function App() {
  return (
    <TaskProvider>
      <div className="app-container min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm py-4 px-6 mb-8">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-gray-800">
                Task Manager
              </span>
            </h1>
            <button className="text-gray-600 hover:text-green-600">
              <FaUserCircle className="w-8 h-8" />
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Create New Task</h2>
            <AddTask />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Task List</h3>
              <span className="text-sm text-gray-500">{/* Task count here */}</span>
            </div>
            <TaskList />
          </div>
        </main>
      </div>
    </TaskProvider>
  );
}

export default App;