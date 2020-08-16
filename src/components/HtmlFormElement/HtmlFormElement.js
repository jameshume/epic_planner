import React from 'react';

const htmlFormElement = (props) => {
  const formElement = React.createElement(props.el_type, props.el_props);
  return (
    <label>{props.el_label}
      {formElement}
    </label>
  );
};

export default htmlFormElement;