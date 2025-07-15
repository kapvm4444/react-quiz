import React from "react";

export default function NextButton({ dispatch, answer, index, numQuestions }) {
  return (
    <>
      {answer !== null &&
        (index !== numQuestions - 1 ? (
          <button
            className={"btn btn-ui"}
            onClick={() => dispatch({ type: "nextQuestion" })}
          >
            Next
          </button>
        ) : (
          <button
            className={"btn btn-ui"}
            onClick={() => dispatch({ type: "finished" })}
          >
            Finish
          </button>
        ))}
    </>
  );
}
