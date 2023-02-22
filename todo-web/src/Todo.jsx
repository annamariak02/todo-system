import React from "react";
import CheckButton from "./CheckButton";

export default function Todo({ todo }) {
  return <div>
    <label>
    {todo.name}
    </label>
  </div>;
}
