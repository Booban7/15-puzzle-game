import React, { useState } from "react";
import Board from "../Board/Board";
import styles from "./Game.module.scss";
import { quotes } from "../Commentator/quotes";

const GOAL_STATE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

const shuffleArray = (array: number[]) => {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const everyNthOccurrence = (occurrence: number, nth: number) =>
  occurrence % nth === 0;

everyNthOccurrence(20, 140);

const Game = () => {
  const [tiles, setTiles] = useState(shuffleArray([...GOAL_STATE]));
  const [counter, setCounter] = useState(0);

  const [currentQuote, setCurrentQuote] = useState({
    id: 0,
    text: "",
    author: "",
  });
  const [showQuote, setShowQuote] = useState(false);

  const handleClick = (index: number) => {
    // Find the index of the empty tile
    const emptyIndex = tiles.indexOf(0);

    // Increment the click counter
    const newCounter = counter + 1;
    setCounter(newCounter);

    // Check if it's the 20th click
    if (newCounter % 20 === 0) {
      // Get the next quote and update the current quote state
      const nextIndex = (newCounter / 20) % quotes.length;
      const nextQuote = quotes[nextIndex];
      setCurrentQuote(nextQuote);
      setShowQuote(true);
      setTimeout(() => {
        setShowQuote(false);
        setCurrentQuote({ id: 0, text: "", author: "" });
      }, 5000);
    }

    // Check if the clicked tile is adjacent to the empty tile
    if (
      (index === emptyIndex - 1 && emptyIndex % 4 !== 0) || // left
      (index === emptyIndex + 1 && (emptyIndex + 1) % 4 !== 0) || // right
      index === emptyIndex - 4 || // top
      index === emptyIndex + 4 // bottom
    ) {
      // Swap the clicked tile with the empty tile
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [
        newTiles[emptyIndex],
        newTiles[index],
      ];
      setTiles(newTiles);
    }
  };

  const handleShuffle = () => {
    // Shuffle the tiles
    const newTiles = [...tiles];
    shuffleArray(newTiles);
    setTiles(newTiles);
  };

  const handleReset = () => {
    // Set the tiles to the goal state
    setTiles([...GOAL_STATE]);
  };

  const isSolved = () => {
    // Check if the tiles are in the goal state
    return tiles.toString() === GOAL_STATE.toString();
  };

  return (
    <div className={styles.game}>
      <h1 className={styles.game__title}>15-Puzzle Game </h1>
      <div className={styles.game__quote}>
        {" "}
        {showQuote && currentQuote && (
          <div>
            <blockquote>
              <p>{currentQuote.text}</p>
              <footer>{currentQuote.author}</footer>
            </blockquote>
          </div>
        )}
      </div>

      <Board tiles={tiles} onClick={handleClick} />
      <div>
        <div className={styles.game__button} onClick={handleShuffle}>
          Shuffle
        </div>
        <div className={styles.game__button} onClick={handleReset}>
          Solve
        </div>
      </div>
      {isSolved() ? (
        <div className={styles.game__solved}>
          Congratulations, you solved the puzzle!
        </div>
      ) : null}
      <ul className={styles.game__rules}>
        <li>Move the tiles one at the time</li>
        <li>
          To win the tiles should go from 1-15 starting from the top left corner
        </li>
        <li>Good luck!</li>
      </ul>
    </div>
  );
};

export default Game;
