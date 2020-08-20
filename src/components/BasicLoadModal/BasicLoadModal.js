import React from 'react';
import ModalDialog from '../ModalDialog/ModalDialog';
import Styles from './BasicLoadModal.module.css';

const basicLoadModel = (props) => (
  <ModalDialog onClose={props.onModalCloseClick}>
    <textarea 
      className={Styles.LoadInput}
      onChange={props.onImportChange}
    >  
    </textarea>
    <button onClick={props.onImportClick}>Load</button>
  </ModalDialog>
);

export default basicLoadModel;