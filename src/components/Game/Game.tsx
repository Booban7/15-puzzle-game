import React, { useState } from "react";
import Board from "../Board/Board";
import styles from "./Game.module.scss";
import { quotes } from "../Commentator/quotes";

const GOAL_STATE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

const shuffleArray = (array: number[]) => {
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
    const emptyIndex = tiles.indexOf(0);

    const newCounter = counter + 1;
    setCounter(newCounter);

    if (newCounter % 20 === 0) {
      const nextIndex = (newCounter / 20) % quotes.length;
      const nextQuote = quotes[nextIndex];
      setCurrentQuote(nextQuote);
      setShowQuote(true);
      setTimeout(() => {
        setShowQuote(false);
        setCurrentQuote({ id: 0, text: "", author: "" });
      }, 8000);
    }
    if (
      (index === emptyIndex - 1 && emptyIndex % 4 !== 0) || // left
      (index === emptyIndex + 1 && emptyIndex + (1 % 4) !== 0) || // right
      index === emptyIndex - 4 || // top
      index === emptyIndex + 4 // bottom
    ) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [
        newTiles[emptyIndex],
        newTiles[index],
      ];
      setTiles(newTiles);
    }
  };

  const handleShuffle = () => {
    const newTiles = [...tiles];
    shuffleArray(newTiles);
    setTiles(newTiles);
  };

  const isSolved = () => {
    return tiles.toString() === GOAL_STATE.toString();
  };

  return (
    <div className={styles.game}>
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
      {isSolved() ? (
        <div className={styles.game__solved}>
          Congratulations, you solved the puzzle and won 1 mill...nope just the
          glory!
        </div>
      ) : null}
      <Board tiles={tiles} onClick={handleClick} />
      <div>
        <div className={styles.game__button} onClick={handleShuffle}>
          Shuffle
        </div>
      </div>

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
