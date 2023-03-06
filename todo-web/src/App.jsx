import React, { useState, useRef, useMemo, useEffect } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
// import ButtonGroup from "./ButtonGroup";
import { v4 as uuidv4 } from "uuid";


function App() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();
  // const [tab, setTab] = useState('all')
  const activeTodosNr = useMemo(()=>{
    return Counter();
  })

  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem('todos'))
  setTodos(storedTodos)
  }, [])

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos), [todos])
  })
  // function active(){
  //   setTab('active')
  // }
  
  // function all(){
  //   setTab('all')
  // }

  // function completed(){
  //   setTab('completed')
  // }

  // function filterTodos(todo, tab){
  //   if (tab === 'all'){
  //     return true
  //   }
  //   else if (tab === 'active'){
  //     return !todo.complete
  //   }
  //   else if (tab === 'completed'){
  //     return todo.complete
  //   }
  // }

  function Counter(){
    return todos.filter((todo) => !todo.complete).length
  }

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
      {/* <ButtonGroup active={active} all={all} completed={completed} /> */}
    </>
  );
}

export default App;
