import React from 'react';
import ModalDialog from '../ModalDialog/ModalDialog';
import Styles from './BasicLoadModal.module.css';
import PropTypes from 'prop-types';
const fs = window.require('fs')

class basicLoadModel extends React.Component {
  constructor(...args) {
    super(...args); // Must always capp super()!!
    this.inputReference = React.createRef();
    this.textReference = React.createRef();
  }

  render() {
    return (
      <ModalDialog onClose={this.props.onModalCloseClick}>
        <textarea
          className={Styles.LoadInput}
          onChange={this.props.onImportChange}
          placeholder="Paste JSON data here or click on 'Choose File', then click 'Load'"
          ref={this.textReference}
        >
        </textarea>
        <button onClick={this.props.onImportClick}>Load</button>
        <input
          ref={this.inputReference}
          type='file'
          onChange={
            (e) => {
              const filename = this.inputReference.current.files[0].path;
              const data = fs.readFileSync(filename)
              this.textReference.current.value = data;
              this.props.onImportChange({target: this.textReference.current});
            }
          }
        />
      </ModalDialog>
    );
  }
}

basicLoadModel.propTypes = {
  onModalCloseClick: PropTypes.func.isRequired,
  onImportChange: PropTypes.func.isRequired,
  onImportClick: PropTypes.func.isRequired,
};

export default basicLoadModel;