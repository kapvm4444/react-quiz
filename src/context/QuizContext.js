import { createContext, useContext, useEffect, useReducer } from "react";
import Error from "../components/Error";

const QuizContext = createContext(null);

const SECS_PER_QUES = 20;

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
  secondsRemaining: null,
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
        secondsRemaining: state.questions.length * SECS_PER_QUES,
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
    case "reset":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Unknown Action");
  }
}

function QuizProvider({ children }) {
  //=> Declaring the reducer
  //noinspection JSCheckFunctionSignatures
  const [
    { questions, status, index, answer, points, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  //=> Fetching the questions
  useEffect(function () {
    // noinspection JSCheckFunctionSignatures
    fetch("https://openapi.khush.pro/quiz")
      .then((res) => res.json())
      .then((data) => {
        //noinspection JSCheckFunctionSignatures
        dispatch({ type: "dataReceived", payload: data.data });
      })
      .catch((err) => dispatch({ type: "dataError" }));
  }, []);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce(
    (total, curQues) => total + curQues.points,
    0,
  );

  //=> Creating the context
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        secondsRemaining,
        dispatch,
        numQuestions,
        maxPoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

//=> using a hook for consuming the context
function useQuiz() {
  const quizContent = useContext(QuizContext);
  if (!quizContent)
    throw new Error("Quiz Context is used outside the provider scope");
  return quizContent;
}

export { QuizProvider, useQuiz };
