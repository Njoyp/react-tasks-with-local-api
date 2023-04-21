import { useState, useEffect } from "react"; // state hook
import "./App.css";
import Task from "./components/Task";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ text: "", completed: false });

  useEffect(() => {
    fetch("http://localhost:3030/tasks")
      .then((res) => res.json()) //ignore this, this needs to be here
      .then((data) => setTasks(data)); // get the data from json
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch("http://localhost:3030/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);

    setTask({ text: " ", completed: false }); // reset the input field
  };

  const updateTasks = async (taskId, value) => {
    const res = await fetch(`http://localhost:3030/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: value }),
    });

    const updatedTask = await res.json();

    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
  };
  const deleteTask = async (taskId) => {
    await fetch(`http://localhost:3030/tasks/${taskId}`, {
      method: "DELETE",
    });

    const filteredTasks = tasks.filter((item) => item.id !== taskId);
    setTasks(filteredTasks);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          onChange={handleChange}
          value={task.text}
        />
        <button>add task</button>
      </form>

      {tasks.map((item) => {
        return (
          <Task
            task={item}
            key={item.id}
            updateTasks={updateTasks}
            deleteTask={deleteTask}
          />
        );
      })}
    </div>
  );
}

export default App;
