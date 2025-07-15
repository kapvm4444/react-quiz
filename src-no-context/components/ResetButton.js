import React from "react";

export default function ResetButton({ dispatch }) {
  return (
    <button
      className={"btn btn-ui"}
      onClick={() => dispatch({ type: "reset" })}
      style={{ display: "block", margin: "auto" }}
    >
      Try Again
    </button>
  );
}
