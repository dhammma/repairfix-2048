import { handleActions } from "redux-actions";
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

function moveLeft(game) {
  const rows = [];

  for (let i = 0; i < N_SIZE; i++) {
    rows.push(game.slice(i * N_SIZE, i * N_SIZE + N_SIZE));
  }

  for (let i = 0; i < N_SIZE; i++) {
    const nextRow = [
      ...rows[i].filter(item => item.value !== null),
      ...rows[i].filter(item => item.value === null)
    ];

    rows[i] = nextRow;
  }

  return flatten(rows);
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
      return {
        ...state,
        game: addNewTile(moveLeft(state.game))
      };
    }
  },
  initialState
);
