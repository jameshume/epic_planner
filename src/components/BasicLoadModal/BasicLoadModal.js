import React from 'react';
import ModalDialog from '../ModalDialog/ModalDialog';
import Styles from './BasicLoadModal.module.css';
import PropTypes from 'prop-types';

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

basicLoadModel.propTyes = {
  onModalCloseClick: PropTypes.func.isRequired,
  onImportChange: PropTypes.func.isRequired,
  onImportClick: PropTypes.func.isRequired,
};

export default basicLoadModel;