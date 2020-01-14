import { handleActions } from "redux-actions";
import range from "lodash/range";

import * as Actions from "./actions";

const N_SIZE = 5;

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
    }
  },
  initialState
);
