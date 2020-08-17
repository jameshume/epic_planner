import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import Styles from './ModalDialog.module.css';

const modalDialog = (props) => (
  <React.Fragment>
    <Backdrop onClick={props.onClose}/>
    <div className={Styles.ModalDialog}>
      {props.children}
    </div>
  </React.Fragment>
);

export default modalDialog;