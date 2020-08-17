import React from 'react';
import Styles from './Backdrop.module.css';

const backdrop = props => (
  <div onClick={props.onClick} className={Styles.backdrop}></div>
)

export default backdrop;