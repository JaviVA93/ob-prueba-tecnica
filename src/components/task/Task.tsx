import style from "./task.module.css";

export default function Task(props: {
  updateTaskStatus: Function;
  id: string;
  title: string;
  completed: boolean;
}) {
  const { id, title, completed, updateTaskStatus } = props;
  function handleCompleted() {
    updateTaskStatus(id, !completed);
  }

  return (
    <div
      className={`${style.task} ${completed ? style.completed : style.pending}`}
    >
      <span className={style.taskTitle}>{title}</span>
      <div className={style.statusWrapper}>
        <span>Status:</span>
        <span className={style.status}>{completed ? "COMPLETED" : "IN PROGRESS"}</span>
      </div>
      <div className={style.buttonWrapper}>
        <button type="button" onClick={handleCompleted}>
          {completed ? "Mark as pending" : "Mark as done"}
        </button>
      </div>
    </div>
  );
}
