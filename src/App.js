import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import FinishScreen from "./components/FinishScreen";
import Progress from "./components/Progress";
import ResetButton from "./components/ResetButton";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import { useQuiz } from "./context/QuizContext";

export default function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {/*Loading animation*/}
        {status === "loading" && <Loader />}

        {/*Error screen if error occurs*/}
        {status === "error" && <Error />}

        {/*when data is loaded and our questions are ready to serve*/}
        {status === "ready" && <StartScreen />}

        {/*When User started the quiz*/}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}

        {/*When User finished the quiz*/}
        {status === "finished" && (
          <>
            <FinishScreen />
            <ResetButton />
          </>
        )}
      </Main>
    </div>
  );
}
