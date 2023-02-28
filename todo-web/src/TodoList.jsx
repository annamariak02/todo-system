import React, { useMemo } from "react";
import Todo from "./Todo";

export default function TodoList({ todos, toggleTodo, deleteTodo }) {
  // const visibleTodos =useMemo(()=>filterTodos(todos, tab), [todos, tab])
  // return visibleTodos.map((todo) => {
    return todos.map((todo)=>{
    return (
      <Todo
        key={todo.id}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        todo={todo}
        // tab={tab}
      />
    );
  });
}
