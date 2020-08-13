import React from 'react';
import styles from './ArrowPad.module.css';

const ArrowsEnum = Object.freeze({"UP":1, "DOWN":2, "LEFT":3, "RIGHT":4});

const arrowPad = props => (
  <div className={styles.ArrowPad}>
    <div className={styles.UpArrow} onClick={() => props.clicked(ArrowsEnum.UP)}>
    &uarr;
    </div>
    <div className={styles.RightArrow} onClick={() => props.clicked(ArrowsEnum.RIGHT)}>
    &rarr;
    </div>
    <div className={styles.LeftArrow} onClick={() => props.clicked(ArrowsEnum.LEFT)}>
    &larr;
    </div>
    <div className={styles.DownArrow} onClick={() => props.clicked(ArrowsEnum.DOWN)}>
    &darr;
    </div>
  </div>
);

export {arrowPad as ArrowPad, ArrowsEnum};