import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/useTypedSelector";
import {
  deleteTask,
  fetchTasks,
  setEditingTask,
  toggleTask,
} from "../store/taskSlice";
import TaskForm from "../components/TaskForm";

const Tasks = () => {
  const { tasks, loading } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  // Fetch tasks when the component mounts
  useEffect(() => {
    if (tasks.length === 0) {
      //Prevent fetching tasks when the tasks are already loaded
      dispatch(fetchTasks()); // Thunk dispatched here
    }
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Your Tasks</h2>
      <TaskForm />
      <ul className="mt-6 space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div>
              <h3
                className={`text-lg font-semibold ${
                  task.completed ? "line-through" : ""
                }`}
              >
                {task.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {task.description}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => dispatch(toggleTask(task.id))}
                className="text-sm bg-green-500 text-white px-2 py-1 rounded"
              >
                {task.completed ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => dispatch(setEditingTask(task))}
                className="text-sm bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteTask(task.id))}
                className="text-sm bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {loading && <p>Loading tasks...</p>}
    </div>
  );
};

export default Tasks;
