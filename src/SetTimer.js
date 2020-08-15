import React from "react";

function SetTimer(props) {
  return (
    <div className="timer-container">
      <h2
        id={props.title === "Session Length" ? "session-label" : "break-label"}
      >
        {props.title}
      </h2>
      <div className="flex-container action-wrapper">
        <button
          id={
            props.title === "Session Length"
              ? "session-decrement"
              : "break-decrement"
          }
          onClick={props.handleDecrease}
        >
          <i className="fas fa-arrow-down"></i>
        </button>
        <span
          id={
            props.title === "Session Length" ? "session-length" : "break-length"
          }
        >
          {props.count}
        </span>
        <button
          id={
            props.title === "Session Length"
              ? "session-increment"
              : "break-increment"
          }
          onClick={props.handleIncrease}
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      </div>
    </div>
  );
}
export default SetTimer;
