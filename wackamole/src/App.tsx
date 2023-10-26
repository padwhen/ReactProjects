import { useEffect, useState } from "react";
import "./App.css"
import hole from './assets/hole.png'
import mole from './assets/mole.png'

function App() {
  const [score, setScore] = useState(0);
  const [moles, setMoles] = useState<boolean[]>(new Array(9).fill(false))

  function setMoleVisibility(index: number, isVisible: boolean) {
    setMoles((curMoles) => {
      const newMoles = [...curMoles]
      newMoles[index] = true;
      return newMoles
    })
  }

  function wackMole(index: number) {
    setMoleVisibility(index, false)
    setScore((score) => score + 1)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moles.length);
      setMoleVisibility(randomIndex, true)
      setTimeout(() => {
        setMoleVisibility(randomIndex, false)
      }, 700)
    }, 1000);
    return () => {
      clearInterval(interval)
    }
  }, [moles])

  return (
    <>
    <h1>Score {score}</h1>
    <div className="grid">
      {moles.map((isMole, index) => <img key={index} src={isMole ? mole : hole} 
        onClick={() => {wackMole(index)}}
      />)}
    </div>
    </>
  );
}

export default App;