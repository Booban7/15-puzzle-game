import React from "react";
import styles from "./Board.module.scss";
import Tile from "../Tile/Tile";

interface BoardProps {
  tiles: number[];
  onClick: (index: number) => void;
}

const Board: React.FC<BoardProps> = ({ tiles, onClick }) => {
  return (
    <div className={styles.board}>
      {tiles.map((value, index) => (
        <Tile key={index} value={value} onClick={() => onClick(index)} />
      ))}
    </div>
  );
};

export default Board;
