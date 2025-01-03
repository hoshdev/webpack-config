import React, { useState } from "react";

import styles from "./TaskTimer.module.scss";
import TaskList from "./TaskList";
import Title from "./Title";

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
      <Title title={"Task Timer"} />
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
      <TaskList
        tasks={tasks}
        onClick={(task) => startTimer(task)}
        timers={timers}
        activeTask={activeTask}
      />

      {activeTask && (
        <button onClick={stopTimer} className={styles.buttonStop}>
          Stop Timer
        </button>
      )}
    </div>
  );
};

export default TaskTimer;
