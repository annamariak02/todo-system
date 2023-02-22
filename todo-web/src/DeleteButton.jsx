import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function DeleteButton() {
  return (
    <div>
      <button id="delete">
        <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
      </button>
    </div>
  );
}
