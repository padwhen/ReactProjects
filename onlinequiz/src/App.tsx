import { useState } from "react"
import "./App.css"

type Question = {
    prompt: string,
    correctAnswer: string,
    answers: string[]
}

const questions: Question[] = [
  {
    prompt: "What color is the sky",
    correctAnswer: "blue",
    answers: ["blue", "green", "yellow", "red"]
  }, 
  {
    prompt: "Kaksi plus kolme on?",
    correctAnswer: "viisi",
    answers: ["yks", "kaks", "viisi", "kuusi"]
  }, 
]

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [score, setScore] = useState(0)
  const currentQuestion = questions[currentQuestionIndex]
  const isGameOver = currentQuestionIndex >= questions.length;

  function Quiz() {
    return <>
    <h1>{currentQuestion.prompt}</h1>
      <form className="quiz-form" onSubmit={(e) => {
        e.preventDefault()
        if (selectedAnswer === currentQuestion.correctAnswer) {
          setScore(score + 1)
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      }}>
      {currentQuestion.answers.map((answer) => {
        return <label key={answer}> 
          <input onChange={() => setSelectedAnswer(answer)}
          type="radio" name="answer" checked={answer === selectedAnswer}></input>{answer}
          </label>
      })}
      <button>Submit</button>
      </form>
    </>
  }

  function ScoreScreen() {
    const numberOfWrongAnswer = questions.length - score
    return <>
    Your score is {score}, you got {numberOfWrongAnswer} wrongs
    </>
  }
  return (
    <div className="page">
      {isGameOver ? <ScoreScreen />: 
      <Quiz /> }
    </div>
  )
}

export default App;