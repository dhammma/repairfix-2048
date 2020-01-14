import { handleActions } from "redux-actions";
import { compose } from "redux";
import max from "lodash/max";
import range from "lodash/range";
import random from "lodash/random";
import flatten from "lodash/flatten";

import * as Actions from "./actions";

const initialState = {
  gameSize: 4,
  isGameStarted: false,
  isGameFinished: false,
  game: null,
  score: 0
};

function generateField(gameSize) {
  return range(0, gameSize * gameSize).map(id => ({
    key: id,
    value: null
  }));
}

function addNewTile(game) {
  // here we have a problem with 10%/90% rules because we are using random function in other places
  // we can fix it by using independent random function fot this line
  const r = random(0, 9);
  const value = r === 0 ? 4 : 2;
  const emptyPositions = game
    .filter(item => item.value === null)
    .map(item => item.key);

  if (emptyPositions.length === 0) {
    return game;
  }
  const randomEmptyPosition =
    emptyPositions[random(0, emptyPositions.length - 1)];

  const nextGame = game.map(item => {
    if (item.key === randomEmptyPosition) {
      return {
        ...item,
        value
      };
    }

    return item;
  });

  return nextGame;
}

function moveRowLeft(row) {
  const nextRow = [
    ...row.filter(item => item.value !== null),
    ...row.filter(item => item.value === null)
  ];

  for (let i = 0; i < row.length - 1; i++) {
    if (
      nextRow[i].value !== null &&
      nextRow[i].value === nextRow[i + 1].value
    ) {
      nextRow[i] = {
        ...nextRow[i],
        value: nextRow[i].value * 2
      };
      nextRow[i + 1] = {
        ...nextRow[i + 1],
        value: null
      };
    }
  }

  return [
    ...nextRow.filter(item => item.value !== null),
    ...nextRow.filter(item => item.value === null)
  ];
}

function moveLeft(game) {
  const rows = [];
  const N_SIZE = game.length ** 0.5;

  for (let i = 0; i < N_SIZE; i++) {
    rows.push(game.slice(i * N_SIZE, i * N_SIZE + N_SIZE));
  }

  for (let i = 0; i < N_SIZE; i++) {
    rows[i] = moveRowLeft(rows[i]);
  }

  return flatten(rows);
}

function isGameChanged(gameA, gameB) {
  const N_SIZE = gameA.length ** 0.5;

  for (let i = 0; i < N_SIZE * N_SIZE; i++) {
    if (gameA[i].value !== gameB[i].value) {
      return true;
    }
  }

  return false;
}

function reverseHorizontally(game) {
  const rows = [];
  const N_SIZE = game.length ** 0.5;

  for (let i = 0; i < N_SIZE; i++) {
    rows.push(game.slice(i * N_SIZE, i * N_SIZE + N_SIZE).reverse());
  }

  return flatten(rows);
}

function moveRight(game) {
  return compose(reverseHorizontally, moveLeft, reverseHorizontally)(game);
}

function transpose(game) {
  const columns = [];
  const N_SIZE = game.length ** 0.5;

  for (let i = 0; i < N_SIZE; i++) {
    const col = [];

    for (let j = 0; j < N_SIZE; j++) {
      col.push(game[j * N_SIZE + i]);
    }

    columns.push(col);
  }

  return flatten(columns);
}

function moveUp(game) {
  return compose(transpose, moveLeft, transpose)(game);
}

function moveDown(game) {
  return compose(transpose, moveRight, transpose)(game);
}

function calculateGameSum(game) {
  return max(game.filter(item => item.value !== null).map(item => item.value));
}

function isGameFinished(game) {
  const emptyCells = game.filter(item => item.value === null);

  if (emptyCells.length > 0) {
    return false;
  }

  const moveDirections = [moveLeft, moveRight, moveUp, moveDown];

  return moveDirections.every(applyDirection => {
    const nextGame = applyDirection(game);

    return !isGameChanged(game, nextGame);
  });
}

function handleMove(moveFunc) {
  return state => {
    const nextGame = moveFunc(state.game);

    if (isGameChanged(state.game, nextGame)) {
      const gameWithTile = addNewTile(nextGame);
      return {
        ...state,
        game: gameWithTile,
        score: calculateGameSum(nextGame),
        isGameFinished: isGameFinished(gameWithTile)
      };
    }

    return state;
  };
}

export const reducer = handleActions(
  {
    [Actions.changeGameSize]: (state, { payload }) => ({
      ...state,
      gameSize: payload
    }),
    [Actions.createGame]: state => {
      return {
        ...state,
        score: 0,
        isGameStarted: true,
        isGameFinished: false,
        game: addNewTile(generateField(state.gameSize))
      };
    },
    [Actions.moveLeft]: handleMove(moveLeft),
    [Actions.moveRight]: handleMove(moveRight),
    [Actions.moveUp]: handleMove(moveUp),
    [Actions.moveDown]: handleMove(moveDown)
  },
  initialState
);
