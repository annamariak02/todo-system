import React, { useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

function App() {
  return (
    <>
      <h1>todos</h1>
      <TodoInput />
      <TodoList todos={todos} />
    </>
  );
}

export default App;
