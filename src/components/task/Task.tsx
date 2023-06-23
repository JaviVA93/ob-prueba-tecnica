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
    <div>
      <span>{title}</span>
      <div>
        <span>Status:</span>
        <span>{completed ? "COMPLETED" : "IN PROGRESS"}</span>
        <button
          type="button"
          onClick={handleCompleted}
        >
          {completed ? "Mark as pending" : "Mark as done"}
        </button>
      </div>
    </div>
  );
}
