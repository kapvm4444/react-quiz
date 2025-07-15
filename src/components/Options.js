import React from "react";
import { useQuiz } from "../context/QuizContext";

export default function Options({ question }) {
  const { dispatch, answer } = useQuiz();

  const hasAnswered = answer !== null;

  return (
    <div className={"options"}>
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option 
          ${answer === index ? "answer" : ""} 
          ${
            hasAnswered
              ? question.correctOption === index
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          onClick={() => dispatch({ type: "answer", payload: index })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
