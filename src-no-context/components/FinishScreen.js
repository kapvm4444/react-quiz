import React from "react";

export default function FinishScreen({ points, maxPoints }) {
  const percentage = Math.round((points / maxPoints) * 100);

  let emoji;
  if (percentage === 100) emoji = "🏅";
  else if (percentage >= 80 && percentage < 100) emoji = "🎉";
  else if (percentage >= 50 && percentage < 80) emoji = "🙃";
  else if (percentage >= 0 && percentage < 50) emoji = "🤔";
  else if (percentage === 0) emoji = "🤦‍♂️";

  const data = localStorage.getItem("maxScore");
  let message = `High Score is: ${data}`;
  if (!data || data <= points) {
    message = `You just hit the high score: ${points} (You are already getting better)`;
    localStorage.setItem("maxScore", points);
  }

  return (
    <>
      <p className={"result"}>
        {emoji} You scored <strong>{points}</strong> out of {maxPoints} (
        {percentage}%)
      </p>

      <p
        style={{
          display: "block",
          textAlign: "center",
          fontSize: "1.5rem",
          marginBottom: "5rem",
        }}
      >
        ({message})
      </p>
    </>
  );
}
