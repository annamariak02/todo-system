import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function CheckButton() {
  const [checked, setChecked] = useState(false);

  if (checked) {
    return <button id="unchecked" onClick={() => setChecked(false)}></button>;
  }

  return (
    <button id="checked" onClick={() => setChecked(true)}>
      <FontAwesomeIcon id="checkmark" icon={faCheckCircle}></FontAwesomeIcon>
    </button>
  );
}
