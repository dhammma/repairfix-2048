import React from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Actions from "../../store/actions";
import styles from "./StartScreen.module.scss";

const StartScreen = () => {
  const dispatch = useDispatch();
  const gameSize = useSelector(state => state.gameSize);

  const changeGameSize = event => {
    dispatch(Actions.changeGameSize(parseInt(event.target.value, 10)));
  };

  const startGame = () => {
    dispatch(Actions.createGame());
  };

  return (
    <div className={styles.StartScreen}>
      <div className={styles.Greeting}>Welcome to play in 2048</div>
      <div className={styles.GameSettings}>
        <div className={styles.Label}>Game field size:</div>
        <div className={styles.InputWrapper}>
          <input
            type="number"
            value={gameSize || ""}
            onChange={changeGameSize}
          />
        </div>
      </div>
      <button className={styles.StartButton} onClick={startGame}>
        Start game
      </button>
    </div>
  );
};

export { StartScreen };
