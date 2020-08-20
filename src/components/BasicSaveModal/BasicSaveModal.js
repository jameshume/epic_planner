import React from 'react';
import ModalDialog from '../ModalDialog/ModalDialog';
import Styles from './BasicSaveModal.module.css';
import PropTypes from 'prop-types';

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

basicSaveModel.propTypes = {
  onModalCloseClick: PropTypes.func.isRequired,
  stateAsJSONString: PropTypes.string.isRequired,
};

export default basicSaveModel;