import React, { useState, useRef } from "react";

export default function TodoInput({ onKeyDown, inputRef }) {
  return (
    <div>
      <input
        ref={inputRef}
        id="input"
        type="text"
        placeholder="What needs to be done?"
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
