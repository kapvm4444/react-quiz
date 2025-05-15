import React from "react";

export default function FinishScreen({ points, maxPoints }) {
  let emoji;
  if (points === 100) emoji = "🏅";
  else if (points >= 80 && points < 100) emoji = "🎉";
  else if (points >= 50 && points < 80) emoji = "🙃";
  else if (points >= 0 && points < 50) emoji = "🤔";
  else if (points === 0) emoji = "🤦‍♂️";

  const percentage = Math.round((points / maxPoints) * 100);

  return (
    <p className={"result"}>
      {emoji} You scored <strong>{points}</strong> out of {maxPoints} (
      {percentage}%)
    </p>
  );
}
