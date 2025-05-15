import React from "react";

export default function Progress({
  numQuestions,
  index,
  points,
  maxPoints,
  answer,
}) {
  return (
    <div className={"progress"}>
      <progress max={numQuestions} value={index + Number(answer !== null)} />

      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPoints} Points
      </p>
    </div>
  );
}
