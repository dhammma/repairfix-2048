import React from "react";
import { useSelector } from "react-redux";
import FlipMove from "react-flip-move";

import { Tile } from "../Tile";
import styles from "./Game.module.scss";

const FLIP_DURATION = 750;

const Game = () => {
  const isGameStarted = useSelector(state => state.isGameStarted);
  const game = useSelector(state => state.game);

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
