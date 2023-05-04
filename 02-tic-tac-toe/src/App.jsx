import Square from './components/Square.jsx'
import { TURNS, GAME_STATUS } from './constants.js'
import { useBoard } from './hooks/useBoard.js'

function App() {
  const { updateBoard, resetGame, board, turn, gameStatus, winner } = useBoard()

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
