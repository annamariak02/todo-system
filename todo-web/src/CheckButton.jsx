import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function CheckButton({ handleTodoClick }) {
  const [checked, setChecked] = useState(true);

  if (checked) {
    return (
      <button
        id="unchecked"
        onClick={function (event) {
          setChecked(false);
          handleTodoClick();
        }}
      ></button>
    );
  }

  return (
    <button
      id="checked"
      onClick={function (event) {
        setChecked(true);
        handleTodoClick();
      }}
    >
      <FontAwesomeIcon id="checkmark" icon={faCheckCircle}></FontAwesomeIcon>
    </button>
  );
}