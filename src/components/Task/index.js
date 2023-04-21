import "./Task.css";

const Task = ({ task, updateTasksCallback, deleteTask }) => {
  const handleChange = (event) => {
    updateTasksCallback(task.id, event.target.checked);
  };

  const handleClick = () => {
    // add more stuff
    deleteTask(task.id);
  };

  return (
    <div>
      <span
        style={
          task.completed
            ? {
                textDecoration: "line-through",
                color: "grey",
              }
            : {}
        }
      >
        {task.text}
      </span>
      <input type="checkbox" onChange={handleChange} checked={task.completed} />
      <img
        className="delete-icon"
        src="icons8-trash-can.svg"
        alt="trash can delete icon"
        onClick={handleClick}
      />
    </div>
  );
};

export default Task;
