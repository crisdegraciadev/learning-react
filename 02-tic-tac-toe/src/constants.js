export const TURNS = {
  x: 'X',
  o: 'O',
}

export const GAME_STATUS = {
  playing: 'playing',
  tie: 'tie',
  end: 'end',
}

export const POSIBLE_WINNERS = {
  ...TURNS,
  n: 'N',
}

export const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]
