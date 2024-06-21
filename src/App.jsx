import { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [player1Choice, setPlayer1Choice] = useState('')
  const [player2Choice, setPlayer2Choice] = useState('')
  const [player1Points, setPlayer1Points] = useState(0)
  const [player2Points, setPlayer2Points] = useState(0)
  const [turnResult, setTurnResult] = useState(null)
  const [result, setResult] = useState('Let\'s see who wins')
  const [gameOver, setGameOver] = useState(false)
  const [player1HasChosen, setPlayer1HasChosen] = useState(false)
  const [player2HasChosen, setPlayer2HasChosen] = useState(false)
  const choices = ['rock', 'paper', 'scissors']

  const handleClick = (player, value) => {
    if (player === 'player1') {
      setPlayer1Choice(value)
      setPlayer1HasChosen(true)
    } else {
      setPlayer2Choice(value)
      setPlayer2HasChosen(true)
    }
  }

  const reset = () => {
    window.location.reload()
  }

  useEffect(() => {
    if (player1HasChosen && player2HasChosen) {
      const comboMoves = player1Choice + player2Choice
      if (player1Points < 5 && player2Points < 5) {
        if (comboMoves === 'scissorspaper' || comboMoves === 'rockscissors' || comboMoves === 'paperrock') {
          const updatedplayer1Points = player1Points + 1
          setPlayer1Points(updatedplayer1Points)
          setTurnResult('Player 1 gets the point!')
          if (updatedplayer1Points === 5) {
            setResult('Player 1 Wins')
            setGameOver(true)
          }
        }

        if (comboMoves === 'paperscissors' || comboMoves === 'scissorsrock' || comboMoves === 'rockpaper') {
          const updatedplayer2Points = player2Points + 1
          setPlayer2Points(updatedplayer2Points)
          setTurnResult('Player 2 gets the point!')
          if (updatedplayer2Points === 5) {
            setResult('Player 2 Wins')
            setGameOver(true)
          }
        }

        if (comboMoves === 'paperpaper' || comboMoves === 'rockrock' || comboMoves === 'scissorsscissors') {
          setTurnResult('No one gets a point!')
        }

        // Reset choices and readiness for next turn
        setPlayer1HasChosen(false)
        setPlayer2HasChosen(false)
      }
    }
  }, [player1HasChosen, player2HasChosen, player1Choice, player2Choice, player1Points, player2Points])

  return (
    <div className="App">
      <h1 className='heading'>Rock-Paper-Scissors</h1>
      <div className='score'>
        <h1>Player 1 Points: {player1Points}</h1>
        <h1>Player 2 Points: {player2Points}</h1>
      </div>

      <div className='choice'>
        <div className='choice-player1'>
          <h2>Player 1 Choice</h2>
          <div className='image-container'>
            {player1Choice && <img className='player1-hand' src={`../images/${player1Choice}.png`} alt=''></img>}
          </div>
          <div className='button-div'>
            {choices.map((choice, index) =>
              <button className='button' key={index} onClick={() => handleClick('player1', choice)} disabled={gameOver || player1HasChosen}>
                {choice}
              </button>
            )}
          </div>
        </div>
        <div className='choice-player2'>
          <h2>Player 2 Choice</h2>
          <div className='image-container'>
            {player2Choice && <img className='player2-hand' src={`../images/${player2Choice}.png`} alt=''></img>}
          </div>
          <div className='button-div'>
            {choices.map((choice, index) =>
              <button className='button' key={index} onClick={() => handleClick('player2', choice)} disabled={gameOver || player2HasChosen}>
                {choice}
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className='result'>
        <h1>Turn Result: {turnResult}</h1>
        <h1>Final Result: {result}</h1>
      </div>
      
      <div className='button-div'>
        {gameOver && 
          <button className='button' onClick={() => reset()}>Restart Game?</button>
        }
      </div>
    </div>
  )
}

export default App
