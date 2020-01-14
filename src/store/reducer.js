import { handleActions } from "redux-actions";
import range from "lodash/range";
import shuffle from "lodash/shuffle";
import random from "lodash/random";

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
  const r = random(0, 9);
  const value = r === 0 ? 4 : 2;
  const emptyPositions = game
    .filter(item => item.value === null)
    .map(item => item.key);
  const randomEmptyPosition = emptyPositions[random(0, emptyPositions.length)];

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
        game: shuffle([...state.game])
      };
    }
  },
  initialState
);
