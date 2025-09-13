import { type Task, type FilterType } from '../types';
import "./TaskList.css";

type TaskListProps = {
  taskList: Task[];
  filter: FilterType;
  handleTaskChange: (id: number) => void;
  handleAllRemoveTask: (tasks: Task[]) => void;
};

const TaskList = ({
  taskList,
  filter,
  handleTaskChange,
  handleAllRemoveTask,
}: TaskListProps) => {
// フィルターに応じてタスクを絞り込み
const todoTasks = taskList.filter(({ isDone }) => !isDone);
const displayTasks = taskList.filter(({ isDone }) => {
         if (filter === 'ALL') return true;
         if (filter === 'TODO') return !isDone;
         if (filter === 'DONE') return isDone; 
});
return (
    <ul>
      {displayTasks.length === 0 && filter === 'ALL' ? (
        <p>タスクを追加してください</p>
      ) :displayTasks.length === 0 ? (
        <p>該当するタスクがありません</p>
      ) : (
        displayTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={() => handleTaskChange(task.id)}
            />
            <span
              style={{
                textDecoration: task.isDone ? 'line-through' : 'none'
              }}
            >
              {task.name}
            </span>
            <button
            className="danger delete"
            disabled={todoTasks.length === taskList.length}
            onClick={() => handleAllRemoveTask(todoTasks)}
            >
              削除
            </button>
          </li>
        ))
      )}
    </ul>
  );
};

export default TaskList;
