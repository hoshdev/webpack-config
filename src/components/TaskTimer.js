import React, { useState } from "react";

import "./TaskTimer.scss";

const TaskTimer = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [activeTask, setActiveTask] = useState(null);
  const [timers, setTimers] = useState({});

  // Add a new task
  const addTask = () => {
    if (taskName.trim() === "") return;

    setTasks([...tasks, taskName]);
    setTimers({ ...timers, [taskName]: 0 });
    setTaskName("");
  };

  // Start timer for a task
  const startTimer = (task) => {
    if (activeTask) return;

    setActiveTask(task);
    const timerId = setInterval(() => {
      setTimers((prev) => ({ ...prev, [task]: prev[task] + 1 }));
    }, 1000);

    setTimers((prev) => ({ ...prev, [`${task}-id`]: timerId }));
  };

  // Stop timer for active task
  const stopTimer = () => {
    if (!activeTask) return;

    clearInterval(timers[`${activeTask}-id`]);
    setActiveTask(null);
  };

  return (
    <div className="container">
      <h1>Task Timer</h1>
      <div className="addTask">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task name"
          className="input"
        />
        <button onClick={addTask} className="button">
          Add Task
        </button>
      </div>
      <ul className="taskList">
        {tasks.map((task, index) => (
          <li key={index} className="taskItem">
            <span>{task}</span>
            <span>{timers[task]}s</span>
            <button
              onClick={() => startTimer(task)}
              disabled={activeTask && activeTask !== task}
              style={styles.timerButton}
            >
              {activeTask === task ? "Running..." : "Start"}
            </button>
          </li>
        ))}
      </ul>
      {activeTask && (
        <button
          onClick={stopTimer}
          className="button"
          style={{ marginTop: "20px" }}
        >
          Stop Timer
        </button>
      )}
    </div>
  );
};

// Estilos en línea
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  addTask: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "300px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#42a5f5",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
  taskList: {
    listStyle: "none",
    padding: "12px",
  },
  taskItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  timerButton: {
    padding: "5px 10px",
    fontSize: "14px",
    cursor: "pointer",
    backgroundColor: "#ff9800",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
};

export default TaskTimer;
