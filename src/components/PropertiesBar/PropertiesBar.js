import React from 'react';
import Styles from './PropertiesBar.module.css';
import HtmlFormElement from '../HtmlFormElement/HtmlFormElement';
import {ArrowPad} from '../ArrowPad/ArrowPad';

/* 
 * Props = {
 *     fields : [
 *        {
 *            el_type: textarea | input 
 *            el_props:
 *            el_label:
 *        }
 *     ],
 *     arrowPadClick : func
 */
const propertiesBar = (props) => {
  const fields = props.fields.map(
    (field, fieldIdx) => (
      <div key={fieldIdx}>
        <HtmlFormElement
          el_type={field.el_type}
          el_props={field.el_props} 
          el_label={field.el_label}
        />
      </div>
    )
  );

  return (
    <div className={Styles.propertiesBar}>
      <h1>Properties</h1>
      <div>
        {fields}
      </div>
      <ArrowPad clicked={props.arrowPadClick}/>
    </div>
  );
}

export default propertiesBar;