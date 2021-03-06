import React from 'react';
import styles from './StoryBoardItem.module.css';
import styles_common from '../../../common/StoryBoardCommon.module.css';
import PropTypes from 'prop-types';

/*
 */
const storyBoardItem = props => {
  let itemStyle = [styles.item, styles_common.scrollable]
  if ((props.selection) && (props.selection[0] === "item") && (props.selection[1] === props.col_idx) && (props.selection[2] === props.item_idx)) {
    itemStyle.push(styles.item_selected);
  }
  // TODO: https://www.freecodecamp.org/news/reactjs-implement-drag-and-drop-feature-without-using-external-libraries-ad8994429f1a/
  return (
  <div 
    className={itemStyle.join(' ')}
    onClick={()=>props.onItemClick(props.row_idx, props.col_idx, props.item_idx)}
    onDragStart = {
      (evt) => {
        //evt.stopPropagation();
        evt.dataTransfer.setData("Text", evt.target.id);
        console.log("STARTED", props.col_idx, props.row_idx, props.item_idx)
        console.log(evt); // => nullified object.
        console.log(evt.type); // => "click"
        console.log(evt.nativeEvent)
      }
    }
    onDragEnter = {
      (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        console.log("ENTER", props.col_idx, props.row_idx, props.item_idx)
      }
    }
    onDrop = {
      (evt) => {
        evt.preventDefault();
        let myid = evt.dataTransfer.getData('Text');
        console.log("DROP -", myid, " - ", props.col_idx, props.row_idx, props.item_idx)
        console.log(evt.nativeEvent.offsetX, evt.nativeEvent.offsetY);
      }
    }
    onDragOver = {
      (evt) => {
        evt.preventDefault();
        console.log(evt.nativeEvent.offsetX, evt.nativeEvent.offsetY);
      }
    }
  >
    <div 
      className={styles.delete_button}
      onClick={(e) => {e.stopPropagation(); 
                       props.onDeleteItemClick(props.row_idx, props.col_idx, props.item_idx);}
              }
    >
      <span role='img' aria-label='delete'>&#128473;</span>
    </div>
    {props.details['title']}
  </div>
)};

storyBoardItem.propTypes = {
  details: PropTypes.object.isRequired,
  row_idx: PropTypes.number.isRequired,
  col_idx: PropTypes.number.isRequired,
  item_idx: PropTypes.number.isRequired,
  onItemClick: PropTypes.func.isRequired,
  selection: PropTypes.array,
};

export default storyBoardItem;