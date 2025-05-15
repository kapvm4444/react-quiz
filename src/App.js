import React, { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import FinishScreen from "./components/FinishScreen";

const initialState = {
  questions: [],
  status: "loading", // Initial Status
  //"loading" (while questions are loading),
  // "error" (If any error occurs),
  // "ready" (When we are ready to start the quiz),
  // "active" (When QUiz is ongoing),
  // "finished" (when quiz is finished)
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        status: "ready",
        questions: action.payload,
      };
    case "dataError":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "answer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return { ...state, status: "finished", index: 0, answer: null };

    default:
      throw new Error("Unknown Action");
  }
}

export default function App() {
  // noinspection JSCheckFunctionSignatures
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const numQuestions = questions.length;
  const maxPoints = questions.reduce(
    (total, curQues) => total + curQues.points,
    0,
  );

  useEffect(function () {
    // noinspection JSCheckFunctionSignatures
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataError" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {/*Loading animation*/}
        {status === "loading" && <Loader />}

        {/*Error screen if error occurs*/}
        {status === "error" && <Error />}

        {/*when data is loaded and our questions are ready to serve*/}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}

        {/*When User started the quiz*/}
        {status === "active" && (
          <>
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              numQuestions={numQuestions}
              answer={answer}
              index={index}
            />
          </>
        )}

        {/*When User finished the quiz*/}
        {status === "finished" && (
          <>
            <FinishScreen maxPoints={maxPoints} points={points} />
          </>
        )}
      </Main>
    </div>
  );
}
