import { useState, type FormEvent } from 'react';
import "./App.css";
import Title from "./components/Title";
import AddTask from './components/AddTask';
import Filter from './components/Filter';
import TaskList from './components/TaskList';
import type { Task, FilterType } from './types';
import { Priority, Category } from './types';

function App() {
  const [inputTask, setInputTask] = useState('');
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [id, setId] = useState(1);
  const [filter, setFilter] = useState<FilterType>('ALL');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<Category>('work');
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputTask === '') return;

    const newTask: Task = {
      id: id,
      name: inputTask,
      isDone: false,
      priority,
      category,
      createdAt: new Date(),
    };

    setTaskList([...taskList, newTask]);
    setId(id + 1);
    setInputTask('');
  };
  const handleTaskChange = (taskId: number) => {
    const newTaskList = taskList.map((task) => {
      if (task.id === taskId) {
        return { ...task, isDone: !task.isDone };
      }
      return task;
    });
    setTaskList(newTaskList);
  };

  // タスクを削除
  // const handleRemoveTask = (taskId: number) => {
  //   const newTaskList = taskList.filter(
  //     (task) => task.id !== taskId
  //   );
  //   setTaskList(newTaskList);
  // };
  const handleAllRemoveTask = (tasksToRemove: Task[]) => {
    if (window.confirm(`完了済みタスクをすべて削除してもよいですか？`)) {
      setTaskList(tasksToRemove);
    }
  };

  return (
    <>
      <div className="todo">
      <Title str="ToDo App" />
      <AddTask
          inputTask={inputTask}
          setInputTask={setInputTask}
          handleSubmit={handleSubmit}
          priority={priority}
          setPriority={setPriority}
          category={category}
          setCategory={setCategory}
        />
        <hr />
        <Filter onChange={setFilter} value={filter} />
        <TaskList
          taskList={taskList}
          filter={filter}
          handleTaskChange={handleTaskChange}
          handleAllRemoveTask={handleAllRemoveTask}
        />
      </div>
    </>
  );
}

export default App;