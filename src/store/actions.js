import { createAction } from "redux-actions";

export const createGame = createAction("CREATE_GAME");

export const moveUp = createAction("MOVE_UP");
export const moveRight = createAction("MOVE_RIGHT");
export const moveDown = createAction("MOVE_DOWN");
export const moveLeft = createAction("MOVE_LEFT");
