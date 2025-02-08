import { useTaskStore } from '../store/taskStore';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { tasks } = useTaskStore();

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;