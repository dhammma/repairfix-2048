import React from "react";

import { Controls } from "./components/Controls";
import { Game } from "./components/Game";

import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.App}>
      <Controls />
      <Game />
    </div>
  );
}

export default App;
