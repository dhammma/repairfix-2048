import { handleActions } from "redux-actions";
import { compose } from "redux";
import range from "lodash/range";
import random from "lodash/random";
import flatten from "lodash/flatten";

import { N_SIZE } from "../constants";
import * as Actions from "./actions";

const initialState = {
  isGameStarted: false,
  game: null
};

function generateField() {
  return range(0, N_SIZE * N_SIZE).map(id => ({
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

  for (let i = 0; i < N_SIZE - 1; i++) {
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

  for (let i = 0; i < N_SIZE; i++) {
    rows.push(game.slice(i * N_SIZE, i * N_SIZE + N_SIZE));
  }

  for (let i = 0; i < N_SIZE; i++) {
    rows[i] = moveRowLeft(rows[i]);
  }

  return flatten(rows);
}

function isGameChanged(gameA, gameB) {
  for (let i = 0; i < N_SIZE * N_SIZE; i++) {
    if (gameA[i].value !== gameB[i].value) {
      return true;
    }
  }

  return false;
}

function reverseHorizontally(game) {
  const rows = [];

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

export const reducer = handleActions(
  {
    [Actions.createGame]: state => {
      return {
        ...state,
        isGameStarted: true,
        game: addNewTile(generateField())
      };
    },
    [Actions.moveLeft]: state => {
      const nextGame = moveLeft(state.game);

      if (isGameChanged(state.game, nextGame)) {
        return {
          ...state,
          game: addNewTile(nextGame)
        };
      }

      return state;
    },
    [Actions.moveRight]: state => {
      const nextGame = moveRight(state.game);

      if (isGameChanged(state.game, nextGame)) {
        return {
          ...state,
          game: addNewTile(nextGame)
        };
      }

      return state;
    },
    [Actions.moveUp]: state => {
      const nextGame = moveUp(state.game);

      if (isGameChanged(state.game, nextGame)) {
        return {
          ...state,
          game: addNewTile(nextGame)
        };
      }

      return state;
    }
  },
  initialState
);
