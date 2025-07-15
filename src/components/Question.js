import React from "react";
import Options from "./Options";
import { useQuiz } from "../context/QuizContext";

export default function Question() {
  const { questions, index } = useQuiz();
  const question = questions[index];

  return (
    <div className="">
      <h4>
        {question.question} ({question.points} Points)
      </h4>
      <Options question={question} />
    </div>
  );
}
