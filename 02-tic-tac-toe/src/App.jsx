import Square from './components/Square.jsx'
import { useBoard } from './hooks/use-board.js'
function App() {
  const {
    updateBoard,
    resetGame,
    isTurnOfX,
    isTurnOfO,
    isGameStatusPlaying,
    isGameStatusEnd,
    isGameStatusTie,
    board,
    playerX,
    playerO,
    winner,
  } = useBoard()

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
        <Square isSelected={isTurnOfX()}>{playerX}</Square>
        <Square isSelected={isTurnOfO()}>{playerO}</Square>
      </section>

      <section className="game-info">
        {isGameStatusEnd() && <span>¡Ganador {winner}!</span>}
        {isGameStatusTie() && <span>¡Empate!</span>}
        {isGameStatusPlaying() && (
          <button onClick={resetGame}>Reiniciar</button>
        )}
      </section>
    </main>
  )
}

export default App
