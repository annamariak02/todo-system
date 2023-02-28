import React, { useState } from "react";
import CheckButton from "./CheckButton";
import DeleteButton from "./DeleteButton";

export default function Todo({ todo, toggleTodo, deleteTodo }) {
  const [isShown, setIsShown] = useState(false);

  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  function handleDelete() {
    deleteTodo(todo.id);
  }
  return (
    <div
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      id="list"
    >
      <CheckButton toggleTodo={toggleTodo} handleTodoClick={handleTodoClick} />
      {todo.name}
      {isShown && (
        <DeleteButton deleteTodo={deleteTodo} handleDelete={handleDelete} />
      )}
    </div>
  );
}
