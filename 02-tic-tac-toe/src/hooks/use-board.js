import confetti from 'canvas-confetti'
import { useState } from 'react'

const Config = {
  SESSION_DATA_KEYS: {
    board: 'board',
    gameStatus: 'game_status',
    turn: 'turn'
  },
  TURNS: {
    x: '❌',
    o: '⚪'
  },
  GAME_STATUS: {
    playing: 'playing',
    tie: 'tie',
    end: 'end'
  },
  POSIBLE_WINNERS: {
    x: '❌',
    o: '⚪',
    n: '🟦'
  },
  WINNER_COMBOS: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
}

export const useBoard = () => {
  const { SESSION_DATA_KEYS, TURNS, GAME_STATUS, POSIBLE_WINNERS, WINNER_COMBOS } = Config

  const checkBoardFull = (board) => !!board.every((elem) => elem !== null)

  const isGameEnd = (board, gameStatus) =>
    checkBoardFull(board) || gameStatus === GAME_STATUS.tie || gameStatus === GAME_STATUS.end

  const [board, setBoard] = useState(() => {
    const lastSessionBoard = window.localStorage.getItem(SESSION_DATA_KEYS.board)

    if (!lastSessionBoard) {
      return Array(9).fill(null)
    }

    const initBoard = JSON.parse(lastSessionBoard)
    const gameStatusLastSession = window.localStorage.getItem(SESSION_DATA_KEYS.gameStatus)

    if (isGameEnd(initBoard, gameStatusLastSession)) {
      return Array(9).fill(null)
    }

    return initBoard
  })

  const [turn, setTurn] = useState(() => {
    return window.localStorage.getItem(SESSION_DATA_KEYS.turn) ?? TURNS.x
  })

  const [gameStatus, setGameStatus] = useState(GAME_STATUS.playing)
  const [winner, setWinner] = useState(POSIBLE_WINNERS.n)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setGameStatus(GAME_STATUS.playing)
    setWinner(POSIBLE_WINNERS.n)
    window.localStorage.clear()
  }

  const updateBoard = (index) => {
    if (isSquareFilled(board, index) || hasGameFinished(gameStatus)) return

    const newBoard = board.map((elem, i) => (!elem && index === i ? turn : elem))
    setBoard(newBoard)

    if (!checkWinner(newBoard, turn) && checkBoardFull(newBoard)) {
      setGameStatus(GAME_STATUS.tie)
      setWinner(POSIBLE_WINNERS.n)
      setTurn(TURNS.x)
      window.localStorage.clear()
      return
    }

    if (checkWinner(newBoard, turn)) {
      const winner = turn === POSIBLE_WINNERS.x ? POSIBLE_WINNERS.x : POSIBLE_WINNERS.o

      setGameStatus(GAME_STATUS.end)
      setWinner(winner)
      setTurn(winner)

      window.localStorage.clear()

      confetti()
      return
    }

    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
    setTurn(newTurn)

    saveStateToLocalStorage(newTurn, newBoard)
  }

  const saveStateToLocalStorage = (newTurn, newBoard) => {
    window.localStorage.setItem(SESSION_DATA_KEYS.turn, newTurn)

    window.localStorage.setItem(SESSION_DATA_KEYS.board, JSON.stringify(newBoard))
  }

  const checkWinner = (board, turn) => {
    return WINNER_COMBOS.some((combination) => {
      const [x, y, z] = combination
      return board[x] === turn && board[y] === turn && board[z] === turn
    })
  }

  const hasGameFinished = (gameStatus) =>
    gameStatus === GAME_STATUS.end || gameStatus === GAME_STATUS.tie

  const isSquareFilled = (board, index) => !!board[index]

  const isTurnOfX = () => turn === TURNS.x
  const isTurnOfO = () => turn === TURNS.o

  const isGameStatusPlaying = () => gameStatus !== GAME_STATUS.playing
  const isGameStatusEnd = () => gameStatus === GAME_STATUS.end
  const isGameStatusTie = () => gameStatus === GAME_STATUS.tie

  const playerX = Config.TURNS.x
  const playerO = Config.TURNS.o

  return {
    updateBoard,
    resetGame,
    isTurnOfX,
    isTurnOfO,
    isGameStatusPlaying,
    isGameStatusEnd,
    isGameStatusTie,
    board,
    winner,
    playerX,
    playerO
  }
}
