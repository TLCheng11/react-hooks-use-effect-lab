import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  useEffect(() => {
    let timerId = 0
    if (timeRemaining > 0) {
      timerId = setTimeout(() => {
        setTimeRemaining(timeRemaining => timeRemaining - 1)
      }, 1000)
    } else {
      setTimeRemaining(10)
      onAnswered(false)
    }

    return (() => clearTimeout(timerId))

  }, [timeRemaining])

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
