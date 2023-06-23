import { useRef, useState } from "react";
import style from "./todo.module.css";
import { Ttodo } from '../../utils/types'

export default function ToDo() {
  const newTodoInputElem = useRef<HTMLInputElement>(null);
  const [todoList, setTodoList] = useState<Ttodo[]>([]);

  function addTodo(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!newTodoInputElem.current)
        return

    const newTodo = { 
        title: newTodoInputElem.current.value,
        completed: false
    }

    const todosCopy = [...todoList, newTodo]
    setTodoList(todosCopy)
  }

  return (
    <section className={style.section}>
      <h1>TODO List</h1>
      <form>
        <input ref={newTodoInputElem} placeholder="Describe your task..." />
        <button type="submit" onClick={addTodo}>
          Add Todo
        </button>
      </form>
      {
        todoList.length > 0 
        ? todoList.map( todo => <div>
            <span>{todo.title}</span>
            <div>
                <span>Status:</span>
                <span>{(todo.completed ? 'COMPLETED' : 'IN PROGRESS')}</span>
            </div>
        </div>)
        : ""}
    </section>
  );
}
