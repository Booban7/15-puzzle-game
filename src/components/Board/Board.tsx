import React, { FC } from 'react';
import styles from './Board.module.scss';

interface BoardProps {}

const Board: FC<BoardProps> = () => (
  <div className={styles.Board}>
    Board Component
  </div>
);

export default Board;
