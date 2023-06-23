import { useRef, useState, useEffect } from "react";
import style from "./todo.module.css";
import { Ttodo } from "../../utils/types";
import Task from "../task/Task";

export default function ToDoList() {
  const newTodoInputElem = useRef<HTMLInputElement>(null);
  const [todoList, setTodoList] = useState<Ttodo[]>([]);

  const someCompletedTasks = todoList.some((i) => i.completed === true);

  function updateTodos(todos: Ttodo[]) {
    localStorage.setItem('todos', JSON.stringify(todos))
    setTodoList(todos);
  }

  function addTodo(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!newTodoInputElem.current) return;

    const newTodo = {
      id: Date.now().toString(),
      title: newTodoInputElem.current.value,
      completed: false,
    };

    const todosCopy = [...todoList, newTodo];
    updateTodos(todosCopy);

    // Clean input
    newTodoInputElem.current.value = ''
  }

  function updateTaskStatus(taskId: string, status: boolean) {
    const todosCopy = [...todoList];
    const index = todosCopy.findIndex((i) => i.id === taskId);
    if (index === -1) {
      // SHOW AN ERROR
    }

    todosCopy[index].completed = status;
    console.log(todosCopy);
    updateTodos(todosCopy);
  }

  function removeCompletedTasks() {
    const pendingTodos = todoList.filter((i) => i.completed === false);
    updateTodos(pendingTodos);
  }

  useEffect(() => {
    const localTodos = localStorage.getItem('todos')
    if (localTodos)
        setTodoList(JSON.parse(localTodos))
  }, [])

  return (
    <section className={style.section}>
      <h1>TODO List</h1>
      <form>
        <input ref={newTodoInputElem} placeholder="Describe your task..." />
        <button type="submit" onClick={addTodo}>
          Add Todo
        </button>
      </form>
      {todoList.length > 0
        ? todoList.map((todo) => (
            <Task
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
              updateTaskStatus={updateTaskStatus}
            />
          ))
        : "Nothing to do atm 😁"}

      {someCompletedTasks ? (
        <button type="button" onClick={removeCompletedTasks}>
          Remove completed
        </button>
      ) : (
        ""
      )}
    </section>
  );
}
