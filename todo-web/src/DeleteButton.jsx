import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function DeleteButton({ handleDelete }) {
  return (
    <div>
      <button id="delete" onClick={handleDelete}>
        <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
      </button>
    </div>
  );
}
