import React, { useState } from "react";

import styles from "./TaskTimer.module.scss";

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
    <div className={styles.container}>
      <h1>Task Timer</h1>
      <div className={styles.addTask}>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task name"
          className={styles.input}
        />
        <button onClick={addTask} className={styles.button}>
          Add Task
        </button>
      </div>
      <ul className={styles.taskList}>
        {tasks.map((task, index) => (
          <li key={index} className={styles.taskItem}>
            <span>{task}</span>
            <span>{timers[task]}s</span>
            <button
              onClick={() => startTimer(task)}
              disabled={activeTask && activeTask !== task}
              className={styles.timerButton}
            >
              {activeTask === task ? "Running..." : "Start"}
            </button>
          </li>
        ))}
      </ul>
      {activeTask && (
        <button onClick={stopTimer} className={styles.buttonStop}>
          Stop Timer
        </button>
      )}
    </div>
  );
};

export default TaskTimer;
