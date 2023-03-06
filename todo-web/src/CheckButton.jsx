import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

export default function CheckButton({ handleTodoClick }) {
  const Unchecked = styled.button`
      display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;

  width: 32px;
  height: 32px;
  border: 1px solid black;
  border-radius: 16px;
  `
  const Checked = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  

  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 16px;
  `
  const [checked, setChecked] = useState(true);

  if (checked) {
    return (
      <Unchecked
        onClick={function (event) {
          setChecked(false);
          handleTodoClick();
        }}
      ></Unchecked>
    );
  }

  return (
    <checked
      onClick={function (event) {
        setChecked(true);
        handleTodoClick();
      }}
    >
      <FontAwesomeIcon id="checkmark" icon={faCheckCircle}></FontAwesomeIcon>
    </checked>
  );
}
