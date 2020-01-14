import React from "react";
import { useSelector } from "react-redux";

import { Controls } from "./components/Controls";
import { StartScreen } from "./components/StartScreen";
import { Game } from "./components/Game";
import { GameResult } from "./components/GameResult";

import styles from "./App.module.scss";

function App() {
  const isGameStarted = useSelector(state => state.isGameStarted);
  const isGameFinished = useSelector(state => state.isGameFinished);

  const renderContent = () => {
    if (!isGameStarted) {
      return <StartScreen />;
    }

    if (!isGameFinished) {
      return (
        <>
          <Controls />
          <Game />
        </>
      );
    }

    return <GameResult />;
  };

  return <div className={styles.App}>{renderContent()}</div>;
}

export default App;
