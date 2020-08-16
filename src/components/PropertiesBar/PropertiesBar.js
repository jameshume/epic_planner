import React from 'React';
import Styles from './PropertiesBar.module.css';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';

/* 
 * Props = {
 *     fields : [
 *        {
 *            type: textarea | input 
 *            value:
 *            editable:
 *            visible:
 *            onChange:
 *        }
 *     ],
 *     arrowPadClick : func
 *     
 */
properiesBar = (props) => {

  props.fields.map(
    (field, fieldIdx) => {
      const ElementType =
      let FieldElement = null;
      if (field.type === "textarea") {  
        fieldElement <textarea
        value={this.state.selectedElement.title}
        onChange={this.prop_title_change}/>}

      <div>
        <label>Title:
         
        </label>
    </div>    
    }
  );

  return (
    <div className={styles.properties_panel}>
      <h1>Properties</h1>




      <div>
        <label>Title:
          <textarea
            value={this.state.selectedElement.title}
            onChange={this.prop_title_change}/>
        </label>
      </div>

      <div>
        <label>Description:
          <textarea
            value={this.state.selectedElement.description}
            onChange={this.prop_description_change}
          />
        </label>
      </div>

      <div>
        <label>Story points:
          <input
            value={this.state.selectedElement.storyPoints}
            onChange={this.prop_storypoints_change}
          />
        </label>
      </div>

      <ArrowPad clicked={this.arrowPadClick}/>
    </div>
  )
}