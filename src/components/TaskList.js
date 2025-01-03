import React from "react";

import styles from "./TaskTimer.module.scss";

const TaskList = ({ tasks, onClick, timers, activeTask }) => {
  return (
    <ul className={styles.taskList}>
      {tasks.map((task, index) => (
        <li key={index} className={styles.taskItem}>
          <span>{task}</span>
          <span>{timers[task]}s</span>
          <button
            onClick={() => onClick(task)}
            disabled={activeTask && activeTask !== task}
            className={styles.timerButton}
          >
            {activeTask === task ? "Running..." : "Start"}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
