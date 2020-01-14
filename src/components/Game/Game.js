import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlipMove from "react-flip-move";

import { Tile } from "../Tile";
import * as Actions from "../../store/actions";
import styles from "./Game.module.scss";

const keyActionsMap = {
  ArrowUp: Actions.moveUp,
  ArrowRight: Actions.moveRight,
  ArrowDown: Actions.moveDown,
  ArrowLeft: Actions.moveLeft
};

const FLIP_DURATION = 750;

const Game = () => {
  const dispatch = useDispatch();
  const isGameStarted = useSelector(state => state.isGameStarted);
  const game = useSelector(state => state.game);

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
    <div className={styles.Game}>
      <FlipMove duration={FLIP_DURATION} easing="cubic-bezier(.12,.36,.14,1.2)">
        {game.map(item => (
          <Tile key={item.key} item={item} />
        ))}
      </FlipMove>
    </div>
  );
};

export { Game };
