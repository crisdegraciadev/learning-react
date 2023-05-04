import { useState } from 'react'
import confetti from 'canvas-confetti'
import Square from './components/Square.jsx'
import {
  TURNS,
  GAME_STATUS,
  POSIBLE_WINNERS,
  WINNER_COMBOS,
} from './constants.js'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.x)
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.playing)
  const [winner, setWinner] = useState(POSIBLE_WINNERS.n)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setGameStatus(GAME_STATUS.playing)
    setWinner(POSIBLE_WINNERS.n)
  }

  const updateBoard = (index) => {
    if (canUpdateBoard(board, index, gameStatus)) return

    const newBoard = board.map((elem, i) =>
      !elem && index === i ? turn : elem
    )
    setBoard(newBoard)

    if (!checkWinner(newBoard, turn) && checkBoardFull(newBoard)) {
      setGameStatus(GAME_STATUS.tie)
      setWinner(POSIBLE_WINNERS.n)
    }

    if (checkWinner(newBoard, turn)) {
      setGameStatus(GAME_STATUS.end)
      setWinner(
        turn === POSIBLE_WINNERS.x ? POSIBLE_WINNERS.x : POSIBLE_WINNERS.o
      )
      confetti()
      return
    }

    setTurn(turn === TURNS.x ? TURNS.o : TURNS.x)
  }

  const checkWinner = (board, turn) => {
    return WINNER_COMBOS.some((combination) => {
      const [x, y, z] = combination
      return board[x] === turn && board[y] === turn && board[z] === turn
    })
  }

  const checkBoardFull = (board) => !!board.every((elem) => elem !== null)

  const canUpdateBoard = (board, index, gameStatus) =>
    board[index] ||
    gameStatus === GAME_STATUS.end ||
    gameStatus === GAME_STATUS.tie

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {board.map((elem, index) => (
          <Square key={index} updateBoard={updateBoard} index={index}>
            {elem}
          </Square>
        ))}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
      </section>

      <section className="game-info">
        {gameStatus === GAME_STATUS.end && <span>¡Ganador {winner}!</span>}
        {gameStatus === GAME_STATUS.tie && <span>¡Empate!</span>}
        {gameStatus !== GAME_STATUS.playing && (
          <button onClick={resetGame}>Reiniciar</button>
        )}
      </section>
    </main>
  )
}

export default App
