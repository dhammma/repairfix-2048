import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Actions from "../../store/actions";

const Controls = () => {
  const dispatch = useDispatch();
  const isGameStarted = useSelector(state => state.isGameStarted);
  const score = useSelector(state => state.score);

  useEffect(() => {
    dispatch(Actions.createGame());
  }, [dispatch]);

  const startGame = () => dispatch(Actions.createGame());

  return (
    <div>
      {!isGameStarted && <button onClick={startGame}>Start</button>}
      {isGameStarted && <div>Game score: {score}</div>}
    </div>
  );
};

export { Controls };
