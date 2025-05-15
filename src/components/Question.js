import React from "react";
import Options from "./Options";

export default function Question({ question, dispatch, answer }) {
  return (
    <div className="">
      <h4>
        {question.question} ({question.points} Points)
      </h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
