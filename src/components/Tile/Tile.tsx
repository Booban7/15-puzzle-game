import React from "react";
import styles from "./Tile.module.scss";

interface TileProps {
  value: number;
  onClick: () => void;
}

const Tile: React.FC<TileProps> = ({ value, onClick }) => {
  return (
    <div className={styles.tile} onClick={onClick}>
      {value === 0 ? "" : value}
    </div>
  );
};

export default Tile;
