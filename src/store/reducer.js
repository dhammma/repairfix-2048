import { handleActions } from "redux-actions";
import range from "lodash/range";
import shuffle from "lodash/shuffle";

import { N_SIZE } from "../constants";
import * as Actions from "./actions";

const initialState = {
  isGameStarted: false,
  game: null
};

export const reducer = handleActions(
  {
    [Actions.createGame]: state => {
      return {
        ...state,
        isGameStarted: true,
        game: range(0, N_SIZE * N_SIZE).map(id => ({
          key: id,
          value: null
        }))
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