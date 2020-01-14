import React from "react";
import { useSelector } from "react-redux";

import { Controls } from "./components/Controls";
import { StartScreen } from "./components/StartScreen";
import { Game } from "./components/Game";

import styles from "./App.module.scss";

function App() {
  const isGameStarted = useSelector(state => state.isGameStarted);
  const isGameFinished = useSelector(state => state.isGameFinished);

  return (
    <div className={styles.App}>
      {isGameStarted && <Controls />}
      {!isGameStarted && <StartScreen />}
      {isGameStarted && <Game />}
    </div>
  );
}

export default App;
