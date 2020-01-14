import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlipMove from "react-flip-move";
import { useSwipeable } from "react-swipeable";

import { Tile } from "../Tile";
import * as Actions from "../../store/actions";
import styles from "./Game.module.scss";

const keyActionsMap = {
  ArrowUp: Actions.moveUp,
  ArrowRight: Actions.moveRight,
  ArrowDown: Actions.moveDown,
  ArrowLeft: Actions.moveLeft
};

const swipeActionsMap = {
  Left: Actions.moveLeft,
  Up: Actions.moveUp,
  Right: Actions.moveRight,
  Down: Actions.moveDown
};

const FLIP_DURATION = 150;

const Game = () => {
  const dispatch = useDispatch();
  const isGameStarted = useSelector(state => state.isGameStarted);
  const game = useSelector(state => state.game);
  const gameSize = useSelector(state => state.gameSize);
  const handlers = useSwipeable({
    onSwiped: event => {
      const actionCreator = swipeActionsMap[event.dir];

      if (actionCreator) {
        dispatch(actionCreator());
      }
    }
  });

  useEffect(() => {
    function handleKeyPress(event) {
      const actionCreator = keyActionsMap[event.key];

      if (actionCreator) {
        dispatch(actionCreator());
      }
    }

    if (isGameStarted) {
      window.addEventListener("keydown", handleKeyPress);
    } else {
      window.removeEventListener("keydown", handleKeyPress);
    }

    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [isGameStarted, dispatch]);

  if (!isGameStarted) {
    return null;
  }

  return (
    <>
      <div className={styles.Game} {...handlers}>
        <FlipMove duration={FLIP_DURATION} easing="linear">
          {game.map(item => (
            <Tile key={item.key} item={item} size={gameSize} />
          ))}
        </FlipMove>
      </div>
      <p className={styles.Description}>
        <b>HOW TO PLAY:</b> Use your <b>arrow keys</b> to move the tiles. When
        two tiles with the same number touch, they merge into one!
      </p>
    </>
  );
};

export { Game };
