import React from 'react';
import ModalDialog from '../ModalDialog/ModalDialog';
import Styles from './BasicSaveModal.module.css';
import PropTypes from 'prop-types';
const fs = window.require('fs');
// In the Renderer process
const { ipcRenderer } = window.require('electron')


class basicSaveModel extends React.Component {
  constructor(...args) {
    super(...args); // Must always capp super()!!
    this.inputReference = React.createRef();
    this.textReference = React.createRef();
  }

  render() {
    return (
      <ModalDialog onClose={this.props.onModalCloseClick}>
        <textarea
          className={Styles.SaveOutput}
          readOnly={true}
          value={this.props.stateAsJSONString}
          ref={this.textReference}
        >
        </textarea>
        <button
              ref={this.inputReference}
              onClick={
                async (e) => {
                  const result = await ipcRenderer.invoke('jehtest');
                  console.log(result);
                }
              }
        >jajajaja</button>
      </ModalDialog>
    );
  }
}

basicSaveModel.propTypes = {
  onModalCloseClick: PropTypes.func.isRequired,
  stateAsJSONString: PropTypes.string.isRequired,
};

export default basicSaveModel;