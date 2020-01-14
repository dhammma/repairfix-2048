import React from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Actions from "../../store/actions";
import styles from "./GameResult.module.scss";

const GameResult = () => {
  const dispatch = useDispatch();
  const score = useSelector(state => state.score);

  const startGame = () => {
    dispatch(Actions.createGame());
  };

  return (
    <div className={styles.GameResult}>
      <div className={styles.Greeting}>Your score: {score}</div>
      {/* <div className={styles.GameSettings}>
        <div className={styles.Label}>Game field size:</div>
        <div className={styles.InputWrapper}>
          <input value={gameSize} onChange={changeGameSize} />
        </div>
      </div> */}
      <button className={styles.StartButton} onClick={startGame}>
        New game
      </button>
    </div>
  );
};

export { GameResult };
