import styles from "./TaskTimer.module.scss";

const TaskHeader = ({
  taskName,
  onChange,
  onClickAdd,
}: {
  taskName: string;
  onChange: (value: string) => void;
  onClickAdd: () => void;
}) => {
  return (
    <div className={styles.addTask}>
      <input
        type="text"
        value={taskName}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter task name"
        className={styles.input}
      />
      <button onClick={onClickAdd} className={styles.button}>
        Add Task
      </button>
    </div>
  );
};

export default TaskHeader;
