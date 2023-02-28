import React, { useState, useRef, useMemo } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
// import ButtonGroup from "./ButtonGroup";

function App() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();
  // const [tab, setTab] = useState('all')


  // function filterTodos(todos, tab) {
  //   return todos.filter(todo =>{
  //      if (tab === 'all'){
  //          return true
  //      }
  //      else if (tab === 'active'){
  //          return !todo.completed
  //      }
  //      else if (tab === 'completed'){
  //          return todo.completed
  //      }
  //   })
  //  }

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
      {/* <div>{todos.filter((todo) => !todo.complete).length} items left</div> */}
      {/* <ButtonGroup setTab={setTab} tab={tab} /> */}
    </>
  );
}

export default App;
