import React from 'react';
import PropTypes from 'prop-types';

const htmlFormElement = (props) => {
  const formElement = React.createElement(props.el_type, props.el_props);
  return (
    <label>{props.el_label}
      {formElement}
    </label>
  );
};

htmlFormElement.propTypes = {
  el_type: PropTypes.oneOf(['input', 'textarea']),
  el_label: PropTypes.string,
  el_props: PropTypes.object,
};

export default htmlFormElement;