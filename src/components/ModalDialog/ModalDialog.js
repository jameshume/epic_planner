import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import Styles from './ModalDialog.module.css';
import PropTypes from 'prop-types';

const modalDialog = (props) => (
  <React.Fragment>
    <Backdrop onClick={props.onClose}/>
    <div className={Styles.ModalDialog}>
      {props.children}
    </div>
  </React.Fragment>
);

modalDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default modalDialog;