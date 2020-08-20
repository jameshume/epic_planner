import React from 'react';
import ModalDialog from '../ModalDialog/ModalDialog';
import Styles from './BasicSaveModal.module.css';

const basicSaveModel = (props) => (
  <ModalDialog onClose={props.onModalCloseClick}>
    <textarea 
      className={Styles.SaveOutput}
      readOnly={true}
      value={props.stateAsJSONString}
    >  
    </textarea>
  </ModalDialog>
);

export default basicSaveModel;