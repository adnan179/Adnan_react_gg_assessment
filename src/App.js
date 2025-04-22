import React from 'react';
import { createTask } from './utils';

function reducer(tasks, action) {
  if (action.type === "add") {
    return [...tasks, action.task];
  } else if (action.type === "update") {
    return tasks.map((task) =>
      task.id === action.id
        ? { ...task, status: task.status === "pending" ? "completed" : "pending" }
        : task
    );
  } else if (action.type === "delete") {
    return tasks.filter((task) => task.id !== action.id);
  } else {
    throw new Error("This action type is not supported!!");
  }
}

const App = () => {
  const [tasks, dispatch] = React.useReducer(reducer, []);

  const handleUpdateTasksStatus = (id) => {
    dispatch({ type: "update", id });
  };

  const handleDeleteTask = (id) => {
    dispatch({ type: "delete", id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    dispatch({ type: "add", task: createTask(formData.get("task")) });
    e.target.reset();
  };

  return (
    <section className="min-h-screen bg-[#0e0c0c] text-white flex justify-center items-center p-4">
      <div className="w-full max-w-[500px] p-6 bg-[#0e0c0c] rounded-lg">
        <h1 className="text-2xl font-bold text-[#fef3c7] mb-4">TASK MANAGER</h1>
        <form
          onSubmit={handleSubmit}
          className="flex bg-[#1e1b1b] p-2 rounded-md items-center"
        >
          <input
            name="task"
            placeholder="Task title"
            className="flex-grow bg-transparent text-white placeholder:text-gray-400 p-3 rounded-md focus:outline-none"
          />
          <button
            type="submit"
            className="ml-2 bg-[#facc15] hover:bg-[#eab308] text-black font-bold py-2 px-4 rounded-md"
          >
            ADD TASK
          </button>
        </form>

        <ul className="mt-6 space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-[#1e1b1b] p-3 rounded-md"
            >
              <button
                onClick={() => handleUpdateTasksStatus(task.id)}
                className={`text-left text-white ${
                  task.status === "completed"
                    ? "line-through "
                    : ""
                }`}
              >
                {task.title}
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-white bg-purple-400 p-2 rounded-lg text-lg"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default App;
