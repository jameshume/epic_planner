import React from 'react';
import Styles from './Backdrop.module.css';
import PropTypes from 'prop-types';

const backdrop = props => (
  <div onClick={props.onClick} className={Styles.backdrop}></div>
)

backdrop.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default backdrop;