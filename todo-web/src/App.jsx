import React, { useState, useRef, useMemo, useEffect } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();
  const [loaded, setLoaded] = useState(false)
  const activeTodosNr = useMemo(() => {
    return todos.filter((todo) => !todo.complete).length;
  });

  useEffect(() => {
    const stored = localStorage.getItem("todos")
    if (!stored) return
    const storedTodos = JSON.parse(stored)
    setTodos(storedTodos);
    setLoaded(true)
  }, []);

  useEffect(() => {
    if(!loaded) return
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function deleteTodo(id) {
    const newTodos = todos.filter((todo) => {
      return id !== todo.id;
    });
    setTodos(newTodos);
  }

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const name = inputRef.current.value;
      if (name === "") return;
      setTodos((prevTodos) => {
        return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
      });
      inputRef.current.value = null;
    }
  };
  return (
    <>
      <h1>todos</h1>
      <TodoInput inputRef={inputRef} onKeyDown={handleKeyDown} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      <div>{activeTodosNr} items left</div>
    </>
  );
}

export default App;
