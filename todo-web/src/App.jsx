import React, { useState, useRef, useEffect } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

// const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  // const [loaded, setLoaded] = useState(false);
  const inputRef = useRef();

  // useEffect(() => {
  //   const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (storedTodos) setTodos(storedTodos);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  // }, [todos]);

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
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
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <div>{todos.filter(todo => !todo.complete).length} items left</div>
    </>
  );
}

export default App;
