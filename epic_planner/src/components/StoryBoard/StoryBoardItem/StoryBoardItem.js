import React from 'react';
import styles from './StoryBoardItem.module.css';
import styles_common from '../../../common/StoryBoardCommon.module.css';

/*
 * \param props.details - A dictionary: {
 *                           'title' : 'some text',
 *                        }
 * \param props.row_idx
 * \param props.col_idx
 * \param props.item_idx
 * onItemClick
 */
const storyBoardItem = props => {
  // TODO: https://www.freecodecamp.org/news/reactjs-implement-drag-and-drop-feature-without-using-external-libraries-ad8994429f1a/
  return (
  <div 
    className={[styles.item, styles_common.scrollable].join(' ')}
    onClick={()=>props.onItemClick(props.row_idx, props.col_idx, props.item_idx)}
    draggable
    onDragOver={()=>console.log("DRAG OVR", props.row_idx, props.col_idx, props.item_idx)}
  >
    <div 
      className={styles.delete_button}
    
    onClick={(e) => {e.stopPropagation(); props.onDeleteItemClick(props.row_idx, props.col_idx, props.item_idx);}}
    ><span role='img' aria-label='delete'>&#128473;</span></div>
    {props.details['title']}
  </div>
)};

export default storyBoardItem;